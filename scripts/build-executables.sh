#!/bin/bash
# Build single executable using pkg

set -e

echo "🔨 Building BLNT-CLI executables with pkg..."

# Ensure build is up to date
npm run build

# Install pkg if not already installed
if ! command -v pkg &> /dev/null; then
    echo "📦 Installing pkg..."
    npm install -g pkg
fi

# Create build directory
mkdir -p build

# Build executables for all platforms
echo "🏗️  Building for Linux, macOS, and Windows..."
pkg . \
    --targets node18-linux-x64,node18-macos-x64,node18-win-x64 \
    --output build/blnt \
    --compress GZip

# Rename outputs for clarity
mv build/blnt-linux build/blnt-linux-x64 2>/dev/null || true
mv build/blnt-macos build/blnt-macos-x64 2>/dev/null || true
mv build/blnt-win.exe build/blnt-windows-x64.exe 2>/dev/null || true

echo "✅ Build complete! Executables are in the build/ directory:"
ls -lh build/

echo ""
echo "📦 Distribution files:"
echo "  - Linux:   build/blnt-linux-x64"
echo "  - macOS:   build/blnt-macos-x64"
echo "  - Windows: build/blnt-windows-x64.exe"
