import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { NextSeo } from "next-seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Cavcount team",
};

export default function ContactPage() {
  return (
    <>
      <NextSeo
        title="Contact"
        description="Get in touch with the Cavcount team"
        canonical="https://cavcount.app/contact"
        openGraph={{
          url: "https://cavcount.app/contact",
          title: "Contact Cavcount",
          description: "Get in touch with the Cavcount team",
        }}
      />

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
    </>
  );
}
