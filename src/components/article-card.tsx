"use client"

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ArticleMetadata } from "@/lib/article-utils";
import { useState } from "react";

interface ArticleCardProps {
  article: ArticleMetadata;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Use direct links to static pages
  const articleUrl = `/articles/${article.slug}`;

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <a href={articleUrl} className="block h-48 relative overflow-hidden">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center px-4">
              <p className="text-muted-foreground">No image available</p>
            </div>
          </div>
        ) : (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
      </a>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>{formattedDate}</span>
          <span>{article.author}</span>
        </div>
        <a href={articleUrl}>
          <CardTitle className="text-xl hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </a>
        <CardDescription className="mt-2">
          {article.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="line-clamp-3">
          {/* Content preview could go here */}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
}
