"use client"

import Image from "next/image";
import { useState } from "react";

interface ArticleImageProps {
  src: string;
  alt: string;
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted">
        <div className="text-center px-4">
          <p className="text-muted-foreground text-lg font-medium">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
