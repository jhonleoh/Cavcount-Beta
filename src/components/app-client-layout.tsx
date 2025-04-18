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

  // Show content only on client-side to prevent hydration mismatch
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
