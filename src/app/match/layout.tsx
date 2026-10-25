import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI School Matcher — Find Your Child's Ideal School & Board",
  description:
    'Take our 60-second AI-powered assessment to find the ideal school board and top matched schools for your child based on academic vision, budget, and learning style.',
  alternates: {
    canonical: '/match',
  },
  openGraph: {
    title: 'AI School Matcher — Find Your Child\'s Ideal School | CLARVO',
    description:
      'Take our 60-second AI-powered assessment to find the ideal school and curriculum for your child.',
    url: 'https://schools.clarvo.in/match',
    type: 'website',
  },
};

export default function MatchLayout({
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
                name: 'School Matcher',
                item: 'https://schools.clarvo.in/match',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
