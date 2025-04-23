<<<<<<< HEAD
<<<<<<< HEAD
import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
=======
=======
>>>>>>> parent of 6980e83 (update)
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { generateContactPageSchema } from "@/lib/schema-utils"
import Script from "next/script"
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)

export const metadata: Metadata = {
  title: "Contact Us - CavCount",
  description: "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter."
}

export default function ContactPage() {
  const schema = generateContactPageSchema();

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions or feedback about Cavcount? We'd love to hear from you! Fill out the
          form below and we'll get back to you as soon as possible.
        </p>

        <ContactForm />

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">contact@cavcount.app</p>
            </div>
            <div>
              <h3 className="font-semibold">Social Media</h3>
              <p className="text-muted-foreground">
                Follow us on Twitter: @cavcount
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
=======
    <>
      <Script id="contact-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
>>>>>>> parent of 6980e83 (update)
=======
    <>
      <Script id="contact-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
>>>>>>> parent of 6980e83 (update)
}
