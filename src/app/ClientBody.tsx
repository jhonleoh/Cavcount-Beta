"use client";

import type React from 'react';
import { useEffect, useState } from 'react';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [isClient, setIsClient] = useState(false);

  // Pre-initialize Tesseract worker on the client side only
  useEffect(() => {
    // This ensures we're in the browser
    setIsClient(true);

    // This preloads and initializes the worker in the browser for faster OCR later
    const preloadTesseract = async () => {
      try {
        // Only try to load Tesseract in client-side environment
        if (typeof window !== 'undefined') {
          // Dynamically import tesseract.js
          const { createWorker } = await import('tesseract.js');
          console.log('Tesseract module loaded successfully');

          // Skip worker initialization in production to avoid CSP issues
          // In development, we still want to test the worker
          if (process.env.NODE_ENV === 'development') {
            try {
              // Preload the worker to test if it's working
              const worker = await createWorker({
                logger: progress => console.log('Tesseract worker loading:', progress),
                workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
                corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
                langPath: 'https://tessdata.projectnaptha.com/4.0.0',
              });

              // Initialize but don't do full recognition yet
              await worker.load();
              console.log('Tesseract worker loaded successfully');

              // Terminate immediately - this was just to test loading
              await worker.terminate();
            } catch (workerError) {
              console.error('Failed to initialize Tesseract worker:', workerError);
              // Continue app execution, will try again when OCR is needed
            }
          }
        }
      } catch (error) {
        console.error('Failed to preload Tesseract:', error);
        // Non-critical error, app can still function
      }
    };

    preloadTesseract();
  }, []);

  // Only render children when in the browser
  if (!isClient) return null;

  return <>{children}</>;
}
