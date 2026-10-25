import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth', '/login', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://schools.clarvo.in/sitemap.xml',
  };
}
