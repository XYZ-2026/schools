import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { SCHOOLS_DATA } from '@/data/schoolsData';

export function generateStaticParams() {
  return SCHOOLS_DATA.slice(0, 50).map((school) => ({
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
      title: 'School Not Found | CLARVO',
    };
  }

  return {
    title: `${school.schoolName} — Board, Fees, Pros & Alumni | CLARVO`,
    description: `${school.schoolName} offers ${school.board} curriculum for grades ${school.grades}. Approx Annual Fees: ${school.approxAnnualFeesInr}. Contact: ${school.contactDetails}`,
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

  redirect(`/schools?school=${slug}`);
}
