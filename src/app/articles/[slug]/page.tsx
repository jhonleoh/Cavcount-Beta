import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getArticleData, getArticleSlugs, validateSlug } from "@/lib/article-utils";
import { ArticleImage } from "@/components/article-image";
import { ArrowLeft } from "lucide-react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Script from "next/script";
import { generateArticleSchema } from "@/lib/schema-utils";
>>>>>>> parent of 6980e83 (update)
=======
import Script from "next/script";
import { generateArticleSchema } from "@/lib/schema-utils";
>>>>>>> parent of 6980e83 (update)

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

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

    return {
      title: `${article.title} | Cavcount`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: [article.image],
        type: 'article',
        publishedTime: article.date,
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: [article.image],
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

  // Format the date
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
<<<<<<< HEAD
    <div className="container py-8">
      <div className="mb-8">
        <a
          href="/articles"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </a>
=======
    <>
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
>>>>>>> parent of 6980e83 (update)
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
  );
}
