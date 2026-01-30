#!/bin/bash
# Deployment script for Hostinger

echo "Starting deployment process..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out 2>/dev/null || true

# Install dependencies (if needed)
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "Build failed! 'out' directory not found."
    exit 1
fi

# Copy .htaccess to out directory
echo "Copying .htaccess to build output..."
cp .htaccess out/.htaccess

# Create a zip file for easy upload
echo "Creating deployment package..."
cd out
zip -r ../hostinger-deployment.zip . -x "*.DS_Store" "*.git*"
cd ..

echo "Deployment package created: hostinger-deployment.zip"
echo ""
echo "Upload Instructions:"
echo "1. Extract hostinger-deployment.zip"
echo "2. Upload all contents to your Hostinger public_html directory"
echo "3. Ensure .htaccess file is uploaded and visible"
echo ""
echo "Or manually upload the contents of the 'out' folder to public_html"
echo "Deployment preparation complete!"