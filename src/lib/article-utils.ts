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
const publicDirectory = path.join(process.cwd(), 'public');

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  slug: string;
};

// Debug function to help diagnose image path issues
function debugImagePath(imagePath: string, note = ""): void {
  console.log(`[Image Debug] ${note} - Path: ${imagePath}`);
}

// Improved function to check if an image exists at the specified path
function imageExists(imagePath: string): boolean {
  // If no image path is provided, return false immediately
  if (!imagePath) {
    return false;
  }

  try {
    // For absolute URLs, always return true (we can't check if they exist on the server)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      debugImagePath(imagePath, "External URL - assuming it exists");
      return true;
    }

    // Remove the leading '/' if present
    const relativePath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;

    // First check if the file exists in the public directory
    const publicPath = path.join(publicDirectory, relativePath);
    if (fs.existsSync(publicPath)) {
      debugImagePath(publicPath, "Found in public directory");
      return true;
    }

    // Then check in the content directory
    const contentPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(contentPath)) {
      debugImagePath(contentPath, "Found in content directory");
      return true;
    }

    debugImagePath(imagePath, "Image NOT found anywhere");
    return false;
  } catch (error) {
    console.error('Error checking if image exists:', error);
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

  // Get the image path from frontmatter, or set to null if missing
  let imageUrl = matterResult.data.image as string || null;

  // Check if image tag exists, if not use placeholder
  if (!imageUrl) {
    console.log(`No image tag found for article ${slug}, showing 'No image available'`);
    imageUrl = '/placeholder.png';
  } else {
    // In Next.js when using static exports, public images need to be referenced without '/public'
    // If the image path starts with "/public/", remove it
    if (imageUrl.startsWith('/public/')) {
      imageUrl = imageUrl.replace('/public/', '/');
    }

    // Keep the original image URL as we've confirmed images exist in the right places
    // Only use placeholder if absolutely necessary
    if (!imageExists(imageUrl)) {
      console.warn(`Image not found for article ${slug}, using placeholder. Path: ${imageUrl}`);
      imageUrl = '/placeholder.png';
    }
  }

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
    image: imageUrl,
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

      // Get the image path from frontmatter, or set to null if missing
      let imageUrl = matterResult.data.image as string || null;

      // Check if image tag exists, if not use placeholder
      if (!imageUrl) {
        console.log(`No image tag found for article list item ${slug}, showing 'No image available'`);
        imageUrl = '/placeholder.png';
      } else {
        // In Next.js when using static exports, public images need to be referenced without '/public'
        // If the image path starts with "/public/", remove it
        if (imageUrl.startsWith('/public/')) {
          imageUrl = imageUrl.replace('/public/', '/');
        }

        // Only use placeholder if absolutely necessary
        if (!imageExists(imageUrl)) {
          console.warn(`Image not found for article list item ${slug}, using placeholder. Path: ${imageUrl}`);
          imageUrl = '/placeholder.png';
        }
      }

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
        image: imageUrl,
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
