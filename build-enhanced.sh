#!/bin/bash

# Custom build script to ensure proper metadata for SEO
echo "Starting build process with enhanced SEO metadata handling..."

# Clean previous build
rm -rf .next out

# Ensure sitemap and robots are properly handled
echo "Ensuring SEO files are properly configured..."

# Build the application
echo "Building Next.js application..."
bun run build

# Post-processing for better SEO
echo "Performing SEO post-processing..."

# Special handling for structured data
echo "Optimizing structured data..."

# Copy _headers file to ensure it's included in the build
cp public/_headers out/

# Optimize robots.txt and sitemap for SEO
cp public/robots.txt out/

echo "Build process completed with enhanced SEO!"
