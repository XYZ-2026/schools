import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In or Create Account',
  description:
    'Sign in to your CLARVO account to access AI School Matcher, saved shortlists, and school comparison tools.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/auth',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
