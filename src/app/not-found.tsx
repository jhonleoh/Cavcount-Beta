import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for cannot be found. Return to Cavcount home.",
  openGraph: {
    title: "Page Not Found | Cavcount",
    description: "The page you are looking for cannot be found. Return to Cavcount home.",
    url: "https://cavcount.app/404",
    siteName: "Cavcount",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cavcount.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Page Not Found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | Cavcount",
    description: "The page you are looking for cannot be found. Return to Cavcount home.",
    images: [
      {
        url: "https://cavcount.app/twitter-image.png",
        alt: "Page Not Found",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold tracking-tight mb-4">404 - Page Not Found</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
