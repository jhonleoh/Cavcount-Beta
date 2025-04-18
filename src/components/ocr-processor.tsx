"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface OCRProcessorProps {
  onTextExtracted: (text: string) => void
  isProcessing: boolean
  setIsProcessing: (value: boolean) => void
}

export function OCRProcessor({ onTextExtracted, isProcessing, setIsProcessing }: OCRProcessorProps) {
  const [tesseractLoaded, setTesseractLoaded] = useState(false)

  // Add Tesseract.js script dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if Tesseract is already available
    if ((window as any).Tesseract) {
      setTesseractLoaded(true)
      return
    }

    // Load Tesseract.js from CDN
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.1/dist/tesseract.min.js'
    script.async = true
    script.onload = () => {
      console.log('Tesseract.js loaded successfully')
      setTesseractLoaded(true)
    }
    script.onerror = () => {
      console.error('Failed to load Tesseract.js')
      toast.error('Failed to load OCR system. Please refresh the page and try again.')
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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

    // Check if Tesseract is loaded
    if (!tesseractLoaded || !(window as any).Tesseract) {
      toast.error("OCR system is not ready yet. Please wait a moment and try again.")
      return
    }

    setIsProcessing(true)

    try {
      console.log("Starting OCR process with image:", file.name)

      // Use the globally loaded Tesseract instance
      const Tesseract = (window as any).Tesseract

      // Create a URL for the file to avoid browser-specific issues
      const objectUrl = URL.createObjectURL(file)

      toast.info("Processing image... This may take a moment.")

      // Process the image
      const result = await Tesseract.recognize(
        objectUrl,
        'eng',
        {
          logger: m => console.log('OCR Progress:', m)
        }
      )

      // Clean up
      URL.revokeObjectURL(objectUrl)

      // Extract the text
      const extractedText = result.data.text

      if (extractedText && extractedText.trim()) {
        onTextExtracted(extractedText)
        toast.success("Text extracted successfully!")
      } else {
        toast.error("No text detected in the image. Try a clearer image.")
      }
    } catch (error) {
      console.error("OCR error:", error)
      toast.error(`OCR failed: ${error instanceof Error ? error.message : 'Unknown error'}. Try a clearer image.`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => document.getElementById('file-upload')?.click()}
        disabled={isProcessing || !tesseractLoaded}
      >
        {isProcessing ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        <span className="hidden xs:inline">Upload</span> Image
      </Button>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
        disabled={isProcessing}
      />
    </>
  )
}
