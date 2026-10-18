import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SchoolProvider } from '@/context/SchoolContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareDrawer from '@/components/schools/CompareDrawer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://schoolssimplified.in'),
  title: {
    default: 'Schools Simplified — Find The Perfect School in India | IB, IGCSE, ICSE, CBSE',
    template: '%s | Schools Simplified',
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
  openGraph: {
    siteName: 'Schools Simplified',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Schools Simplified Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="bg-[#F6F4F2] text-[#111111] min-h-screen flex flex-col antialiased font-[Poppins]">
        <SchoolProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CompareDrawer />
          <Footer />
        </SchoolProvider>
      </body>
    </html>
  );
}
