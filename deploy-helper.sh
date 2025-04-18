#!/bin/bash

# Script to prepare the project for deployment on Netlify

echo "👋 Preparing CavCount for deployment..."

# Check if running in Netlify environment
if [ -n "$NETLIFY" ]; then
  echo "✅ Running in Netlify environment"

  # Set Node.js version
  echo "📦 Using Node.js version: $(node -v)"

  # Clean up any previous builds
  echo "🧹 Cleaning up previous builds..."
  rm -rf .next out node_modules/.cache

  # Install dependencies if needed
  if [ ! -d "node_modules" ] || [ "$REBUILD_DEPS" == "true" ]; then
    echo "📦 Installing dependencies with npm..."
    npm install
  fi

  # Check for build type (static vs dynamic)
  if [ "$STATIC_BUILD" == "true" ]; then
    echo "🏗️ Preparing for static build..."
    # Update next.config.js to use output: 'export'
    sed -i 's/\/\/ output: '\''export'\''/output: '\''export'\''/g' next.config.js

    # Build static site
    echo "🚀 Building static site..."
    npm run build:static

    # Check if build was successful
    if [ -d "out" ]; then
      echo "✅ Static build successful!"
    else
      echo "❌ Static build failed!"
      exit 1
    fi
  else
    echo "🏗️ Preparing for dynamic build..."
    # Ensure output: 'export' is commented out
    sed -i 's/output: '\''export'\''/\/\/ output: '\''export'\''/g' next.config.js

    # Build dynamic site
    echo "🚀 Building dynamic site..."
    npm run build

    # Check if build was successful
    if [ -d ".next" ]; then
      echo "✅ Dynamic build successful!"
    else
      echo "❌ Dynamic build failed!"
      exit 1
    fi
  fi
else
  echo "🧪 Running locally (not in Netlify environment)"
  echo "Use this script to test the build process locally."
  echo ""
  echo "Options:"
  echo "  --static    Build as a static site"
  echo "  --dynamic   Build as a dynamic site (default)"
  echo ""

  # Handle local command line arguments
  if [ "$1" == "--static" ]; then
    echo "🏗️ Preparing for static build locally..."
    # Update next.config.js to use output: 'export'
    sed -i 's/\/\/ output: '\''export'\''/output: '\''export'\''/g' next.config.js

    # Build static site
    echo "🚀 Building static site..."
    npm run build:static

    # Check if build was successful
    if [ -d "out" ]; then
      echo "✅ Static build successful!"
    else
      echo "❌ Static build failed!"
      exit 1
    fi
  else
    echo "🏗️ Preparing for dynamic build locally..."
    # Ensure output: 'export' is commented out
    sed -i 's/output: '\''export'\''/\/\/ output: '\''export'\''/g' next.config.js

    # Build dynamic site
    echo "🚀 Building dynamic site..."
    npm run build

    # Check if build was successful
    if [ -d ".next" ]; then
      echo "✅ Dynamic build successful!"
    else
      echo "❌ Dynamic build failed!"
      exit 1
    fi
  fi
fi

echo "✨ Done! Your project is ready for deployment."
