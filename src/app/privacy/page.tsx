import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cavcount's privacy policy and data protection information",
};

export default function PrivacyPage() {
  return (
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
        </div>
      </div>
    </div>
  );
}
