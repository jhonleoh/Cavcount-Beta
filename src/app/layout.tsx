import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SchemaOrg } from "@/components/schema-org";

const inter = Inter({ subsets: ["latin"] });

// Define site metadata with SEO best practices
export const metadata: Metadata = {
  metadataBase: new URL("https://cavcount.app"),
  title: {
    template: "%s | CavCount",
    default: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  },
  description:
    "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
  keywords: [
    "word counter",
    "sentence counter",
    "character counter",
    "text analysis",
    "OCR",
    "reading time",
    "free tool",
  ],
  creator: "Leo",
  publisher: "CavCount",
  authors: [{ name: "Leo", url: "https://cavcount.app/about" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cavcount.app",
    title: "CavCount - Free Word Counter & OCR Tool",
    description:
      "Free online tool to count words, sentences, characters and extract text from images with OCR. No ads, no sign-up required.",
    siteName: "CavCount",
  },
  twitter: {
    card: "summary_large_image",
    title: "CavCount - Free Word Counter & OCR Tool",
    description:
      "Free online tool to count words, sentences, characters and extract text from images with OCR. No ads, no sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Viewport metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6b2bd8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Extract title and description from metadata
  const title = metadata.title?.default?.toString() || "CavCount";
  const description = metadata.description?.toString() || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://cavcount.app" />
        <SchemaOrg title={title} description={description} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
