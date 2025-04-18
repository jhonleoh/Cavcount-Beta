import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppClientLayout } from "@/components/app-client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CavCount - OCR Word & Sentence Counter | Image to Text",
  description:
    "Instantly count words & sentences from images! CavCount's free OCR tool accurately extracts text from any photo or screenshot. Get word counts in seconds.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script src="/tesseract-config.js" defer />
        <meta
          name="description"
          content="CavCount - Modern Word & Sentence Counter with OCR capabilities"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*; connect-src 'self' https://* blob:; worker-src 'self' blob: https://*; img-src 'self' data: blob: https://*; style-src 'self' 'unsafe-inline';"
        />
      </head>
      <body className="antialiased">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
