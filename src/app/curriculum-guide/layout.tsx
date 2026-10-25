import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IB vs IGCSE vs ICSE vs CBSE — Curriculum Comparison Guide',
  description:
    'The definitive parent guide to comparing IB Diploma, Cambridge IGCSE, ICSE, and CBSE boards in India. Understand pedagogy, exam structure, university recognition, tuition fees, pros, and cons for each curriculum.',
  alternates: {
    canonical: '/curriculum-guide',
  },
  openGraph: {
    title: 'IB vs IGCSE vs ICSE vs CBSE — Curriculum Comparison Guide | CLARVO',
    description:
      'Compare IB, Cambridge IGCSE, ICSE, and CBSE boards. Understand pedagogy, exam structure, fees, and university recognition.',
    url: 'https://schools.clarvo.in/curriculum-guide',
    type: 'article',
  },
};

export default function CurriculumGuideLayout({
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
            '@type': 'Article',
            headline: 'IB vs Cambridge (IGCSE) vs ICSE vs CBSE Curriculum Comparison Guide',
            description:
              'The decisive parent handbook to decoding India’s four most respected educational boards. Compare philosophy, workload, global university recognition, and entrance examination suitability.',
            url: 'https://schools.clarvo.in/curriculum-guide',
            publisher: {
              '@type': 'Organization',
              name: 'CLARVO',
              logo: {
                '@type': 'ImageObject',
                url: 'https://schools.clarvo.in/logo.png',
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
