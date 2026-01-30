# CORS Configuration for Laravel API

If your data is not loading on the production site, it might be due to CORS (Cross-Origin Resource Sharing) issues. Here's how to fix it:

## Laravel API CORS Configuration

### Option 1: Using Laravel CORS Package (Recommended)

1. Install the CORS package if not already installed:
```bash
composer require fruitcake/laravel-cors
```

2. In your Laravel API project, update `config/cors.php`:
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',      // Local development
        'https://yourdomain.com',     // Your production domain
        'https://ibrahimlogs.me',     // Add your actual domain here
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### Option 2: Manual CORS Headers

Add this to your Laravel API routes or middleware:

```php
// In your API controller or middleware
header('Access-Control-Allow-Origin: https://yourdomain.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

## Testing Your API

Test your API endpoint directly:
```bash
curl -H "Accept: application/json" https://api.ibrahimlogs.me/api/public/site-data
```

## Common Issues and Solutions

1. **Mixed Content**: Ensure both your site and API use HTTPS
2. **Domain Mismatch**: Make sure your production domain is allowed in CORS
3. **Preflight Requests**: Handle OPTIONS requests in your Laravel API
4. **Cache Issues**: Clear browser cache and CDN cache if using one

## Environment Variables

Make sure these are set correctly:
- Local: `NEXT_PUBLIC_API_URL=https://api.ibrahimlogs.me`
- Production: Same URL, baked into the build