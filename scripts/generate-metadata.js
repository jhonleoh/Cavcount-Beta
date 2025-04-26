const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const contentDir = path.join(process.cwd(), 'content/articles');
const publicDir = path.join(process.cwd(), 'public');

// Create directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Base URL
const baseUrl = 'https://cavcount.app';

// Escape HTML special characters
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate HTML template for an article
function generateArticleHtml(article) {
  const { title, description, date, author, image, tags = [], slug } = article;
  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  const escapedAuthor = escapeHtml(author);

  const imageUrl = image && image.startsWith('http')
    ? image
    : `${baseUrl}${image || '/placeholder.png'}`;

  const articleUrl = `${baseUrl}/articles/${slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle} | Cavcount</title>
  <meta name="description" content="${escapedDescription}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:title" content="${escapedTitle} | Cavcount">
  <meta property="og:description" content="${escapedDescription}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Cavcount">
  <meta property="og:locale" content="en_US">
  <meta property="article:published_time" content="${date}">
  <meta property="article:author" content="${escapedAuthor}">
  ${tags.map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n  ')}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${articleUrl}">
  <meta property="twitter:title" content="${escapedTitle} | Cavcount">
  <meta property="twitter:description" content="${escapedDescription}">
  <meta property="twitter:image" content="${imageUrl}">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!-- Redirection to app -->
  <meta http-equiv="refresh" content="0;url=/articles/${slug}">

  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${escapedTitle}",
      "description": "${escapedDescription}",
      "image": "${imageUrl}",
      "author": {
        "@type": "Person",
        "name": "${escapedAuthor}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cavcount",
        "logo": {
          "@type": "ImageObject",
          "url": "${baseUrl}/icon.png"
        }
      },
      "datePublished": "${date}",
      "dateModified": "${date}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${articleUrl}"
      }
    }
  </script>
</head>
<body>
  <h1>${escapedTitle}</h1>
  <p>${escapedDescription}</p>
  <p>If you are not redirected automatically, <a href="/articles/${slug}">click here</a>.</p>
</body>
</html>`;
}

// Generate and save article HTML files
function generateArticleFiles() {
  try {
    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(`Content directory ${contentDir} does not exist`);
      return;
    }

    // Get all article files
    const files = fs.readdirSync(contentDir);

    if (files.length === 0) {
      console.warn('No article files found');
      return;
    }

    // Process each article
    files.forEach(file => {
      if (!file.endsWith('.md')) return;

      // Read the file
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Get the slug from filename
      const slug = file.replace(/\.md$/, '');

      // Create article data
      const articleData = {
        ...data,
        slug,
      };

      // Generate HTML
      const htmlContent = generateArticleHtml(articleData);

      // Write to file
      const outputPath = path.join(publicDir, `${slug}.html`);
      fs.writeFileSync(outputPath, htmlContent);

      console.log(`Generated metadata file for ${slug}`);
    });

    // Generate main index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool</title>
  <meta name="description" content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/">
  <meta property="og:title" content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool">
  <meta property="og:description" content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool.">
  <meta property="og:image" content="${baseUrl}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Cavcount">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${baseUrl}/">
  <meta property="twitter:title" content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool">
  <meta property="twitter:description" content="Count words, sentences, characters, and paragraphs with our free OCR tool.">
  <meta property="twitter:image" content="${baseUrl}/twitter-image.png">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Cavcount",
      "url": "${baseUrl}",
      "description": "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
      "applicationCategory": "Utility",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "featureList": [
        "Word counting",
        "Sentence counting",
        "Character counting",
        "OCR text extraction",
        "Reading time calculation",
        "Paragraph counting"
      ],
      "screenshot": "${baseUrl}/screenshot.png",
      "creator": {
        "@type": "Organization",
        "name": "Cavcount",
        "url": "${baseUrl}"
      }
    }
  </script>
</head>
<body>
  <h1>Cavcount - OCR Word & Sentence Counter</h1>
  <p>Free online tool to count words, sentences, and characters. Upload images for OCR text extraction.</p>
</body>
</html>`;

    fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);
    console.log('Generated index metadata file');

    // Generate articles.html
    const articlesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Articles | Cavcount</title>
  <meta name="description" content="Read the latest articles about text analysis, OCR technology, and writing tips from Cavcount.">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/articles">
  <meta property="og:title" content="Articles | Cavcount">
  <meta property="og:description" content="Read the latest articles about text analysis, OCR technology, and writing tips from Cavcount.">
  <meta property="og:image" content="${baseUrl}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Cavcount">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${baseUrl}/articles">
  <meta property="twitter:title" content="Articles | Cavcount">
  <meta property="twitter:description" content="Read the latest articles about text analysis, OCR technology, and writing tips.">
  <meta property="twitter:image" content="${baseUrl}/twitter-image.png">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Articles | Cavcount",
      "url": "${baseUrl}/articles",
      "description": "Read the latest articles about text analysis, OCR technology, and writing tips.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Cavcount",
        "url": "${baseUrl}"
      }
    }
  </script>
</head>
<body>
  <h1>Cavcount Articles</h1>
  <p>Read the latest articles about text analysis, OCR technology, and writing tips.</p>
</body>
</html>`;

    fs.writeFileSync(path.join(publicDir, 'articles.html'), articlesHtml);
    console.log('Generated articles metadata file');

  } catch (error) {
    console.error('Error in generateArticleFiles:', error);
    throw error;
  }
}

// Main execution
try {
  generateArticleFiles();
  console.log('All metadata files generated successfully!');
} catch (error) {
  console.error('Error generating metadata files:', error);
  process.exit(1);
}
