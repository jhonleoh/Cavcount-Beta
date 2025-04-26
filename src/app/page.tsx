import { WordCounter } from "@/components/word-counter";
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
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
};

export default function Home() {
  const schemas = generateHomePageSchema();

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`home-schema-${index}`}
          id={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <WordCounter />
    </>
  );
}
