import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppClientLayout } from "@/components/app-client-layout";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the viewport separately as recommended by Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(220, 20%, 97%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(224, 71.4%, 4.1%)" },
  ],
};

// Define the base metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Cavcount",
    default: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
  },
  description:
    "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
  keywords:
    "word counter, sentence counter, character counter, OCR, text extraction, image to text, free OCR tool, reading time calculator",
  authors: [{ name: "Cavcount Team", url: "https://cavcount.app" }],
  creator: "Cavcount",
  publisher: "Cavcount",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cavcount.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description:
      "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool.",
    url: "https://cavcount.app",
    siteName: "Cavcount",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cavcount.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cavcount - Word Counter with OCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description:
      "Count words, sentences, characters, and paragraphs with our free OCR tool.",
    creator: "@cavcount",
    images: [{
      url: "https://cavcount.app/twitter-image.png",
      alt: "Cavcount - Word Counter with OCR"
    }],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  category: "technology",
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
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*; connect-src 'self' https://* blob:; worker-src 'self' blob: https://*; img-src 'self' data: blob: https://*; style-src 'self' 'unsafe-inline';"
        />

        {/* Basic metadata */}
        <title>Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool</title>
        <meta
          name="description"
          content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly."
        />

        {/* Standard OpenGraph meta tags */}
        <meta
          property="og:title"
          content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool"
        />
        <meta
          property="og:description"
          content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cavcount.app" />
        <meta property="og:image" content="https://cavcount.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Cavcount" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cavcount" />
        <meta
          name="twitter:title"
          content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool"
        />
        <meta
          name="twitter:description"
          content="Count words, sentences, characters, and paragraphs with our free OCR tool."
        />
        <meta name="twitter:image" content="https://cavcount.app/twitter-image.png" />
      </head>
      <body className="antialiased">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
