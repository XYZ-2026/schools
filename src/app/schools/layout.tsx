import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Schools in India — CBSE, ICSE, IB, IGCSE',
  description:
    'Browse and compare 400+ verified schools across India. Filter by CBSE, ICSE, IB, and Cambridge IGCSE boards, city, annual fees, and grades. Find the perfect school for your child.',
  alternates: {
    canonical: '/schools',
  },
  openGraph: {
    title: 'Explore Schools in India — CBSE, ICSE, IB, IGCSE | CLARVO',
    description:
      'Browse and compare 400+ verified schools across India. Filter by board, city, annual fees, and grades.',
    url: 'https://schools.clarvo.in/schools',
    type: 'website',
  },
};

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
                name: 'Explore Schools',
                item: 'https://schools.clarvo.in/schools',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
