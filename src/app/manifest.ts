import { MetadataRoute } from 'next';

// Force static rendering for export
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CavCount - Word & Sentence Counter',
    short_name: 'CavCount',
    description: 'Count words, sentences, characters, and extract text from images with OCR',
    start_url: '/',
    display: 'standalone',
    background_color: '#040a13',
    theme_color: '#6b2bd8',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
