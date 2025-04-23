import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { DefaultSeo } from "next-seo";
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

        <DefaultSeo
          titleTemplate="%s | Cavcount"
          defaultTitle="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool"
          description="Instantly count words, sentences, and characters from any text or image with advanced OCR technology."
          canonical="https://cavcount.app"
          openGraph={{
            type: "website",
            locale: "en_US",
            url: "https://cavcount.app",
            siteName: "Cavcount",
            title: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
            description:
              "Instantly count words, sentences, and characters from any text or image with advanced OCR technology.",
            images: [
              {
                url: "https://cavcount.app/og-image.png",
                width: 1200,
                height: 630,
                alt: "Cavcount - Word Counter with OCR",
              },
            ],
          }}
          twitter={{
            handle: "@cavcount",
            site: "@cavcount",
            cardType: "summary_large_image",
          }}
          additionalMetaTags={[
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1",
            },
          ]}
        />

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
