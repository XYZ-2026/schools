import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SchoolProvider } from '@/context/SchoolContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareDrawer from '@/components/schools/CompareDrawer';
import SchoolDetailModal from '@/components/schools/SchoolDetailModal';


export const metadata: Metadata = {
  metadataBase: new URL('https://schools.clarvo.in'),
  title: {
    default: 'CLARVO — Find The Perfect School in India | IB, IGCSE, ICSE, CBSE',
    template: '%s | CLARVO',
  },
  description:
    'Discover and compare India\'s best schools across IB World, Cambridge IGCSE, ICSE, and CBSE boards. Compare tuition fees, student-teacher ratios, boarding amenities, and Ivy League college placements.',
  keywords: [
    'best schools in india',
    'IB schools in Mumbai',
    'top boarding schools Dehradun',
    'IGCSE Cambridge schools Bangalore',
    'ICSE vs CBSE vs IB',
    'Doon School',
    'Dhirubhai Ambani International School',
    'TISB Bangalore',
    'school admission finder India 2026',
    'school fee comparison'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'CLARVO',
    type: 'website',
    locale: 'en_IN',
    url: 'https://schools.clarvo.in',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'CLARVO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#080F1C] min-h-screen flex flex-col antialiased font-[Inter,sans-serif]">
        {/* JSON-LD: WebSite structured data for sitelinks & search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CLARVO',
              url: 'https://schools.clarvo.in',
              description:
                'Discover and compare the best schools in India across IB, IGCSE, ICSE, and CBSE boards.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://schools.clarvo.in/schools?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* JSON-LD: Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CLARVO',
              url: 'https://schools.clarvo.in',
              logo: 'https://schools.clarvo.in/logo.png',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@clarvo.in',
                contactType: 'customer support',
              },
            }),
          }}
        />
        <AuthProvider>
          <SchoolProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <CompareDrawer />
            <SchoolDetailModal />
            <Footer />
          </SchoolProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
