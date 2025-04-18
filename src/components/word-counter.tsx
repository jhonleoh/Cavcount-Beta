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

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { BarChart3, Clock, Upload, Copy, RefreshCw } from "lucide-react"

interface TextStats {
  wordCount: number
  sentenceCount: number
  charCount: number
  readingTime: string
  paragraphCount: number
}

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

  // Set mounted state to ensure we're only running client-side code
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    const words = text.trim().split(/\s+/).filter(word => word !== '').length
    const chars = text.length
    const paragraphs = text.trim().split(/\n\s*\n/).filter(Boolean).length

    // Improved sentence counting that ignores common abbreviations
    // Expanded list of titles (including academic, professional, military, etc.)
    const titles = [
      "dr", "mr", "mrs", "ms", "prof", "rev", "fr", "sr", "jr", "phd", "md", "jd",
      "esq", "rn", "cpa", "mba", "llb", "dmd", "dds", "dvm", "do", "eng",
      "capt", "sgt", "lt", "col", "gen", "maj", "cmdr", "adm", "gov", "pres",
      "rep", "sen", "st", "ave", "blvd", "rd", "ln", "ct", "etc", "viz" , "hon"
    ];

    // 1. Clean up the text (remove extra spaces, etc.)
    const cleanText = text.trim().replace(/\s+/g, ' ');

    // 2. Split into potential sentences.
    const potentialSentences = cleanText.split(/([.!?]+)/);

    const sentences = [];
    let currentSentence = "";

    for (let i = 0; i < potentialSentences.length; i++) {
      currentSentence += potentialSentences[i];

      // Check if we've reached the end of a sentence
      if (i % 2 !== 0) { // Odd indices are the punctuation marks
        const lastWord = currentSentence.trim().split(" ").pop();
        if (lastWord) {
          const isTitle = titles.some(title =>
            lastWord.toLowerCase().replace(/[^a-z]/g, '').startsWith(title)
          );
          if (!isTitle) {
            sentences.push(currentSentence.trim());
            currentSentence = "";  //reset for the next sentence
          } //else continue adding to current sentence
        }
      }
    }

    // Add any remaining text if there was no punctuation mark
    if (currentSentence.trim() !== "") {
      sentences.push(currentSentence.trim());
    }

    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200))
    const readingTime = `${readingTimeMinutes} min${readingTimeMinutes !== 1 ? "s" : ""}`

    setStats({
      wordCount: words,
      sentenceCount: sentences.length,
      charCount: chars,
      readingTime,
      paragraphCount: paragraphs,
    })
  }, [text])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Handle file upload with OCR - using a simpler approach similar to the original script
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

    try {
      console.log("Starting OCR process with image:", file.name)

      // Import the library using a simpler approach
      const { createWorker } = await import('tesseract.js')

      // Simple worker creation - similar to the original script approach
      const worker = await createWorker()

      try {
        // Using a single recognize call
        const result = await worker.recognize(file)

        // Set the recognized text
        const extractedText = result.data.text
        setText(extractedText)
        setOcrText(extractedText)

        toast.success("Text extracted successfully!")

        // Terminate worker immediately after use
        await worker.terminate()
      } catch (error) {
        console.error("OCR error:", error)
        toast.error(`OCR failed: ${error instanceof Error ? error.message : 'Unknown error'}. Try a clearer image.`)

        // Make sure to terminate the worker even if there's an error
        await worker.terminate()
      }
    } catch (error) {
      console.error("Worker creation error:", error)
      toast.error("Failed to initialize OCR system. Please try again.")
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
