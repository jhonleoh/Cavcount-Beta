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
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate HTML template for a generic page
function generatePageHtml(options) {
  const {
    title,
    description,
    url,
    type = 'website',
    image = '/og-image.png',
    canonical
  } = options;

  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  const fullUrl = `${baseUrl}${url}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : fullUrl;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDescription}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDescription}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Cavcount">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedDescription}">
  <meta name="twitter:image" content="${imageUrl}">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
</head>
<body>
  <h1>${escapedTitle}</h1>
  <p>${escapedDescription}</p>
  <p><a href="${url}">View this page</a></p>
</body>
</html>`;
}

// Generate HTML template for an article
function generateArticleHtml(article) {
  const { title, description, date, author, image, tags = [], slug } = article;
  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  const escapedAuthor = escapeHtml(author);

  const url = `/articles/${slug}`;
  const fullUrl = `${baseUrl}${url}`;
  const imageUrl = image && image.startsWith('http')
    ? image
    : `${baseUrl}${image || '/placeholder.png'}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle} | Cavcount</title>
  <meta name="description" content="${escapedDescription}">
  <link rel="canonical" href="${fullUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${fullUrl}">
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
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${escapedTitle} | Cavcount">
  <meta name="twitter:description" content="${escapedDescription}">
  <meta name="twitter:image" content="${imageUrl}">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!-- Schema.org / JSON-LD -->
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
        "@id": "${fullUrl}"
      }
    }
  </script>
</head>
<body>
  <h1>${escapedTitle}</h1>
  <p>${escapedDescription}</p>
  <p><a href="${url}">View this article</a></p>
</body>
</html>`;
}

// Generate all files
function generateFiles() {
  try {
    console.log('Starting metadata generation...');

    // Generate main index.html
    const indexHtml = generatePageHtml({
      title: "Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool",
      description: "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly.",
      url: "/",
      type: "website",
      image: "/og-image.png",
      canonical: "/"
    });

    fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);
    console.log('Generated index.html');

    // Generate About page HTML
    const aboutHtml = generatePageHtml({
      title: "About Us | Cavcount",
      description: "Learn about Cavcount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
      url: "/about",
      type: "website",
      image: "/og-image.png",
      canonical: "/about"
    });

    fs.writeFileSync(path.join(publicDir, 'about.html'), aboutHtml);
    console.log('Generated about.html');

    // Generate Contact page HTML
    const contactHtml = generatePageHtml({
      title: "Contact Us | Cavcount",
      description: "Contact Cavcount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
      url: "/contact",
      type: "website",
      image: "/og-image.png",
      canonical: "/contact"
    });

    fs.writeFileSync(path.join(publicDir, 'contact.html'), contactHtml);
    console.log('Generated contact.html');

    // Generate Privacy page HTML
    const privacyHtml = generatePageHtml({
      title: "Privacy Policy | Cavcount",
      description: "Cavcount's privacy policy and data protection information",
      url: "/privacy",
      type: "website",
      image: "/og-image.png",
      canonical: "/privacy"
    });

    fs.writeFileSync(path.join(publicDir, 'privacy.html'), privacyHtml);
    console.log('Generated privacy.html');

    // Generate Articles page HTML
    const articlesHtml = generatePageHtml({
      title: "Articles | Cavcount",
      description: "Read the latest articles about text analysis, OCR technology, and writing tips from Cavcount.",
      url: "/articles",
      type: "website",
      image: "/og-image.png",
      canonical: "/articles"
    });

    fs.writeFileSync(path.join(publicDir, 'articles.html'), articlesHtml);
    console.log('Generated articles.html');

    // Process article files
    if (fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir);
      console.log(`Found ${files.length} files in content/articles`);

      files.forEach(file => {
        if (!file.endsWith('.md')) return;

        try {
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

          // Write to file with slug name
          const outputPath = path.join(publicDir, `${slug}.html`);
          fs.writeFileSync(outputPath, htmlContent);

          console.log(`Generated ${slug}.html`);
        } catch (e) {
          console.error(`Error processing article ${file}:`, e);
        }
      });
    } else {
      console.warn(`Content directory ${contentDir} does not exist`);
    }

    console.log('All metadata files generated successfully!');
  } catch (error) {
    console.error('Error generating metadata files:', error);
    throw error;
  }
}

// Main execution
try {
  generateFiles();
} catch (error) {
  console.error('Failed to generate metadata files:', error);
  process.exit(1);
}
