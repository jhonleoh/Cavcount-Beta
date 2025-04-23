<<<<<<< HEAD
<<<<<<< HEAD
import { Metadata } from "next";
=======
=======
>>>>>>> parent of 6980e83 (update)
import type { Metadata } from "next";
import { generatePrivacyPageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import { Card } from "@/components/ui/card"
import Link from "next/link";
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)

export const metadata: Metadata = {
  title: "Privacy Policy - CavCount",
  description: "CavCount's privacy policy and data protection information",
};

export default function PrivacyPage() {
  const schema = generatePrivacyPageSchema();

  return (
<<<<<<< HEAD
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            At Cavcount, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We do not collect personal information unless you voluntarily provide it. The only information
            we collect is:
          </p>
          <ul>
            <li>Anonymous usage data for analytics purposes</li>
            <li>Any text you enter into our tools is processed locally in your browser and is not stored on our servers</li>
            <li>Images uploaded for OCR processing are processed in your browser and are not stored on our servers</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the anonymous usage data solely to improve our website and user experience. We do not sell,
            trade, or otherwise transfer your information to third parties.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your experience on our site. These cookies are used to store information
            such as your preferences and the pages on the site you access or visit.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services, such as Google Analytics, to help us understand website usage.
            These third parties have their own privacy policies addressing how they use such information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact us at privacy@cavcount.app.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page.
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: April 23, 2025</p>
=======
    <>
      <Script id="privacy-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)
        </div>
      </div>
    </div>
  );
}
