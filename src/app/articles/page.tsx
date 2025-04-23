import { ArticleCard } from "@/components/article-card";
import { getAllArticles } from "@/lib/article-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Read the latest articles about text analysis, OCR technology, and writing tips.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Articles</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Read our latest articles about text analysis, OCR technology, and writing tips.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
