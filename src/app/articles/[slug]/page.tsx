import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleData, getArticleSlugs, type ArticleMetadata } from "@/lib/article-utils";
import { ArrowLeft } from "lucide-react";
import { ArticleImage } from "@/components/article-image"; // Importing the new ArticleImage component

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each article
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const article = await getArticleData(params.slug);

    return {
      title: `${article.title} | Cavcount`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: [article.image],
        type: "article",
        publishedTime: article.date,
        authors: [article.author],
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found | Cavcount",
      description: "The requested article could not be found.",
    };
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: ArticleMetadata & { contentHtml: string } | null = null;

  try {
    article = await getArticleData(params.slug);
  } catch (error) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
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
