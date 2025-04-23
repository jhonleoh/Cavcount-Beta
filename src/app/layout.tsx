import type { Metadata, Viewport } from "next";
import { Geist as GeistSans } from "next/font/google";
import { Geist_Mono as GeistMono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
<<<<<<< HEAD
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
=======
import { AppClientLayout } from "@/components/app-client-layout";
>>>>>>> parent of 6980e83 (update)
=======
import { AppClientLayout } from "@/components/app-client-layout";
>>>>>>> parent of 6980e83 (update)
import Script from "next/script";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  weight: "400",
  subsets: ["latin"],
});

// Define metadata for the site
export const metadata: Metadata = {
<<<<<<< HEAD
=======
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
>>>>>>> parent of 6980e83 (update)
  metadataBase: new URL("https://cavcount.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
<<<<<<< HEAD
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
=======
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
>>>>>>> parent of 6980e83 (update)
  },
  generator: "Next.js",
  applicationName: "Cavcount",
  title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  description:
    "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
  url: "https://cavcount.app",
  category: "productivity",
  creator: "Cavcount Team",
  keywords: [
    "word counter",
    "sentence counter",
    "character counter",
    "OCR",
    "text extraction",
    "image to text",
    "free OCR tool",
    "reading time calculator",
  ],
  openGraph: {
    type: "website",
    url: "https://cavcount.app",
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
<<<<<<< HEAD
<<<<<<< HEAD
    description:
      "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    siteName: "Cavcount",
=======
=======
>>>>>>> parent of 6980e83 (update)
    description: "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    url: "https://cavcount.app",
    siteName: "CavCount",
>>>>>>> parent of 6980e83 (update)
    locale: "en_US",
    images: [
      {
        url: "https://cavcount.app/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "CavCount - Word Counter with OCR",
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
};

// Define viewport settings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
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
          content="CavCount - Free Word, Sentence & Paragraph Counter with Image-to-Text OCR"
        />
<<<<<<< HEAD
<<<<<<< HEAD
        <Script id="google-analytics-config">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JZKYHEXVZQ');
        `}
        </Script>

        <Script id="sitelinks-searchbox-schema" type="application/ld+json">
=======
=======
>>>>>>> parent of 6980e83 (update)
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*; connect-src 'self' https://* blob:; worker-src 'self' blob: https://*; img-src 'self' data: blob: https://*; style-src 'self' 'unsafe-inline';"
        />
        {/* Structured Data for Google Search */}
        <Script id="structured-data" type="application/ld+json">
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)
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
                  "name": "Articles",
                  "item": "https://cavcount.app/articles"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Word Counter",
                  "item": "https://cavcount.app/#counter"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
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
