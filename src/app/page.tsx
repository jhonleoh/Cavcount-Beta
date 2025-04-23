import { WordCounter } from "@/components/word-counter";
import { OcrProcessor } from "@/components/ocr-processor";
import { NextSeo } from "next-seo";

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Home"
        description="Count words and extract text from images with Cavcount's tools"
        canonical="https://cavcount.app"
        openGraph={{
          url: "https://cavcount.app",
          title: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
          description: "Instantly count words, sentences, and characters from any text or image with advanced OCR technology.",
        }}
      />

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
            <h2 className="text-2xl font-bold tracking-tight mb-6">Word Counter</h2>
            <WordCounter />
          </section>

          <section id="ocr" className="scroll-mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">OCR Text Extractor</h2>
            <OcrProcessor />
          </section>
        </div>
      </div>
    </>
  );
}
