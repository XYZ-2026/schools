import { School, PrimarySchoolBoard } from '@/types/school';
import { SCHOOLS_DATA } from '@/data/schoolsData';

const WIX_SITE_ID = process.env.WIX_SITE_ID || 'be07e82f-dd8d-4a26-828d-fce6bdb485bb';
const WIX_API_KEY = process.env.WIX_API_KEY || '';
const WIX_COLLECTION_ID = process.env.WIX_COLLECTION_ID || 'Import9';

export function isWixConfigured(): boolean {
  return Boolean(WIX_SITE_ID && WIX_API_KEY);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function parseContact(contactStr: string) {
  const parts = contactStr.split('|').map((p) => p.trim());
  const address = parts[0] || '';
  let phone = '';
  let email = '';
  let website = '';

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (p.includes('@')) {
      email = p;
    } else if (/\d{7,}/.test(p.replace(/\D/g, '')) && (p.includes('+') || p.includes('-'))) {
      phone = p;
    } else if (p.includes('.') && !p.includes('@')) {
      website = p;
    }
  }

  // Detect city
  let city = 'Other';
  const lowerAddr = address.toLowerCase();
  if (lowerAddr.includes('mumbai') || lowerAddr.includes('navi mumbai') || lowerAddr.includes('thane')) {
    city = 'Mumbai';
  } else if (lowerAddr.includes('bangalore') || lowerAddr.includes('bengaluru')) {
    city = 'Bengaluru';
  } else if (
    lowerAddr.includes('delhi') ||
    lowerAddr.includes('ncr') ||
    lowerAddr.includes('noida') ||
    lowerAddr.includes('gurugram') ||
    lowerAddr.includes('gurgaon')
  ) {
    city = 'Delhi NCR';
  } else if (lowerAddr.includes('pune')) {
    city = 'Pune';
  } else if (lowerAddr.includes('hyderabad')) {
    city = 'Hyderabad';
  } else if (lowerAddr.includes('chennai')) {
    city = 'Chennai';
  } else if (lowerAddr.includes('kolkata')) {
    city = 'Kolkata';
  } else if (lowerAddr.includes('dehradun')) {
    city = 'Dehradun';
  } else if (lowerAddr.includes('mussoorie')) {
    city = 'Mussoorie';
  } else if (lowerAddr.includes('jaipur')) {
    city = 'Jaipur';
  }

  return { address, phone, email, website, city };
}

function parseFees(feeStr: string): { feeMin: number; feeMax: number } {
  const clean = feeStr.replace(/Rs\./g, '').replace(/,/g, '').trim();
  const matches = clean.match(/\d+/g);
  if (matches && matches.length >= 2) {
    return { feeMin: parseInt(matches[0], 10), feeMax: parseInt(matches[1], 10) };
  } else if (matches && matches.length === 1) {
    const num = parseInt(matches[0], 10);
    return { feeMin: num, feeMax: num };
  }
  return { feeMin: 0, feeMax: 0 };
}

function detectPrimaryBoard(boardStr: string): PrimarySchoolBoard {
  const b = boardStr.toUpperCase();
  if (b.includes('IB')) return 'IB';
  if (b.includes('IGCSE') || b.includes('CAMBRIDGE')) return 'IGCSE';
  if (b.includes('ICSE') || b.includes('ISC')) return 'ICSE';
  if (b.includes('CBSE')) return 'CBSE';
  return 'State Board';
}

export function normalizeWixSchool(raw: Record<string, unknown>, index = 0): School {
  const schoolName = String(raw.schoolName || raw.name || 'Unnamed School').trim();
  const baseSlug = slugify(schoolName);
  const slug = index > 0 ? `${baseSlug}-${index}` : baseSlug;
  const board = String(raw.board || 'CBSE').trim();
  const primaryBoard = detectPrimaryBoard(board);
  const grades = String(raw.grades || '1-12').trim();
  const approxAnnualFeesInr = String(raw.approxAnnualFeesInr || 'Fees upon request').trim();
  const { feeMin, feeMax } = parseFees(approxAnnualFeesInr);
  const contactDetails = String(raw.contactDetails || '').trim();
  const { address, phone, email, website, city } = parseContact(contactDetails);
  const pros = String(raw.pros || '').trim();
  const cons = String(raw.cons || '').trim();
  const notableAlumniAchievements = String(raw.notableAlumniAchievements || '').trim();

  return {
    id: String(raw._id || raw.id || slug),
    slug,
    schoolName,
    board,
    primaryBoard,
    grades,
    approxAnnualFeesInr,
    feeMin,
    feeMax,
    contactDetails,
    address,
    phone,
    email,
    website,
    city,
    pros,
    cons,
    notableAlumniAchievements,
  };
}

/**
 * Fetch all schools from Wix CMS collection `Import9`.
 * If offline or credentials not configured, seamlessly falls back to pre-bundled 405 schools.
 */
export async function fetchWixSchools(): Promise<School[]> {
  if (!isWixConfigured()) {
    return SCHOOLS_DATA;
  }

  try {
    const allSchools: School[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const response = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID,
          Authorization: WIX_API_KEY,
        },
        body: JSON.stringify({
          dataCollectionId: WIX_COLLECTION_ID,
          query: { paging: { limit, offset } },
        }),
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.warn(`Wix query for ${WIX_COLLECTION_ID} failed [${response.status}]. Using fallback.`);
        return SCHOOLS_DATA;
      }

      const json = await response.json();
      const items = json.dataItems || [];
      if (!items.length) break;

      for (const item of items) {
        allSchools.push(normalizeWixSchool(item.data || {}));
      }

      if (items.length < limit) break;
      offset += limit;
    }

    return allSchools.length > 0 ? allSchools : SCHOOLS_DATA;
  } catch (err) {
    console.error('Error fetching Wix CMS schools:', err);
    return SCHOOLS_DATA;
  }
}
