import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getArticleData, getArticleSlugs, validateSlug } from "@/lib/article-utils";
import { ArticleImage } from "@/components/article-image";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import { createOpenGraphMetadata, createTwitterMetadata } from "@/lib/utils";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

import { generateArticleSchema } from "@/lib/schema-utils";

// Generate dynamic metadata for the page
export async function generateMetadata(
  props: ArticlePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get valid article slugs
  const slugs = getArticleSlugs();

  // If the slug doesn't exist, return basic metadata
  if (!slugs.includes(props.params.slug)) {
    return {
      title: "Article Not Found | Cavcount",
      description: "The requested article could not be found.",
    };
  }

  try {
    const article = await getArticleData(props.params.slug);
    const baseUrl = "https://cavcount.app";
    const articleUrl = `${baseUrl}/articles/${props.params.slug}`;
    const imageUrl = article.image.startsWith('http')
      ? article.image
      : `${baseUrl}${article.image}`;

    // Make sure OpenGraph data is thorough for Facebook sharing
    const openGraph = {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: "Cavcount",
      locale: "en_US",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    };

    return {
      title: `${article.title} | Cavcount`,
      description: article.description,
      openGraph,
      twitter: createTwitterMetadata({
        title: article.title,
        description: article.description,
        images: imageUrl,
      }),
      alternates: {
        canonical: `/articles/${props.params.slug}`,
      }
    };
  } catch (error) {
    return {
      title: "Article | Cavcount",
      description: "Cavcount article page",
    };
  }
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ArticlePage(props: ArticlePageProps) {
  const { slug } = props.params;

  // Check if the requested slug exists
  if (!validateSlug(slug)) {
    notFound();
  }

  // Get article data
  const article = await getArticleData(slug);
  // generateArticleSchema now returns an array of schemas
  const schemas = generateArticleSchema(article);

  // Format the date
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Render each schema separately for better parsing */}
      {schemas.map((schema, index) => (
        <Script
          key={`article-schema-${index}`}
          id={`article-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container py-8">
        <div className="mb-8">
          <a
            href="/articles"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </a>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <span>{formattedDate}</span>
              <span>{article.author}</span>
            </div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden bg-muted">
            <ArticleImage
              src={article.image}
              alt={article.title}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <article className="prose prose-blue dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </article>
        </div>
      </div>
    </>
  );
}
