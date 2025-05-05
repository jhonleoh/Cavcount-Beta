import type { Metadata } from "next";
import { Card } from "@/components/ui/card"; // Assuming this path is correct for your project

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CavCount's privacy policy and data protection information. Learn how we safeguard your privacy while using our word counting and OCR tools.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        </div>

        <Card className="p-6">
          {/* Updated date to current date */}
          <p className="mb-6">Last Updated: 2025-05-05</p> 

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              {/* Text from the first policy */}
              <p className="text-lg">
                At CavCount, we value your privacy and are dedicated to safeguarding your personal information. This privacy statement will tell you about your rights to privacy and how the law protects you, as well as how we handle your personal information when you visit our website (regardless of where you came from).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data We Collect and Technology Used</h2> 
              {/* Combined "Data We Collect" and "Technology" sections from the first policy */}
              <p className="text-lg mb-2">
                Any text you enter or images you upload for OCR processing are not stored by CavCount. No data is transferred to our servers; all processing takes place in your browser. Your actual content is not included in the minimal usage analytics we gather to enhance our service.
              </p>
              <p className="text-lg mb-2">
                Our OCR (Optical Character Recognition) processing is done entirely within your browser using Tesseract.js. Our OCR functionality does not send any images to our servers.
              </p>
              <p className="text-lg">
                For feedback or reporting purposes, we have a contact form that gathers name and email information. We only use this information to answer your questions and enhance our offerings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              {/* Text from the first policy */}
              <p className="text-lg">
                To make sure our website runs properly, we use essential cookies. These cookies cannot be disabled in our systems and are essential to the operation of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              {/* Text from the first policy, adapted to list format */}
              <p className="text-lg">The following third-party services are utilized by CavCount:</p>
              <ul className="list-disc ml-6 mt-2 text-lg">
                {/* Updated hosting provider based on first policy */}
                <li>Cloudflare Pages hosting services</li> 
                <li>Analytics tools (to learn how people use our website)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              {/* Text from the first policy, adapted to list format */}
              <p className="text-lg">You have the following rights under data protection laws:</p>
              <ul className="list-disc ml-6 mt-2 text-lg">
                <li>Your access rights</li>
                <li>Your entitlement to correction</li>
                <li>The right to be erased</li>
                <li>Your entitlement to processing limitations</li>
                <li>Your ability to protest processing</li>
                <li>Your entitlement to data mobility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              {/* Text from the first policy */}
              <p className="text-lg">
                Please use our Contact form to get in touch with us if you have any questions concerning our privacy practices or this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              {/* Text from the first policy */}
              <p className="text-lg">
                This privacy statement may be updated periodically. An updated "Last updated" date at the top of this page will indicate the most recent version.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}