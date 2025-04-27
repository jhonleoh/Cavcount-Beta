#!/bin/bash

# Custom build script to ensure proper SEO files handling
echo "Starting enhanced build process..."

# Ensure dependencies are installed
echo "Installing critters dependency..."
bun add critters

# Build the application
echo "Building Next.js application..."
bun run build

# Ensure SEO files are copied to the output directory
echo "Ensuring SEO files are available..."
cp -f public/_headers out/ 2>/dev/null || :
cp -f public/robots.txt out/ 2>/dev/null || :
cp -f public/sitemap.xml out/ 2>/dev/null || :

echo "Build process completed successfully!"
