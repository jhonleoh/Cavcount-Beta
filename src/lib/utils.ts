import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a consistent OpenGraph metadata object with default values
 * that can be overridden for specific pages
 */
export function createOpenGraphMetadata(options: {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article';
  images?: string | string[] | { url: string; width?: number; height?: number; alt?: string }[];
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
} = {}) {
  // Default values
  const defaults = {
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
    url: "https://cavcount.app",
    type: "website" as const,
    siteName: "CavCount",
    locale: "en_US",
    images: [
      {
        url: "https://cavcount.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CavCount - Word Counter with OCR",
      },
    ],
  };

  // Process image data
  let processedImages = defaults.images;
  if (options.images) {
    if (typeof options.images === 'string') {
      processedImages = [{ url: options.images, alt: options.title || defaults.title }];
    } else if (Array.isArray(options.images) && typeof options.images[0] === 'string') {
      processedImages = (options.images as string[]).map(url => ({
        url,
        alt: options.title || defaults.title
      }));
    } else {
      processedImages = options.images as { url: string; width?: number; height?: number; alt?: string }[];
    }
  }

  // Combine defaults with provided options
  return {
    title: options.title || defaults.title,
    description: options.description || defaults.description,
    url: options.url || defaults.url,
    siteName: defaults.siteName,
    locale: defaults.locale,
    type: options.type || defaults.type,
    images: processedImages,
    ...(options.publishedTime && { publishedTime: options.publishedTime }),
    ...(options.authors && { authors: options.authors }),
    ...(options.tags && { tags: options.tags }),
  };
}

/**
 * Creates consistent Twitter card metadata
 */
export function createTwitterMetadata(options: {
  title?: string;
  description?: string;
  images?: string | string[];
  card?: 'summary' | 'summary_large_image';
} = {}) {
  // Default values
  const defaults = {
    title: "CavCount - OCR Word & Sentence Counter | Free Image to Text Tool",
    description: "Instantly count words, sentences, and characters from any text or image with OCR",
    card: "summary_large_image" as const,
    creator: "@cavcount",
    images: ["https://cavcount.app/twitter-image.png"],
  };

  // Process images
  let processedImages = defaults.images;
  if (options.images) {
    processedImages = Array.isArray(options.images) ? options.images : [options.images];
  }

  return {
    card: options.card || defaults.card,
    title: options.title || defaults.title,
    description: options.description || defaults.description,
    creator: defaults.creator,
    images: processedImages,
  };
}
