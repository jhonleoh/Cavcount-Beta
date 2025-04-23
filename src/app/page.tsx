import { WordCounter } from "@/components/word-counter";
<<<<<<< HEAD
<<<<<<< HEAD
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Count words and extract text from images with Cavcount's tools"
};
=======
=======
>>>>>>> parent of 6980e83 (update)
import { generateHomePageSchema } from "@/lib/schema-utils";
import Script from "next/script";

export default function Home() {
  const schema = generateHomePageSchema();
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)

  return (
<<<<<<< HEAD
    <div className="container py-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cavcount - Free Word Counter with OCR
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Count words, sentences, and characters from text or images.
          Extract text from images with advanced OCR technology.
        </p>
      </div>

      <div className="space-y-12">
        <section id="counter" className="scroll-mt-16">
          <WordCounter />
        </section>
      </div>
    </div>
=======
=======

  return (
>>>>>>> parent of 6980e83 (update)
    <>
      <Script id="home-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      <WordCounter />
    </>
>>>>>>> parent of 6980e83 (update)
  );
}
