import type { Metadata } from "next";
import { getAllArticles } from "@/lib/article-utils";
import { ArticleCard } from "@/components/article-card";

export const metadata: Metadata = {
  title: "Articles | Cavcount",
  description: "Read the latest articles about text analysis, OCR technology, and writing tips.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="container py-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <p className="text-muted-foreground">
          Read the latest articles about text analysis, OCR technology, and writing tips.
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
  );
}
