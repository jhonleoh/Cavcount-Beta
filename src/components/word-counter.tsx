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
import { BarChart3, Clock, Copy, RefreshCw } from "lucide-react"
import { OCRProcessor } from "./ocr-processor" // Import our new OCR component

interface TextStats {
  wordCount: number
  sentenceCount: number
  charCount: number
  readingTime: string
  paragraphCount: number
}

// Enhanced reading time calculation with seconds precision
function calculateReadingTime(words: number): string {
  // Average reading speed: 200-250 words per minute
  const WORDS_PER_MINUTE = 225;

  // Calculate reading time in minutes and seconds
  const totalMinutes = words / WORDS_PER_MINUTE;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);

  if (words === 0) return "0 min";

  // Format the result differently based on reading duration
  if (minutes < 1) {
    return seconds === 1 ? "1 second" : `${seconds} seconds`;
  }

  if (minutes === 1) {
    return seconds === 0 ? "1 minute" : `1 minute ${seconds} seconds`;
  }

  return seconds === 0 ? `${minutes} minutes` : `${minutes} minutes ${seconds} seconds`;
}

export function WordCounter() {
  // State hooks
  const [text, setText] = useState("")
  const [showAnnouncement, setShowAnnouncement] = useState(true);
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

    // Enhanced sentence detection algorithm with improved handling of edge cases
    // Expanded list of abbreviations that might appear at the end of a sentence
    const abbreviations = [
      // Titles
      "dr", "mr", "mrs", "ms", "prof", "rev", "fr", "sr", "jr", "phd", "md", "jd",
      "esq", "rn", "cpa", "mba", "llb", "dmd", "dds", "dvm", "do", "eng",
      // Military, government
      "capt", "sgt", "lt", "col", "gen", "maj", "cmdr", "adm", "gov", "pres",
      "rep", "sen",
      // Addresses
      "st", "ave", "blvd", "rd", "ln", "ct",
      // Other common abbreviations
      "etc", "vs", "viz", "ex", "eg", "ie", "inc", "ltd", "co", "corp", "univ", "fig",
      "vol", "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec",
      "mon", "tue", "tues", "wed", "thu", "thur", "thurs", "fri", "sat", "sun", "a.m", "p.m", "hon"
    ];

    // 1. Clean up the text (remove extra spaces)
    const cleanText = text.trim().replace(/\s+/g, ' ');

    // 2. Split into potential sentences using multi-pattern approach
    const potentialSentences = cleanText.split(/([.!?][\s"'})]|\\n)/g);

    const sentences = [];
    let currentSentence = "";

    // Enhanced pattern matching to recognize sentence boundaries
    for (let i = 0; i < potentialSentences.length; i++) {
      currentSentence += potentialSentences[i];

      // Check if we have an end of sentence marker
      const punctuationMatch = potentialSentences[i]?.match(/[.!?][\s"'})]$/);

      if (punctuationMatch && i % 2 !== 0) {
        // Get the last word and check if it's an abbreviation
        const lastWordMatch = currentSentence.trim().match(/\S+[.!?]$/);
        const lastWord = lastWordMatch ? lastWordMatch[0].toLowerCase().replace(/[^a-z]/g, '') : '';

        // Check if it's an abbreviation, if not, then it's a real sentence end
        const isAbbreviation = abbreviations.some(abbr =>
          lastWord === abbr || lastWord.endsWith(`.${abbr}`)
        );

        // Look for specific patterns that might indicate it's not a sentence end
        const hasNumberAfter = i < potentialSentences.length - 1 && /^\s*\d/.test(potentialSentences[i+1]);

        // Detect if this is a decimal number (e.g., 3.14)
        const isDecimalNumber = /\d+\.\d+$/.test(currentSentence.trim());

        if (!isAbbreviation && !hasNumberAfter && !isDecimalNumber) {
          sentences.push(currentSentence.trim());
          currentSentence = "";
        }
      }
    }

    // Add any remaining text if there was no final punctuation mark
    if (currentSentence.trim() !== "") {
      sentences.push(currentSentence.trim());
    }

    // Use the improved reading time calculation
    const readingTime = calculateReadingTime(words);

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

  // Handle text extraction from OCR
  const handleTextExtracted = (extractedText: string) => {
    setText(extractedText);
    setOcrText(extractedText);
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
    <div className="container py-4 md:py-8">
      <div className="mb-4 md:mb-8 text-center">
        <h1 className="mb-2 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Word & Sentence Counter
        </h1>
        <p className="text-muted-foreground">
          Count words, sentences, characters and more. Upload an image to extract text with OCR.
        </p>
      </div>

      {/* Announcement banner */}
      {showAnnouncement && (
        <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20 relative">
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Close announcement"
          >
            ✕
          </button>
          <h3 className="text-lg font-medium mb-1">Update Announcement</h3>
          <p className="text-sm">
            <span className="font-semibold">v1.1.0 Updates:</span> Improved mobile responsiveness,
            enhanced sentence detection algorithm, more accurate reading time calculation,
            and improved OCR processing.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="p-4">
            <div className="relative">
              <Textarea
                placeholder="Type your text here or upload an image..."
                className="min-h-56 md:min-h-80 resize-none p-4 text-base"
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
              {/* Use our new OCR processor component */}
              <OCRProcessor
                onTextExtracted={handleTextExtracted}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyText}
                disabled={!text || isProcessing}
              >
                <Copy className="h-4 w-4" />
                <span className="hidden xs:inline">Copy</span> Text
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

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 text-stats">
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
                    <p className="font-medium reading-time">{stats.readingTime}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3 col-span-2 md:col-span-1">
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
        <Card className="mt-6 md:mt-8 p-4">
          <h3 className="mb-2 text-lg font-medium">Extracted Text (OCR Result)</h3>
          <p className="text-sm text-muted-foreground">
            This is the text extracted from your image. Edit in the box above if needed.
          </p>
          <div className="mt-4 max-h-48 md:max-h-60 overflow-y-auto rounded border p-3 text-sm">
            {ocrText.split('\n').map((line, i) => (
              <p key={`line-${i}-${line.slice(0, 8)}`}>{line || " "}</p>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
