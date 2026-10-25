import { MetadataRoute } from 'next';
import { SCHOOLS_DATA } from '@/data/schoolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://schools.clarvo.in';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/schools`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/curriculum-guide`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/compare`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Individual school pages
  const schoolPages: MetadataRoute.Sitemap = SCHOOLS_DATA.map((school) => ({
    url: `${baseUrl}/schools/${school.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...schoolPages];
}
