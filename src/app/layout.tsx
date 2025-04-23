import type { Metadata, Viewport } from "next";
import { Geist as GeistSans } from "next/font/google";
import { Geist_Mono as GeistMono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
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
  metadataBase: new URL("https://cavcount.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
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
    description:
      "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    siteName: "Cavcount",
    locale: "en_US",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="google-analytics"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JZKYHEXVZQ"
        />
        <Script id="google-analytics-config">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JZKYHEXVZQ');
        `}
        </Script>

        <Script id="sitelinks-searchbox-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://cavcount.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://cavcount.app/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Cavcount",
                "sameAs": "https://www.facebook.com/cavcount"
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
