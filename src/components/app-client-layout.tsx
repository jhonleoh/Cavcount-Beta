'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

interface AppClientLayoutProps {
  children: React.ReactNode;
}

export function AppClientLayout({ children }: AppClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  // Set mounted state to ensure no hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't try to preload Tesseract during hydration
  useEffect(() => {
    // Only run after initial render/hydration
    if (mounted) {
      // Preload Tesseract for better OCR performance
      const preloadTesseract = async () => {
        try {
          if (typeof window !== 'undefined') {
            const { createWorker } = await import('tesseract.js');
            console.log('Tesseract.js module preloaded successfully');

            // Initialize worker with CDN paths that won't be blocked
            const worker = await createWorker({
              logger: progress => console.log('Tesseract worker loading:', progress),
              workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
              corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
              langPath: 'https://tessdata.projectnaptha.com/4.0.0',
            });

            await worker.load();
            console.log('Tesseract worker loaded successfully');

            await worker.terminate();
          }
        } catch (error) {
          console.error('Failed to preload Tesseract:', error);
        }
      };

      preloadTesseract();
    }
  }, [mounted]);

  // Show content only on client-side to prevent hydration mismatch
  // First render (server-side) -> empty div
  // Second render (hydration) -> empty div
  // Third render (client-side, after hydration) -> actual content
  if (!mounted) {
    // Return a minimal UI that won't cause hydration issues
    return (
      <div className="min-h-screen">
        <div className="flex flex-col animate-pulse">
          <div className="h-16 bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 p-6">
            <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-md" />
          </div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="cavcount-theme">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
