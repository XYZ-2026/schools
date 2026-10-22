import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SchoolProvider } from '@/context/SchoolContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareDrawer from '@/components/schools/CompareDrawer';
import SchoolDetailModal from '@/components/schools/SchoolDetailModal';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://schoolssimplified.in'),
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
  openGraph: {
    siteName: 'CLARVO',
    type: 'website',
    locale: 'en_IN',
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-[#080F1C] min-h-screen flex flex-col antialiased font-[Inter]">
        <SchoolProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CompareDrawer />
          <SchoolDetailModal />
          <Footer />
        </SchoolProvider>
      </body>
    </html>
  );
}
