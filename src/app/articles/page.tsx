import type { Metadata } from "next";
import { getAllArticles } from "@/lib/article-utils";
import { ArticleCard } from "@/components/article-card";
import { generateArticlesListSchema } from "@/lib/schema-utils";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Articles | Cavcount",
  description: "Read the latest articles about text analysis, OCR technology, and writing tips.",
  alternates: {
    canonical: "https://cavcount.app/articles",
  },
};

// Pre-generate the schema at build time
const articles = getAllArticles();
const schemas = generateArticlesListSchema(articles);

export default function ArticlesPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`article-list-schema-${index}`}
          id={`article-list-schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          data-cfasync="false"
        />
      ))}

      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Read the latest articles about writing tips.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground text-lg">No articles found.</p>
            <p className="text-sm">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
