# Netlify Deployment Instructions

## Option 1: Deploy via GitHub Actions (Recommended)

1. Add these secrets to your GitHub repository:
   - `NETLIFY_AUTH_TOKEN`: Generate a personal access token in Netlify
   - `NETLIFY_SITE_ID`: Get your site ID from Netlify

2. Create the `.github/workflows/netlify-deploy.yml` file as already provided in this repository.

3. Push to the `main` branch to trigger the deployment.

## Option 2: Manual Deployment

If you want to manually deploy to Netlify:

1. Run the build process:
   ```bash
   npm run build
   ```

2. Add the proper headers files to fix CSP issues:
   ```bash
   echo -e "/*\n  Content-Security-Policy: default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; style-src * 'unsafe-inline'; font-src * 'unsafe-inline'\n  X-Frame-Options: DENY\n  X-XSS-Protection: 1; mode=block" > out/_headers
   ```

3. Deploy the `out` directory to Netlify.

## Troubleshooting

### CSP Issues (White Screen)

If you encounter a white screen with Content Security Policy errors:

1. Verify that the `_headers` file and `netlify.toml` file in the `out` directory have correct CSP settings
2. Check that the CSP settings allow 'unsafe-inline' and 'unsafe-eval'
3. Use browser developer tools to identify specific CSP violations

### React Hook Errors

The React hook errors were fixed by:

1. Adding proper state management in `ClientBody.tsx`
2. Avoiding Tesseract initialization in production mode
3. Using conditional rendering to prevent React errors

### Network Errors

If you see network errors for Tesseract.js resources:

1. Verify that the CDN URLs are accessible
2. Check that the CSP allows access to cdn.jsdelivr.net
3. Consider hosting the Tesseract files locally if CDN access is problematic
