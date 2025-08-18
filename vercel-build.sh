#!/bin/bash

# Build script for Vercel deployment
echo "Starting Vercel build..."

# Install dependencies
npm install --legacy-peer-deps --ignore-scripts

# Build only the web app
echo "Building web app..."
cd apps/web
npm run build

echo "Build completed successfully!" 