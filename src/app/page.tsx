import { WordCounter } from "@/components/word-counter";
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
  openGraph: {
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description: "Instantly count words, sentences, and characters from any text or image with advanced OCR technology",
    url: "https://cavcount.app",
    siteName: "CavCount",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CavCount - OCR Word & Sentence Counter",
    description: "Instantly count words, sentences, and characters from any text or image with OCR",
  },
  alternates: {
    canonical: "https://cavcount.app",
  },
};

export default function Home() {
  const schemas = generateHomePageSchema();

  return (
    <>
      {schemas.map((schema, index) => (
        <Script key={`home-schema-${index}`} id={`home-schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
      ))}
      <WordCounter />
    </>
  );
}
