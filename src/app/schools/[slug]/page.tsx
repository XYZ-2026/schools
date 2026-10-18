import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import SchoolDetailClient from '@/components/schools/SchoolDetailClient';

export function generateStaticParams() {
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
      title: 'School Not Found | Schools Simplified',
    };
  }

  return {
    title: `${school.name} — Admissions 2026-27, Fees, Ranking & Reviews`,
    description: `${school.tagline}. Discover verified tuition fee schedules, student-to-teacher ratio (${school.studentTeacherRatio}), and Ivy League placement statistics.`,
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

  return <SchoolDetailClient school={school} />;
}
