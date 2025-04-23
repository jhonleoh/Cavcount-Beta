import { ArticleCard } from "@/components/article-card";
import { getAllArticles } from "@/lib/article-utils";
import { Metadata } from "next";
import { generateArticlesListSchema } from "@/lib/schema-utils";
import { NextSeo, ArticleJsonLd } from "next-seo";

export const metadata: Metadata = {
  title: "Articles",
  description: "Read the latest articles about text analysis, OCR technology, and writing tips.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const schema = generateArticlesListSchema(articles);
  const baseUrl = "https://cavcount.app";

  return (
    <>
      <NextSeo
        title="Articles"
        description="Read the latest articles about text analysis, OCR technology, and writing tips."
        canonical={`${baseUrl}/articles`}
        openGraph={{
          url: `${baseUrl}/articles`,
          title: "Articles | Cavcount",
          description: "Read the latest articles about text analysis, OCR technology, and writing tips.",
        }}
      />

      <ArticleJsonLd
        type="Blog"
        url={`${baseUrl}/articles`}
        title="Articles | Cavcount"
        images={[]}
        description="Read the latest articles about text analysis, OCR technology, and writing tips."
        posts={articles.map((article) => ({
          headline: article.title,
          url: `${baseUrl}/articles/${article.slug}`,
          datePublished: article.date,
          authorName: article.author ?? "Cavcount",
          images: article.image ? [article.image] : [],
        }))}
      />

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
    </>
  );
}
