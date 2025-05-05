import { MetadataRoute } from 'next';

// Force static rendering for export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'cavcount.app/sitemap.xml',
  };
}
