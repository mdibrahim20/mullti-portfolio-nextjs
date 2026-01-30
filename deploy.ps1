# PowerShell Deployment Script for Hostinger
Write-Host "Starting deployment process..." -ForegroundColor Green

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force out -ErrorAction SilentlyContinue
Remove-Item hostinger-deployment.zip -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (-not (Test-Path "out")) {
    Write-Host "Build failed! 'out' directory not found." -ForegroundColor Red
    exit 1
}

# Copy .htaccess to out directory
Write-Host "Copying .htaccess to build output..." -ForegroundColor Yellow
Copy-Item .htaccess out/.htaccess

# Create a zip file for easy upload
Write-Host "Creating deployment package..." -ForegroundColor Yellow
Set-Location out
Compress-Archive -Path * -DestinationPath ../hostinger-deployment.zip -Force
Set-Location ..

Write-Host "Deployment package created: hostinger-deployment.zip" -ForegroundColor Green
Write-Host ""
Write-Host "Upload Instructions:" -ForegroundColor Cyan
Write-Host "1. Extract hostinger-deployment.zip" -ForegroundColor White
Write-Host "2. Upload all contents to your Hostinger public_html directory" -ForegroundColor White
Write-Host "3. Ensure .htaccess file is uploaded and visible" -ForegroundColor White
Write-Host ""
Write-Host "Or manually upload the contents of the 'out' folder to public_html" -ForegroundColor White
Write-Host "Deployment preparation complete!" -ForegroundColor Green