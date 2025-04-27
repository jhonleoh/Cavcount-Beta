#!/bin/bash

# Build script specifically optimized for Cloudflare Pages
echo "Starting optimized build process for Cloudflare Pages..."

# Ensure dependencies are installed
echo "Installing critters dependency for CSS optimization..."
bun add critters

# Build the application
echo "Building Next.js application..."
bun run build

# Create Cloudflare Pages specific config files
echo "Creating Cloudflare Pages configuration files..."

# Create _headers file directly in output directory
cat > out/_headers << 'EOL'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-XSS-Protection: 1; mode=block
EOL

# Create _routes.json file for Cloudflare Pages
cat > out/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": []
}
EOL

# Ensure robots.txt and sitemap.xml are copied
echo "Copying SEO files to output directory..."
cp -f public/robots.txt out/ 2>/dev/null || echo "No robots.txt found to copy"
cp -f public/sitemap.xml out/ 2>/dev/null || echo "No sitemap.xml found to copy"

echo "Build process completed successfully!"
