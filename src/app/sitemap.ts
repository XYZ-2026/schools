import { MetadataRoute } from 'next';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { fetchWixSchools } from '@/lib/wix';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    {
      url: `${baseUrl}/match`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Fetch live schools from database (with fallback to bundled dataset)
  let schools = SCHOOLS_DATA;
  try {
    const liveSchools = await fetchWixSchools();
    if (liveSchools && liveSchools.length > 0) {
      schools = liveSchools;
    }
  } catch (err) {
    console.warn('Sitemap fallback to bundled schools:', err);
  }

  // Individual school pages
  const schoolPages: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${baseUrl}/schools/${school.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...schoolPages];
}
