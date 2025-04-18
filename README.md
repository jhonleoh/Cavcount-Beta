This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# CavCount

Word & Sentence Counter with OCR capabilities.

## Deployment Instructions

### Deploying to Netlify

This project is configured to deploy as a dynamic Next.js application on Netlify. Follow these steps for successful deployment:

1. **Connect your GitHub repository to Netlify**
   - Go to Netlify and set up a new site from Git
   - Select your GitHub repository

2. **Configure build settings**
   - Build command: `npm install && npm run build`
   - Publish directory: `.next`

3. **Environment variables**
   - Add the following environment variables in Netlify settings:
     - `NEXT_TELEMETRY_DISABLED`: `1`
     - `NEXT_SKIP_LINT`: `true`
     - `NEXT_TYPESCRIPT_CHECK`: `false`
     - `NEXT_DISABLE_TYPESCRIPT_CHECK`: `true`
     - `NEXT_IGNORE_TYPESCRIPT_ERRORS`: `true`
     - `NODE_OPTIONS`: `--max-old-space-size=4096`

4. **Deployment best practices**
   - The site is configured to deploy as a dynamic SSR site (not a static site)
   - The `@netlify/plugin-nextjs` plugin will handle adapting Next.js for Netlify

### Troubleshooting Deployment Issues

If you encounter deployment failures:

1. Check the Netlify build logs for specific errors
2. Verify that the `next.config.js` doesn't have `output: 'export'` enabled (it should be commented out)
3. Make sure the netlify.toml file is properly configured with the correct build command and publish directory
4. If memory errors occur, increase the `NODE_OPTIONS --max-old-space-size` value

## Local Development

Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build Commands

- `npm run build` - Build the project for deployment
- `npm run lint` - Run linting
- `npm run format` - Format code with Biome
