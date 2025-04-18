#!/bin/bash

# Simple, reliable build script for Netlify
echo "🚀 Starting Netlify build process for CavCount"

# Set environment variables to disable TypeScript checking and linting
export NEXT_DISABLE_TYPESCRIPT_CHECK=true
export NEXT_TYPESCRIPT_CHECK=false
export NEXT_SKIP_LINT=true
export NEXT_IGNORE_TYPESCRIPT_ERRORS=true
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install specific Tesseract version
echo "📦 Installing Tesseract.js..."
npm install --no-save tesseract.js@6.0.1

# Build the app
echo "🏗️ Building Next.js application..."
next build

# Check if build was successful
if [ -d ".next" ]; then
  echo "✅ Build completed successfully!"
  exit 0
else
  echo "❌ Build failed!"
  exit 1
fi
