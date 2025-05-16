"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Copy, Trash2 } from "lucide-react";
import * as Tesseract from "tesseract.js";

interface TextStats {
  words: number;
  sentences: number;
  characters: number;
  readingTime: number;
  paragraphs: number;
}

// Control variable for the announcement visibility
const ANNOUNCEMENT_ENABLED = false; // Set to false to disable the announcement entirely

export default function ClientPage() {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    readingTime: 0,
    paragraphs: 0,
  });
  const [showAnnouncement, setShowAnnouncement] = useState(ANNOUNCEMENT_ENABLED);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Count words
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    // Count sentences
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;

    // Count characters
    const characters = text.length;

    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200) || 0;

    // Count paragraphs
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;

    setStats({
      words,
      sentences,
      characters,
      readingTime,
      paragraphs,
    });
  }, [text]);

  // useEffect for auto-closing the announcement
  useEffect(() => {
    if (showAnnouncement && ANNOUNCEMENT_ENABLED) { // Also check ANNOUNCEMENT_ENABLED here
      const timer = setTimeout(() => {
        setShowAnnouncement(false);
      }, 10000); // 10 seconds

      // Cleanup function to clear the timer if the component unmounts
      // or if the announcement is closed manually before the timer finishes.
      return () => clearTimeout(timer);
    }
  }, [showAnnouncement]); // Re-run if showAnnouncement changes (e.g., manually closed)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);

      const result = await Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => {
            console.log(m);
          }
        }
      );

      setText(result.data.text);
      setIsProcessing(false);
    } catch (error) {
      console.error("OCR processing error:", error);
      setIsProcessing(false);
      alert("Error processing image. Please try again with a different image.");
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="container py-4 md:py-8">
      <div className="mb-4 md:mb-8 text-center">
        <h1 className="mb-2 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Word &amp; Sentence Counter
        </h1>
        <p className="text-muted-foreground light-mode-text">
          Count words, sentences, characters and more. Upload an image to extract text with OCR.
        </p>
      </div>

      {showAnnouncement && (
        <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20 relative">
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Close announcement"
            onClick={() => setShowAnnouncement(false)}
          >
            ✕
          </button>
          <h3 className="text-lg font-medium mb-1">Update Announcement</h3>
          <p className="text-sm light-mode-text">
            <span className="font-semibold">v3.5 Updates:</span> New web design, Improved mobile responsiveness, add text analysis, and improved OCR processing.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <textarea
                  className="flex w-full rounded-md border border-input bg-transparent shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-56 md:min-h-80 resize-none p-4 text-base"
                  placeholder="Type your text here or upload an image..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={isProcessing}
                />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-2"></div>
                      <p className="text-sm text-muted-foreground">Processing image...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isProcessing}
                />
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleUploadClick}
                  disabled={isProcessing}
                >
                  <Upload size={16} />
                  <span className="hidden xs:inline">Upload</span> Image
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleCopyText}
                  disabled={!text || isProcessing}
                >
                  <Copy size={16} />
                  <span className="hidden xs:inline">Copy</span> Text
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={!text || isProcessing}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Text Statistics</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 text-stats">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium text-primary">W</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Words</p>
                    <p className="font-medium light-mode-text">{stats.words}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium text-primary">S</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sentences</p>
                    <p className="font-medium light-mode-text">{stats.sentences}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium text-primary">C</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Characters</p>
                    <p className="font-medium light-mode-text">{stats.characters}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reading Time</p>
                    <p className="font-medium light-mode-text">{stats.readingTime} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3 col-span-2 md:col-span-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M21 14H3" />
                      <path d="M21 19H3" />
                      <path d="M21 9H3" />
                      <path d="M21 4H3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paragraphs</p>
                    <p className="font-medium light-mode-text">{stats.paragraphs}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
