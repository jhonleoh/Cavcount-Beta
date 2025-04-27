import type { Metadata, Viewport } from "next";
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

// Default metadata that will be inherited by all pages unless overridden
export const metadata: Metadata = {
  metadataBase: new URL("https://cavcount.app"),
  title: {
    default: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    template: "%s | CavCount"
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
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description:
      "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    url: "https://cavcount.app",
    siteName: "CavCount",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cavcount.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CavCount - Word Counter with OCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CavCount - OCR Word & Sentence Counter",
    description:
      "Instantly count words, sentences, and characters from any text or image with OCR",
    creator: "@cavcount",
    images: ["https://cavcount.app/twitter-image.png"],
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
  verification: {
    google: "verification-code", // Replace with your actual verification code if needed
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
        {/* Script for Tesseract */}
        <script src="/tesseract-config.js" defer data-cfasync="false" />

        {/* CSP header for security */}
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
