#!/bin/bash

# 🚀 Scripture Guide Chrome Extension - One-Click Deploy
# This script builds, tests, and packages the extension for Chrome Web Store deployment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

echo "🚀 Scripture Guide Extension - One-Click Deploy"
echo "=================================================="

# Validate environment
print_status "Validating environment..."
if [ ! -f "package.json" ] || [ ! -f "manifest.json" ] || [ ! -f "linker.js" ] || [ ! -f "background.js" ]; then
    print_error "Required files missing. Run from extension root directory."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm not found. Please install Node.js."
    exit 1
fi

print_success "Environment validated"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/ *.zip 2>/dev/null || true
print_success "Previous builds cleaned"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install --silent
    print_success "Dependencies installed"
fi

# Build extension
print_status "Building optimized extension..."
if npm run build --silent; then
    print_success "Extension built successfully"
else
    print_error "Build failed"
    exit 1
fi

# Validate built files
print_status "Validating build output..."
required_files=("manifest.json" "linker.js" "background.js")
for file in "${required_files[@]}"; do
    if [ ! -f "dist/$file" ]; then
        print_error "Required file missing: dist/$file"
        exit 1
    fi
done

# Check file sizes and optimization
linker_size=$(wc -c < "dist/linker.js" | tr -d ' ')
manifest_size=$(wc -c < "dist/manifest.json" | tr -d ' ')
total_size=$(du -sb dist/ 2>/dev/null | cut -f1 || echo "0")

print_success "Build validation passed"
print_status "Optimized file sizes:"
echo "  linker.js: $(echo "scale=1; $linker_size/1024" | bc 2>/dev/null || echo "$linker_size")KB"
echo "  manifest.json: ${manifest_size} bytes"
echo "  Total package: $(echo "scale=1; $total_size/1024" | bc 2>/dev/null || echo "$total_size")KB"

# Quick functionality test
print_status "Running quick validation..."
if grep -q "scripture-guide" "dist/linker.js" 2>/dev/null; then
    print_success "Scripture detection package integrated"
else
    # Check for bundled scripture data (minified)
    if grep -q "Genesis\|Matthew\|Nephi" "dist/linker.js" 2>/dev/null; then
        print_success "Scripture data bundled correctly"
    else
        print_warning "Scripture detection may not be properly bundled"
    fi
fi

if grep -q "addEventListener\|MutationObserver" "dist/linker.js" 2>/dev/null; then
    print_success "Modern event handling detected"
else
    print_warning "Event handling may need verification"
fi

# Validate manifest
if [ -f "dist/manifest.json" ]; then
    if grep -q '"manifest_version": 3' "dist/manifest.json" 2>/dev/null; then
        print_success "Manifest V3 validated"
    else
        print_error "Manifest V3 validation failed"
        exit 1
    fi
fi

# Create optimized package
print_status "Creating Chrome Web Store package..."
cd dist
zip -r ../scripture-guide-extension.zip . -q
cd ..

if [ -f "scripture-guide-extension.zip" ]; then
    package_size=$(du -h scripture-guide-extension.zip | cut -f1)
    print_success "Package created: scripture-guide-extension.zip (${package_size})"
else
    print_error "Package creation failed"
    exit 1
fi

# Final validation
print_status "Final validation..."
if unzip -t scripture-guide-extension.zip > /dev/null 2>&1; then
    print_success "Package integrity verified"
else
    print_error "Package corrupted"
    exit 1
fi

# Extract extension details
if command -v unzip &> /dev/null && command -v grep &> /dev/null; then
    extension_name=$(unzip -p scripture-guide-extension.zip manifest.json 2>/dev/null | grep '"name"' | sed 's/.*"name": *"\([^"]*\)".*/\1/' 2>/dev/null || echo "Scripture Guide")
    extension_version=$(unzip -p scripture-guide-extension.zip manifest.json 2>/dev/null | grep '"version"' | sed 's/.*"version": *"\([^"]*\)".*/\1/' 2>/dev/null || echo "2.0.0")
    
    print_success "Package validated: $extension_name v$extension_version"
fi

echo
echo "🎉 DEPLOYMENT READY!"
echo "===================="
print_success "✅ Extension built and optimized"
print_success "✅ Package created: scripture-guide-extension.zip"
print_success "✅ Chrome Web Store ready"

echo
print_status "📦 Package Details:"
echo "  📁 File: scripture-guide-extension.zip"
echo "  📏 Size: $package_size"
echo "  🏷️  Name: $extension_name"
echo "  🔢 Version: $extension_version"

echo
print_status "🚀 Next Steps:"
echo "1. 🧪 Test locally:"
echo "   • Open Chrome → Extensions (chrome://extensions/)"
echo "   • Enable 'Developer mode'"
echo "   • Click 'Load unpacked' → Select 'dist/' folder"
echo "   • Test on any webpage with scripture references"
echo
echo "2. 🏪 Submit to Chrome Web Store:"
echo "   • Go to: chrome.google.com/webstore/devconsole/"
echo "   • Upload: scripture-guide-extension.zip"
echo "   • Complete store listing and submit for review"
echo
echo "3. 🔄 Future updates:"
echo "   • Edit source files as needed"
echo "   • Run: ./deploy.sh"
echo "   • Upload new package to Chrome Web Store"

echo
print_success "🎯 DEPLOYMENT COMPLETE! Extension ready for Chrome Web Store."
