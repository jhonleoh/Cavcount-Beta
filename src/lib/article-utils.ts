import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

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

  // Use unified/remark/rehype to safely process markdown
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown content
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML, allowing dangerous HTML
    .use(rehypeSanitize) // Sanitize HTML content
    .use(rehypeStringify) // Convert to string
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

// Add a function to ensure the slug is valid
export function validateSlug(slug: string): boolean {
  const validSlugs = getArticleSlugs();
  return validSlugs.includes(slug);
}

// Add a function to check if new articles have been added that don't have pages
export function checkForNewArticles(): string[] {
  const validSlugs = getArticleSlugs();
  // Return the list of valid article slugs
  return validSlugs;
}
