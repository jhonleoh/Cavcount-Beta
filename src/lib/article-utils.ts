import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehypeRaw from 'rehype-raw';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const imagesDirectory = path.join(process.cwd(), 'content/images');

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  slug: string;
};

// Check if an image exists at the specified path
function imageExists(imagePath: string): boolean {
  try {
    // Remove the leading '/' if present
    const relativePath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;

    const fullPath = path.join(process.cwd(), relativePath);
    return fs.existsSync(fullPath);
  } catch (error) {
    return false;
  }
}

export async function getArticleData(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(rehypeRaw as any)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Check if the image exists, use a fallback if not
  const imageUrl = matterResult.data.image as string;
  let validatedImage = imageUrl;

  if (!imageExists(imageUrl)) {
    // Use a default image if the specified image doesn't exist
    validatedImage = '/placeholder.png';
  }

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
    image: validatedImage,
  };
}

export function getAllArticles(): ArticleMetadata[] {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Check if the image exists, use a fallback if not
      const imageUrl = matterResult.data.image as string;
      let validatedImage = imageUrl;

      if (!imageExists(imageUrl)) {
        // Use a default image if the specified image doesn't exist
        validatedImage = '/placeholder.png';
      }

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
        image: validatedImage,
      };
    });

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}
