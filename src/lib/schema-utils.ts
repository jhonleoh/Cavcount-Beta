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

  // Generate breadcrumb schema for the article
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articles",
        "item": `${baseUrl}/articles`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${baseUrl}/articles/${article.slug}`
      }
    ]
  };

  // Create article schema
  const articleSchema = {
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

  // Return array of schemas
  return [articleSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org structured data for an Articles listing page
 */
export function generateArticlesListSchema(articles: ArticleMetadata[]) {
  // Base URL for the site
  const baseUrl = "https://cavcount.app";

  // Generate breadcrumb schema for the articles page
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articles",
        "item": `${baseUrl}/articles`
      }
    ]
  };

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

  // Create article list schema
  const articleListSchema = {
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

  // Return array of schemas
  return [articleListSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org structured data for the home page
 */
export function generateHomePageSchema() {
  const baseUrl = "https://cavcount.app";

  // Create breadcrumb schema for the home page
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  // Create website schema (without breadcrumb)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": baseUrl,
    "name": "Cavcount",
    "description": "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        "valueRequired": "http://schema.org/True",
        "valueName": "search_term_string"
      }
    }
  };

  // Return array of schemas
  return [websiteSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org structured data for the About page
 */
export function generateAboutPageSchema() {
  const baseUrl = "https://cavcount.app";

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${baseUrl}/about`
      }
    ]
  };

  // Create about page schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": `${baseUrl}/about`,
    "name": "About Cavcount",
    "description": "Learn about Cavcount's mission, features, and the team behind the text analysis tools"
  };

  // Return array of schemas
  return [aboutPageSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org structured data for the Privacy page
 */
export function generatePrivacyPageSchema() {
  const baseUrl = "https://cavcount.app";

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": `${baseUrl}/privacy`
      }
    ]
  };

  // Create privacy page schema
  const privacyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${baseUrl}/privacy`,
    "name": "Privacy Policy | Cavcount",
    "description": "Cavcount's privacy policy and data protection information"
  };

  // Return array of schemas
  return [privacyPageSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org structured data for the Contact page
 */
export function generateContactPageSchema() {
  const baseUrl = "https://cavcount.app";

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${baseUrl}/contact`
      }
    ]
  };

  // Create contact page schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": `${baseUrl}/contact`,
    "name": "Contact Cavcount",
    "description": "Get in touch with the Cavcount team"
  };

  // Return array of schemas
  return [contactPageSchema, breadcrumbSchema];
}
