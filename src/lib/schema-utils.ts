import type { ArticleMetadata } from "./article-utils";

/**
 * Generates Schema.org structured data for a Blog article
 */
export function generateArticleSchema(article: ArticleMetadata & { contentHtml: string }) {
  // Base URL for the site
  const baseUrl = "https://cavcount.app";

  // Calculate estimated word count and reading time from content
  const wordCount = article.contentHtml
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .split(/\s+/)
    .filter(Boolean)
    .length;

  // Average reading speed: 200-250 words per minute
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  // Get image URL, ensure it's an absolute URL
  const imageUrl = article.image.startsWith('http')
    ? article.image
    : `${baseUrl}${article.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cavcount",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.png`
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${article.slug}`
    },
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "keywords": article.tags.join(", ")
  };
}

/**
 * Generates Schema.org structured data for an Articles listing page
 */
export function generateArticlesListSchema(articles: ArticleMetadata[]) {
  // Base URL for the site
  const baseUrl = "https://cavcount.app";

  const itemListElements = articles.map((article, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.description,
      "url": `${baseUrl}/articles/${article.slug}`,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "datePublished": article.date,
      "image": article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": itemListElements,
    "numberOfItems": articles.length,
    "mainEntityOfPage": {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/articles`,
      "name": "Articles | Cavcount",
      "description": "Read the latest articles about text analysis, OCR technology, and writing tips."
    }
  };
}
