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

import { useEffect, useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { BarChart3, Clock, Upload, Copy, RefreshCw } from "lucide-react"

// Type definitions for Tesseract
interface TesseractProgressInfo {
  status: string;
  progress: number;
}

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

// Maximum time (in ms) to wait for OCR processing before timing out
const OCR_TIMEOUT_MS = 60000; // 60 seconds timeout

export function WordCounter() {
  // State hooks
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
  const [processingProgress, setProcessingProgress] = useState(0)

  // Refs hooks
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const workerRef = useRef<TesseractWorker | null>(null)

  // Clean up worker and timer
  const cleanupWorker = useCallback(async () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // Terminate worker if it exists
    if (workerRef.current) {
      try {
        await workerRef.current.terminate()
        console.log("Worker terminated during cleanup")
      } catch (e) {
        console.warn("Error terminating worker during cleanup:", e)
      }
      workerRef.current = null
    }
  }, []);

  // Set mounted state to ensure we're only running client-side code
  useEffect(() => {
    setIsMounted(true)
    setTesseractLoaded(true)

    // Cleanup function to ensure any worker is terminated
    return () => {
      cleanupWorker()
    }
  }, [cleanupWorker])

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

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Handle file upload with OCR
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset the file input so the same file can be uploaded again
    e.target.value = ''

    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file")
      return
    }

    // Check if already processing
    if (isProcessing) {
      toast.error("Already processing an image, please wait or reload the page")
      return
    }

    setIsProcessing(true)
    setProcessingProgress(0)

    // Create an object URL for the image
    const imageUrl = URL.createObjectURL(file)

    // Set up timeout to prevent infinite processing
    timeoutRef.current = setTimeout(() => {
      cleanupWorker()
      setIsProcessing(false)
      toast.error("OCR processing timed out. Try a clearer image or reload the page.")
      URL.revokeObjectURL(imageUrl)
    }, OCR_TIMEOUT_MS)

    try {
      console.log("Starting OCR process with image:", file.name)

      // Import the library
      const { createWorker } = await import('tesseract.js')

      // Safer approach to logger function that won't have cloning issues
      // Create worker with base configuration
      workerRef.current = await createWorker({
        workerPath: '/tesseract/worker.min.js',
        corePath: '/tesseract/tesseract-core.wasm.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        logger: m => {
          console.log('tesseract log:', m);
          if (m.status === 'recognizing text') {
            setProcessingProgress(Math.floor(m.progress * 100));
          }
        }
      });

      try {
        // Load and initialize the language
        await workerRef.current.load();
        await workerRef.current.loadLanguage('eng');
        await workerRef.current.initialize('eng');

        // Process the image
        const result = await workerRef.current.recognize(imageUrl);

        // Set the recognized text
        const extractedText = result.data.text;
        setText(extractedText);
        setOcrText(extractedText);

        toast.success("Text extracted successfully!");
      } catch (initError) {
        console.error("OCR initialization error:", initError);
        throw new Error(`Failed to process image: ${initError instanceof Error ? initError.message : 'Unknown error'}`);
      }
    } catch (ocrError) {
      console.error("OCR processing error:", ocrError)
      toast.error(`OCR failed: ${ocrError instanceof Error ? ocrError.message : 'Unknown error'}. Try a clearer image.`)
    } finally {
      // Always clean up
      await cleanupWorker()
      setIsProcessing(false)
      URL.revokeObjectURL(imageUrl)
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
                    <p>Processing image... {processingProgress}%</p>
                    {processingProgress > 0 && processingProgress < 100 && (
                      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isProcessing}
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
                disabled={isProcessing}
              />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyText}
                disabled={!text || isProcessing}
              >
                <Copy className="h-4 w-4" />
                Copy Text
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleClearText}
                disabled={!text || isProcessing}
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
