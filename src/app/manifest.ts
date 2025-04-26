import type { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CavCount - OCR Word & Sentence Counter | Free Image to Text Tool',
    short_name: 'CavCount',
    description: 'Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#BD5FFF',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'CavCount Desktop Interface'
      },
      {
        src: '/screenshot-2.png',
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'CavCount Mobile Interface'
      }
    ],
    categories: ['productivity', 'utilities'],
  };
}
