import { WordCounter } from "@/components/word-counter";
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
  alternates: {
    canonical: "https://cavcount.app",
  },
};

// Pre-generate the schema at build time
const schemas = generateHomePageSchema();

export default function Home() {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`home-schema-${index}`}
          id={`home-schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          data-cfasync="false"
        />
      ))}
      <WordCounter />
    </>
  );
}
