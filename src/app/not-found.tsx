import Link from "next/link";
import { Metadata } from "next";
import { createOpenGraphMetadata, createTwitterMetadata } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Not Found | Cavcount",
  description: "The page you are looking for cannot be found. Return to Cavcount home.",
  openGraph: createOpenGraphMetadata({
    title: "Page Not Found | Cavcount",
    description: "The page you are looking for cannot be found. Return to Cavcount home.",
  }),
  twitter: createTwitterMetadata({
    title: "Page Not Found | Cavcount",
    description: "The page you are looking for cannot be found. Return to Cavcount home.",
  }),
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
