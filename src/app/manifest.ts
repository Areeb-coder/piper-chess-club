import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piper Chess Club',
    short_name: 'Piper Chess',
    description: 'Think. Calculate. Dominate.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
