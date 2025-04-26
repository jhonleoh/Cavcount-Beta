import { WordCounter } from "@/components/word-counter";
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";

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
