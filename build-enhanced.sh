#!/bin/bash

# Simple build script that ensures proper SEO files are available
echo "Starting enhanced build process..."

# Ensure dependencies are installed
echo "Installing critters dependency for CSS optimization..."
bun add critters

# Build the application
echo "Building Next.js application..."
bun run build

# Make headers file plaintext and copy to output
echo "Making sure _headers is plaintext and copied to output..."
echo '/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
  Content-Security-Policy: default-src '"'"'self'"'"'; script-src '"'"'self'"'"' '"'"'unsafe-inline'"'"' '"'"'unsafe-eval'"'"' https://*; connect-src '"'"'self'"'"' https://* blob:; worker-src '"'"'self'"'"' blob: https://*; img-src '"'"'self'"'"' data: blob: https://*; style-src '"'"'self'"'"' '"'"'unsafe-inline'"'"'; font-src '"'"'self'"'"' data:;
  X-XSS-Protection: 1; mode=block
  Cache-Control: public, max-age=3600

/sitemap.xml
  Cache-Control: public, max-age=0

/robots.txt
  Cache-Control: public, max-age=0' > out/_headers

# Copy robots.txt and sitemap.xml
echo "Copying SEO files to output directory..."
cp -f public/robots.txt out/ 2>/dev/null || :
cp -f public/sitemap.xml out/ 2>/dev/null || :

echo "Build process completed successfully!"
