import { Card } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy - CavCount",
  description: "Read CavCount's Privacy Policy. Learn how we handle information when you use our free word and sentence counting tool. No user accounts, no data storage."
}

export default function PrivacyPage() {
  const currentDate = new Date().toISOString().split('T')[0]

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        </div>

        <Card className="p-6">
          <p className="mb-6">Last Updated: {currentDate}</p>

          <p className="mb-4">
            This Privacy Policy describes how CavCount ("we," "us," or "our") handles information in connection with your use of the CavCount website located at <Link href="/" className="text-primary underline">cavcount.app</Link> (the "Service"). CavCount is a free web application that provides word and sentence counting functionality. No user account creation is required to use the Service.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Information We Process</h2>
          <p className="mb-4">
            The primary function of CavCount is to count words and sentences in text extracted from images that you upload. To achieve this, we use a third-party JavaScript library called Tesseract.js for Optical Character Recognition (OCR).
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-4">
            <li><strong>Uploaded Images:</strong> You can upload images to CavCount for text extraction. These images are processed by Tesseract.js to perform OCR. We understand that these images may inadvertently contain personal information, although this is not the intended use of the Service.</li>
            <li><strong>Extracted Text:</strong> Tesseract.js extracts text from the images you upload. This text is used solely to provide the word and sentence count functionality.</li>
            <li><strong>No Account Information:</strong> We do not require users to create an account, and therefore we do not collect any account-related information such as usernames or passwords.</li>
            <li><strong>No Cookies:</strong> We currently do not use cookies or similar tracking technologies on CavCount.</li>
            <li><strong>No Analytics:</strong> We currently do not use any third-party analytics service.</li>
          </ul>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">How We Use Information</h2>
          <p className="mb-4">
            The information processed by CavCount is used exclusively for the following purpose:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-4">
            <li><strong>Providing the Word/Sentence Counting Service:</strong> The extracted text from your uploaded images is used to calculate the word and sentence count, which is displayed to you.</li>
          </ul>
          <p className="mb-4">
            We do not use the uploaded images or extracted text for any other purpose, including but not limited to:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-4">
            <li>Advertising</li>
            <li>Marketing</li>
            <li>Profiling</li>
            <li>Sharing with other third parties (except as described below regarding Tesseract.js)</li>
          </ul>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Third-Party Service: Tesseract.js</h2>
          <p className="mb-4">
            As mentioned, we use Tesseract.js, a third-party JavaScript library, to perform OCR on the images you upload. This means that the images you upload are processed by Tesseract.js. Tesseract.js is an open-source library, and its processing occurs client-side (within your web browser).
          </p>
          <p className="mb-4">
            While Tesseract.js itself doesn't have a distinct privacy policy since it operates client-side, you should be aware of its functionality. You can learn more about Tesseract.js here: <a href="https://github.com/naptha/tesseract.js" className="text-primary underline" target="_blank" rel="noreferrer noopener">https://github.com/naptha/tesseract.js</a>
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect the information processed by CavCount. Data transmitted to and from our website is encrypted using HTTPS. However, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Data Retention</h2>
          <p className="mb-4">
            We do not store the images you upload or the extracted text on our servers. The image processing and text extraction happen within your browser, and the data is not persisted after you leave the page or close your browser. Because processing occurs client-side, there is no data retention on our servers.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Your Privacy Rights</h2>
          <p className="mb-4">
            While we do not collect personal information in the traditional sense (no accounts, no persistent storage), we acknowledge that the images you upload could contain personal information. We aim to minimize any incidental processing of such information. If you have any concerns about the content of images you have uploaded, please contact us at <a href="mailto:leo@cavcount.app" className="text-primary underline">leo@cavcount.app</a>.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Children's Privacy</h2>
          <p className="mb-4">
            CavCount is not intended for use by children under the age of 13. We do not knowingly collect any information from children under 13. If you believe we have inadvertently processed information from a child under 13, please contact us immediately.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will post any changes on this page and update the "Last Updated" date at the top. We encourage you to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-semibold">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:leo@cavcount.app" className="text-primary underline">leo@cavcount.app</a>.
          </p>
        </Card>
      </div>
    </div>
  )
}
