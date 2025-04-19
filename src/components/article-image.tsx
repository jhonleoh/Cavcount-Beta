"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

interface ArticleImageProps {
  src: string;
  alt: string;
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  // Handle image errors
  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setHasError(true);
    setImageSrc('/placeholder.png'); // Set to placeholder instead of showing error state
  };

  return (
    <Image
      src={hasError ? '/placeholder.png' : imageSrc}
      alt={alt}
      fill
      priority
      className="object-cover"
      onError={handleImageError}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
