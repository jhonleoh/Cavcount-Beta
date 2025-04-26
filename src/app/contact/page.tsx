import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { generateContactPageSchema } from "@/lib/schema-utils"
import Script from "next/script"
import { createOpenGraphMetadata, createTwitterMetadata } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact Us | Cavcount",
  description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  openGraph: createOpenGraphMetadata({
    title: "Contact Us | Cavcount",
    description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
    url: "https://cavcount.app/contact",
  }),
  twitter: createTwitterMetadata({
    title: "Contact Us | Cavcount",
    description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  }),
  alternates: {
    canonical: "/contact"
  }
}

export default function ContactPage() {
  const schemas = generateContactPageSchema();

  return (
    <>
      {/* Render each schema separately for better parsing */}
      {schemas.map((schema, index) => (
        <Script
          key={`contact-schema-${index}`}
          id={`contact-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact Us</h1>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  )
}
