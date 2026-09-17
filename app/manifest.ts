import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Knight Watch — Campaign Finance Watch Tool',
    short_name: 'Knight Watch',
    description:
      'Track political campaign money, expose misuse of public resources and safeguard public funds in Kenya.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: 'en-KE',
    dir: 'ltr',
    categories: ['government', 'news', 'education'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
