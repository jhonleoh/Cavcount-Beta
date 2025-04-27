import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { generateContactPageSchema } from "@/lib/schema-utils"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Contact Us - CavCount",
  description: "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  alternates: {
    canonical: "https://cavcount.app/contact",
  },
}

// Pre-generate the schema at build time
const schemas = generateContactPageSchema();

export default function ContactPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`contact-schema-${index}`}
          id={`contact-schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          data-cfasync="false"
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
