import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  openGraph: {
    title: "Contact Us | CavCount",
    description:
      "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
    url: "https://cavcount.app/contact",
  },
  twitter: {
    title: "Contact Us | CavCount",
    description:
      "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
  },
  alternates: {
    canonical: "https://cavcount.app/contact",
  },
};

export { default } from "./contact-form";
