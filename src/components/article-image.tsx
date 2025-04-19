"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ArticleImageProps {
  src: string;
  alt: string;
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
    setImageSrc(src);

    // Check if this is a placeholder image
    setIsPlaceholder(src === '/placeholder.png');
  }, [src]);

  // Handle image errors
  const handleImageError = () => {
    console.error(`Failed to load article image: ${src}`);

    // Don't immediately set to placeholder - try to fix the path first
    if (src.startsWith('/content/')) {
      // If the image path starts with /content/, try without it
      const newSrc = src.replace('/content/', '/');
      console.log(`Trying alternative path: ${newSrc}`);
      setImageSrc(newSrc);
    } else if (!src.startsWith('/placeholder.png')) {
      // Only set to placeholder if we're not already showing it
      setHasError(true);
      setImageSrc('/placeholder.png');
      setIsPlaceholder(true);
    }
  };

  // If using a placeholder, show a nice "No image available" message
  if (isPlaceholder) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted">
        <div className="text-center flex flex-col items-center gap-4 px-4">
          <ImageOff className="h-16 w-16 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground text-lg font-medium">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority
      className="object-cover"
      onError={handleImageError}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
