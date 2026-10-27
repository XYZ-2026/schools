import { NextRequest, NextResponse } from 'next/server';
import { fetchWixSchoolsByCity, searchWixSchools, getSchoolBySlug } from '@/lib/wix';

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

    const city = searchParams.get('city') || 'All';
    const board = searchParams.get('board') || 'All';
    const q = searchParams.get('q') || '';
    const grade = searchParams.get('grade') || 'All';
    const sort = searchParams.get('sort') || 'name';
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');

    const limit = limitParam ? parseInt(limitParam, 10) : (city !== 'All' && !q && board === 'All' ? 300 : 60);
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

    // If city is specific and no keyword/board filter, fetch full city list with parallel batches
    if (city !== 'All' && !q && board === 'All' && !offsetParam) {
      const { schools, total } = await fetchWixSchoolsByCity(city, true);
      return NextResponse.json({
        city,
        board,
        total,
        count: schools.length,
        offset: 0,
        limit: schools.length,
        hasMore: false,
        schools,
      });
    }

    // Comprehensive multi-field query across 5,249 schools in Wix CMS
    const { schools, total, hasMore } = await searchWixSchools({
      city,
      board,
      query: q,
      grade,
      limit,
      offset,
      sort,
    });

    return NextResponse.json({
      city,
      board,
      query: q,
      total,
      count: schools.length,
      offset,
      limit,
      hasMore,
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
