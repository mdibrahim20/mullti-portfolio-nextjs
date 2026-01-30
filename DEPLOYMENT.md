# Next.js Portfolio - Hostinger Deployment Guide

## Environment Variables Configuration

When deploying to Hostinger, you need to set up the environment variables. Here's what you need to configure:

### Required Environment Variables:
```
NEXT_PUBLIC_API_URL=https://api.ibrahimlogs.me
```

### Hostinger Configuration Steps:

1. **Upload your built files**: After running `npm run build`, upload the contents of the `out` folder to your Hostinger public_html directory.

2. **Set Environment Variables** (if using Node.js hosting):
   - In your Hostinger control panel, go to Node.js settings
   - Add the environment variable: `NEXT_PUBLIC_API_URL=https://api.ibrahimlogs.me`

3. **For Static Hosting** (recommended for this setup):
   - Since we're using `output: 'export'`, your site is completely static
   - The environment variables are baked into the build during compilation
   - Just upload the `out` folder contents to your public_html

### Build Commands:
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The output will be in the 'out' folder
```

### File Upload Structure:
After build, upload these files from the `out` folder to your Hostinger public_html:
```
public_html/
├── _next/
├── version2/
├── version3/
├── version4/
├── index.html
├── robots.txt
├── sitemap.xml
└── ... (other files)
```

## How the API Integration Works:

1. **Build Time**: During `next build`, the API is called to generate metadata and static content
2. **Runtime**: The client-side DataProvider fetches fresh data from your API
3. **Fallback**: If the API is unavailable, fallback data is used

## Troubleshooting:

### If data isn't loading on Hostinger:

1. **Check API URL**: Ensure `https://api.ibrahimlogs.me/api/public/site-data` is accessible
2. **CORS Issues**: Make sure your Laravel API allows requests from your domain
3. **Network Logs**: Check browser developer tools for any network errors
4. **Environment Variables**: Verify the API URL is correctly set in your environment

### Laravel API CORS Configuration:
In your Laravel API, ensure CORS is properly configured to allow requests from your Hostinger domain:

```php
// In config/cors.php or your CORS middleware
'allowed_origins' => ['https://yourdomain.com', 'https://ibrahimlogs.me'],
```