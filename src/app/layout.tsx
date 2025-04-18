import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppClientLayout } from "@/components/app-client-layout";
import Script from "next/script";

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

export const metadata: Metadata = {
  title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  description:
    "Instantly count words, sentences, and characters from any text or image. CavCount's free OCR tool accurately extracts text from photos and screenshots with advanced sentence detection.",
  keywords: "word counter, sentence counter, character counter, OCR, text extraction, image to text, free OCR tool, reading time calculator",
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
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description: "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    url: "https://cavcount.app",
    siteName: "CavCount",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cavcount.app/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "CavCount - Modern Word Counter with OCR",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CavCount - OCR Word & Sentence Counter",
    description: "Instantly count words, sentences, and characters from any text or image with OCR",
    creator: "@cavcount",
    images: ["https://cavcount.app/twitter-image.png"], // You'll need to create this image
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
          name="description"
          content="CavCount - Modern Word & Sentence Counter with OCR capabilities"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*; connect-src 'self' https://* blob:; worker-src 'self' blob: https://*; img-src 'self' data: blob: https://*; style-src 'self' 'unsafe-inline';"
        />
        {/* Structured Data for Google Search */}
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CavCount",
              "url": "https://cavcount.app",
              "description": "A free word counting and text analysis tool with OCR capabilities",
              "applicationCategory": "Utility",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript",
              "featureList": [
                "Word counting",
                "Sentence counting",
                "Character counting",
                "OCR text extraction",
                "Reading time calculation",
                "Paragraph counting"
              ],
              "screenshot": "https://cavcount.app/screenshot.png",
              "creator": {
                "@type": "Organization",
                "name": "Cavcount",
                "sameAs": "https://www.facebook.com/cavcount"
              }
            }
          `}
        </Script>
        {/* Additional schema for BreadcrumbList */}
        <Script id="breadcrumb-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://cavcount.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Word Counter",
                  "item": "https://cavcount.app/#counter"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "OCR Tool",
                  "item": "https://cavcount.app/#ocr"
                }
              ]
            }
          `}
        </Script>
      </head>
      <body className="antialiased">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
