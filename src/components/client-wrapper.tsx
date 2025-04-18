'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Initialize Tesseract preloading
  useEffect(() => {
    setMounted(true);

    // Preload Tesseract only in browser environments
    const preloadTesseract = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Dynamically import tesseract.js
          const { createWorker } = await import('tesseract.js');
          console.log('Tesseract.js module preloaded successfully');

          // Preload the worker configuration
          const worker = await createWorker({
            logger: progress => console.log('Tesseract worker loading:', progress),
            workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
            corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
            langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          });

          // Initialize base worker
          await worker.load();
          console.log('Tesseract worker loaded successfully');

          // Clean up
          await worker.terminate();
        }
      } catch (error) {
        console.error('Failed to preload Tesseract:', error);
      }
    };

    preloadTesseract();
  }, []);

  // Return null on server-side, avoid hydration mismatch by rendering only on client
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
