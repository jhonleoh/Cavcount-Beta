#!/bin/bash

# Simple deployment script for CavCount

echo "📦 Starting deployment process for CavCount..."

# Change to the root directory of the project
cd "$(dirname "$0")"

# Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf .next node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

# Check if build was successful
if [ -d ".next" ]; then
  echo "✅ Build completed successfully!"
  echo "🚀 Your application is ready to be deployed to Netlify."
  echo ""
  echo "To deploy manually:"
  echo "1. Go to https://app.netlify.com"
  echo "2. Drag and drop the .next folder"
  echo ""
  echo "For automated deployment, push your changes to GitHub and Netlify will deploy automatically."
else
  echo "❌ Build failed!"
  exit 1
fi
