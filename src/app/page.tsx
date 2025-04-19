import { WordCounter } from "@/components/word-counter";
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";

export default function Home() {
  const schema = generateHomePageSchema();

  return (
    <>
      <Script id="home-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      <WordCounter />
    </>
  );
}
