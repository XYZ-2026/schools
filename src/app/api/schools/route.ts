import { NextRequest, NextResponse } from 'next/server';
import { fetchWixSchoolsByCity, getSchoolBySlug } from '@/lib/wix';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Single school lookup
    if (slug) {
      const school = await getSchoolBySlug(slug);
      if (!school) {
        return NextResponse.json({ error: 'School not found' }, { status: 404 });
      }
      return NextResponse.json({ school });
    }

    // City-based search / filter
    const city = searchParams.get('city') || 'All';
    const { schools, total } = await fetchWixSchoolsByCity(city, true);

    return NextResponse.json({
      city,
      total,
      count: schools.length,
      schools,
    });
  } catch (err) {
    console.error('Error in /api/schools:', err);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}
