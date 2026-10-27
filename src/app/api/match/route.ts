import { NextRequest, NextResponse } from 'next/server';
import { matchWixSchools, MatcherPreferences } from '@/lib/wix';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MatcherPreferences;
    const result = await matchWixSchools(body || {});

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error in /api/match:', err);
    return NextResponse.json(
      { error: 'Failed to compute school matches' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'All';
    const board = searchParams.get('board') || 'All';
    const grade = searchParams.get('grade') || 'All';
    const priority = searchParams.get('priority') || 'balanced';
    const budgetMax = searchParams.get('budget') ? parseInt(searchParams.get('budget')!, 10) : undefined;

    const result = await matchWixSchools({
      city,
      board,
      grade,
      priority,
      budgetMax,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error in /api/match GET:', err);
    return NextResponse.json(
      { error: 'Failed to compute school matches' },
      { status: 500 }
    );
  }
}
