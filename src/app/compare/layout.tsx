import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Side-by-Side School Comparison — Fees, Board, Pros & Cons',
  description:
    'Compare up to 4 schools side-by-side across CBSE, ICSE, IB, and IGCSE boards. Evaluate annual tuition fees, curricula, key strengths, considerations, alumni achievements, and contact details.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Side-by-Side School Comparison | CLARVO',
    description:
      'Compare up to 4 schools side-by-side across board, fees, pros, cons, and alumni.',
    url: 'https://schools.clarvo.in/compare',
    type: 'website',
  },
};

export default function CompareLayout({
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
                name: 'Compare Schools',
                item: 'https://schools.clarvo.in/compare',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
