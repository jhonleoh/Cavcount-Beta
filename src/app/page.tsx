import { Metadata } from "next";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
  description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
  alternates: {
    canonical: "https://cavcount.app",
  }
};

export default function HomePage() {
  return <ClientPage />;
}
