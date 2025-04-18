"use client"

// Add type definitions for global Tesseract config
declare global {
  interface Window {
    TESSERACT_CONFIG?: {
      workerPath: string;
      corePath: string;
      langPath: string;
    };
    TESSERACT_DEBUG_INFO?: {
      loadedAt: string;
      environment: {
        userAgent: string;
        platform: string;
        language: string;
      };
    };
  }
}

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { BarChart3, Clock, Upload, Copy, RefreshCw } from "lucide-react"

// Type definitions for Tesseract
type TesseractWorkerOptions = {
  logger?: (arg: { status: string, progress: number } | unknown) => void;
  workerPath?: string;
  corePath?: string;
  langPath?: string;
};
type CreateWorkerFn = (options?: TesseractWorkerOptions) => Promise<TesseractWorker>;

interface TesseractResult {
  data: {
    text: string
  }
}

interface TesseractWorker {
  load: () => Promise<void>
  loadLanguage: (lang: string) => Promise<void>
  initialize: (lang: string) => Promise<void>
  recognize: (image: File | string) => Promise<TesseractResult>
  terminate: () => Promise<void>
}

interface TextStats {
  wordCount: number
  sentenceCount: number
  charCount: number
  readingTime: string
  paragraphCount: number
}

export function WordCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState<TextStats>({
    wordCount: 0,
    sentenceCount: 0,
    charCount: 0,
    readingTime: "0 min",
    paragraphCount: 0,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrText, setOcrText] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [tesseractLoaded, setTesseractLoaded] = useState(false)

  // Set mounted state to ensure we're only running client-side code
  useEffect(() => {
    setIsMounted(true)

    // Skip Tesseract preloading in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      // Attempt to preload Tesseract on initial render
      const preloadTesseract = async () => {
        try {
          // Check if window.TESSERACT_CONFIG exists (from the config script)
          const config = window.TESSERACT_CONFIG || {
            workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
            corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
            langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          };

          // Import inside the try/catch for safer error handling
          const { createWorker } = await import('tesseract.js');
          setTesseractLoaded(true);
          console.log('Tesseract module loaded successfully');
        } catch (error) {
          console.error('Failed to preload Tesseract (non-critical):', error);
          // Continue anyway - we'll try again when needed
        }
      };

      preloadTesseract();
    } else {
      // Set tesseract as loaded anyway to remove loading indicators
      setTesseractLoaded(true);
    }
  }, [])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Calculate stats when text changes
  useEffect(() => {
    if (!text.trim()) {
      setStats({
        wordCount: 0,
        sentenceCount: 0,
        charCount: 0,
        readingTime: "0 min",
        paragraphCount: 0,
      })
      return
    }

    // Get words - split by whitespace
    const words = text.trim().split(/\s+/).length
    const chars = text.length
    const paragraphs = text.trim().split(/\n\s*\n/).filter(Boolean).length

    // Improved sentence counting that ignores common abbreviations
    let processedText = text

    // Replace common titles with periods to avoid counting them as sentence breaks
    const commonAbbreviations = [
      /(\bDr\.)\s/g,
      /(\bMr\.)\s/g,
      /(\bMrs\.)\s/g,
      /(\bMs\.)\s/g,
      /(\bProf\.)\s/g,
      /(\bRev\.)\s/g,
      /(\bSr\.)\s/g,
      /(\bJr\.)\s/g,
      /(\bSt\.)\s/g,
      /(\be\.g\.)\s/g,
      /(\bi\.e\.)\s/g,
      /(\betc\.)\s/g,
      /(\bvs\.)\s/g,
      /(\ba\.m\.)\s/g,
      /(\bp\.m\.)\s/g,
      /(\bU\.S\.)\s/g,
      /(\bU\.K\.)\s/g,
      /(\bB\.A\.)\s/g,
      /(\bM\.A\.)\s/g,
      /(\bPh\.D\.)\s/g,
      /(\bInc\.)\s/g,
      /(\bLtd\.)\s/g,
    ]

    // Replace periods in abbreviations with temporary markers
    for (const regex of commonAbbreviations) {
      processedText = processedText.replace(regex, (match) =>
        match.replace('.', '_')
      )
    }

    // Count sentences (split by .!? but ignore periods in abbreviations)
    const sentences = processedText.split(/[.!?]+/)
      .filter(s => s.trim().length > 0)
      .length

    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200))
    const readingTime = `${readingTimeMinutes} min${readingTimeMinutes !== 1 ? "s" : ""}`

    setStats({
      wordCount: words,
      sentenceCount: sentences,
      charCount: chars,
      readingTime,
      paragraphCount: paragraphs,
    })
  }, [text])

  // Handle file upload with OCR
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file")
      return
    }

    setIsProcessing(true)

    try {
      const imageUrl = URL.createObjectURL(file)

      console.log("Importing tesseract.js...");
      const tesseractModule = await import('tesseract.js')
      const createWorker = tesseractModule.createWorker
      console.log("Tesseract.js imported successfully");

      // Create worker with CDN paths for maximum compatibility
      console.log("Creating Tesseract worker...");
      // Use window.TESSERACT_CONFIG if available, otherwise use defaults
      const config = window.TESSERACT_CONFIG || {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      };

      const worker = await createWorker({
        logger: (m) => console.log("Tesseract worker progress:", m),
        ...config
      });
      console.log("Tesseract worker created successfully");

      // Initialize the worker and recognize text
      console.log("Loading Tesseract worker...");
      await worker.load()
      console.log("Loading English language data...");
      await worker.loadLanguage('eng')
      console.log("Initializing worker with English language...");
      await worker.initialize('eng')
      console.log("Worker initialized, starting image recognition...");

      // Process the image
      const result = await worker.recognize(imageUrl)
      console.log("Recognition complete");

      // Set the recognized text
      const extractedText = result.data.text
      setText(extractedText)
      setOcrText(extractedText)
      console.log("Text extraction successful");

      // Clean up
      await worker.terminate()
      URL.revokeObjectURL(imageUrl)
      console.log("Worker terminated and resources cleaned up");

      toast.success("Text extracted successfully!")
    } catch (ocrError) {
      console.error("OCR processing error:", ocrError)
      toast.error(`Unable to process image: ${ocrError instanceof Error ? ocrError.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard!")
  }

  const handleClearText = () => {
    setText("")
    setOcrText("")
    toast.info("Text cleared")
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Word & Sentence Counter
        </h1>
        <p className="text-muted-foreground">
          Count words, sentences, characters and more. Upload an image to extract text with OCR.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="p-4">
            <div className="relative">
              <Textarea
                placeholder="Type your text here or upload an image..."
                className="min-h-80 resize-none p-4 text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="flex flex-col items-center space-y-2">
                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                    <p>Processing image...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyText}
                disabled={!text}
              >
                <Copy className="h-4 w-4" />
                Copy Text
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleClearText}
                disabled={!text}
              >
                Clear
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <h2 className="mb-4 text-xl font-semibold">Text Statistics</h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">W</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Words</p>
                  {isProcessing ? (
                    <Skeleton className="h-5 w-12" />
                  ) : (
                    <p className="font-medium">{stats.wordCount}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">S</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sentences</p>
                  {isProcessing ? (
                    <Skeleton className="h-5 w-12" />
                  ) : (
                    <p className="font-medium">{stats.sentenceCount}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">C</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Characters</p>
                  {isProcessing ? (
                    <Skeleton className="h-5 w-12" />
                  ) : (
                    <p className="font-medium">{stats.charCount}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reading Time</p>
                  {isProcessing ? (
                    <Skeleton className="h-5 w-12" />
                  ) : (
                    <p className="font-medium">{stats.readingTime}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3 sm:col-span-2 md:col-span-1 lg:col-span-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paragraphs</p>
                  {isProcessing ? (
                    <Skeleton className="h-5 w-12" />
                  ) : (
                    <p className="font-medium">{stats.paragraphCount}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {ocrText && (
        <Card className="mt-8 p-4">
          <h3 className="mb-2 text-lg font-medium">Extracted Text (OCR Result)</h3>
          <p className="text-sm text-muted-foreground">
            This is the text extracted from your image. Edit in the box above if needed.
          </p>
          <div className="mt-4 max-h-60 overflow-y-auto rounded border p-3 text-sm">
            {ocrText.split('\n').map((line, i) => (
              <p key={`line-${i}-${line.slice(0, 8)}`}>{line || " "}</p>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
