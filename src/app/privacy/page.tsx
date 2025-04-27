import type { Metadata } from "next";
import { generatePrivacyPageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import { Card } from "@/components/ui/card"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - CavCount",
  description: "CavCount's privacy policy and data protection information. Learn how we safeguard your privacy while using our word counting and OCR tools.",
  openGraph: {
    title: "Privacy Policy - CavCount",
    description: "CavCount's privacy policy and data protection information. Learn how we safeguard your privacy.",
    type: "website",
    url: "https://cavcount.app/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - CavCount",
    description: "CavCount's privacy policy and data protection information",
  },
  alternates: {
    canonical: "https://cavcount.app/privacy",
  },
};

export default function PrivacyPage() {
  const schemas = generatePrivacyPageSchema();

  return (
    <>
      {schemas.map((schema, index) => (
        <Script key={`privacy-schema-${index}`} id={`privacy-schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
      ))}

      <div className="container py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          </div>

          <Card className="p-6">
            <p className="mb-6">Last Updated: {new Date().toISOString().split('T')[0]}</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-lg">
                  At CavCount, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                <p className="text-lg">
                  CavCount does not store any texts that you input or images that you upload for OCR processing. All processing happens in your browser, and data is not sent to our servers. We collect minimal usage analytics to improve our service, but this does not include your actual content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                <p className="text-lg">
                  We use essential cookies to ensure the proper functioning of our website. These cookies are necessary for the website to work and cannot be switched off in our systems.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-lg">
                  CavCount uses the following third-party services:
                </p>
                <ul className="list-disc ml-6 mt-2 text-lg">
                  <li>Hosting services (Netlify)</li>
                  <li>Analytics tools (to understand how users interact with our site)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-lg">
                  Under data protection laws, you have rights including:
                </p>
                <ul className="list-disc ml-6 mt-2 text-lg">
                  <li>Your right of access</li>
                  <li>Your right to rectification</li>
                  <li>Your right to erasure</li>
                  <li>Your right to restriction of processing</li>
                  <li>Your right to object to processing</li>
                  <li>Your right to data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-lg">
                  If you have any questions about this privacy policy or our privacy practices, please contact us through our Contact form.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-lg">
                  We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this page.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
