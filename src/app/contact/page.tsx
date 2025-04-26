import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { generateContactPageSchema } from "@/lib/schema-utils"
import Script from "next/script"
import { createTwitterMetadata } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact Us | Cavcount",
  description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  openGraph: {
    title: "Contact Us | Cavcount",
    description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
    url: "https://cavcount.app/contact",
    siteName: "Cavcount",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cavcount.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Cavcount",
      },
    ],
  },
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
