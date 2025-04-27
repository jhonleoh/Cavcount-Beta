import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { generateContactPageSchema } from "@/lib/schema-utils"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Contact Us - CavCount",
  description: "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  openGraph: {
    title: "Contact Us - CavCount",
    description: "Contact the CavCount team with questions, feedback or suggestions about our word counting and OCR tools.",
    type: "website",
    url: "https://cavcount.app/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - CavCount",
    description: "Get in touch with the CavCount team",
  },
  alternates: {
    canonical: "https://cavcount.app/contact",
  },
}

export default function ContactPage() {
  const schemas = generateContactPageSchema();

  return (
    <>
      {schemas.map((schema, index) => (
        <Script key={`contact-schema-${index}`} id={`contact-schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
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
