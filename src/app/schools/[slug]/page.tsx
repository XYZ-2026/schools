import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import SchoolDetailClient from '@/components/schools/SchoolDetailClient';

// Generate static params for all known school slugs so these pages are statically generated
export async function generateStaticParams() {
  return SCHOOLS_DATA.map((school) => ({
    slug: school.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = SCHOOLS_DATA.find((s) => s.slug === slug);

  if (!school) {
    return {
      title: 'School Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = `${school.schoolName} — ${school.board} | Fees, Pros & Cons`;
  const description = `${school.schoolName} in ${school.city} offers ${school.board} curriculum for grades ${school.grades}. Annual fees: ${school.approxAnnualFeesInr}. Compare board, pros, cons, and alumni achievements.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/schools/${school.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://schools.clarvo.in/schools/${school.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = SCHOOLS_DATA.find((s) => s.slug === slug);

  if (!school) {
    notFound();
  }

  // Server-render meaningful school content for SEO, then hydrate with interactive client component
  const prosList = school.pros ? school.pros.split(';').map((p) => p.trim()).filter(Boolean) : [];
  const consList = school.cons ? school.cons.split(';').map((c) => c.trim()).filter(Boolean) : [];

  return (
    <>
      {/* JSON-LD Structured Data for this school */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: school.schoolName,
            description: `${school.schoolName} offers ${school.board} curriculum for grades ${school.grades} in ${school.city}.`,
            url: `https://schools.clarvo.in/schools/${school.slug}`,
            address: school.address
              ? {
                  '@type': 'PostalAddress',
                  streetAddress: school.address,
                  addressLocality: school.city,
                  addressCountry: 'IN',
                }
              : undefined,
            ...(school.phone ? { telephone: school.phone } : {}),
            ...(school.email ? { email: school.email } : {}),
            ...(school.website
              ? {
                  sameAs: school.website.startsWith('http')
                    ? school.website
                    : `https://${school.website}`,
                }
              : {}),
          }),
        }}
      />

      {/* JSON-LD: BreadcrumbList structured data for rich SERP breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://schools.clarvo.in',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Schools',
                item: 'https://schools.clarvo.in/schools',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: school.schoolName,
                item: `https://schools.clarvo.in/schools/${school.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Server-rendered SEO content — visible to crawlers in initial HTML */}
      <article>
        <SchoolDetailClient school={school} />
      </article>
    </>
  );
}
