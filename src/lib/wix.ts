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
  } else if (lowerAddr.includes('chandigarh')) {
    city = 'Chandigarh';
  } else if (lowerAddr.includes('ahmedabad')) {
    city = 'Ahmedabad';
  } else if (lowerAddr.includes('chennai')) {
    city = 'Chennai';
  } else if (lowerAddr.includes('kolkata')) {
    city = 'Kolkata';
  } else if (lowerAddr.includes('kochi') || lowerAddr.includes('cochin')) {
    city = 'Kochi';
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

export function normalizeCityName(cityName: string): string {
  const c = cityName.trim();
  const lower = c.toLowerCase();
  if (lower === 'bangalore' || lower === 'bengaluru') return 'Bengaluru';
  if (lower === 'delhi' || lower === 'delhi ncr' || lower === 'delhi-ncr' || lower === 'new delhi' || lower === 'gurugram' || lower === 'gurgaon' || lower === 'noida') return 'Delhi-NCR';
  if (lower === 'mumbai' || lower === 'navi mumbai' || lower === 'thane') return 'Mumbai';
  if (lower === 'pune') return 'Pune';
  if (lower === 'hyderabad') return 'Hyderabad';
  if (lower === 'chandigarh') return 'Chandigarh';
  if (lower === 'ahmedabad') return 'Ahmedabad';
  if (lower === 'chennai') return 'Chennai';
  if (lower === 'kolkata') return 'Kolkata';
  if (lower === 'kochi' || lower === 'cochin') return 'Kochi';
  if (lower === 'jaipur') return 'Jaipur';
  if (lower === 'nashik') return 'Nashik';
  if (lower === 'dehradun') return 'Dehradun';
  if (lower === 'mussoorie') return 'Mussoorie';
  if (lower === 'ajmer') return 'Ajmer';
  return c || 'Other';
}

export function getCityQueryValues(city: string): string[] {
  const c = city.trim();
  const lower = c.toLowerCase();
  if (lower === 'bengaluru' || lower === 'bangalore') {
    return ['Bangalore', 'Bengaluru'];
  }
  if (lower === 'delhi' || lower === 'delhi ncr' || lower === 'delhi-ncr' || lower === 'new delhi' || lower === 'gurugram' || lower === 'noida') {
    return ['Delhi', 'Delhi NCR', 'New Delhi', 'Gurugram', 'Noida'];
  }
  if (lower === 'mumbai') {
    return ['Mumbai', 'Navi Mumbai', 'Thane'];
  }
  if (lower === 'pune') return ['Pune'];
  if (lower === 'hyderabad') return ['Hyderabad'];
  if (lower === 'chandigarh') return ['Chandigarh'];
  if (lower === 'ahmedabad') return ['Ahmedabad'];
  if (lower === 'chennai') return ['Chennai'];
  if (lower === 'kolkata') return ['Kolkata'];
  if (lower === 'kochi' || lower === 'cochin') return ['Kochi', 'Cochin'];
  if (lower === 'jaipur') return ['Jaipur'];
  if (lower === 'nashik') return ['Nashik'];
  if (lower === 'dehradun') return ['Dehradun'];
  return [c];
}

export function normalizeWixSchool(raw: Record<string, unknown>, index = 0): School {
  const schoolName = String(raw.schoolName || raw.name || 'Unnamed School').trim();
  const baseSlug = slugify(schoolName);
  const rawId = String(raw._id || raw.id || '');
  const slug = baseSlug || (rawId ? `school-${rawId}` : `school-${index}`);
  const board = String(raw.board || 'CBSE').trim();
  const primaryBoard = detectPrimaryBoard(board);
  const grades = String(raw.grades || '1-12').trim();
  const approxAnnualFeesInr = String(raw.approxAnnualFeesInr || 'Fees upon request').trim();
  const { feeMin, feeMax } = parseFees(approxAnnualFeesInr);
  const contactDetails = String(raw.contactDetails || '').trim();
  const { address, phone, email, website, city: parsedContactCity } = parseContact(contactDetails);
  
  // Extract direct CMS city column (handles 'ciy', 'city', 'City', 'CITY')
  const rawCmsCity = String(raw.ciy || raw.city || raw.City || raw.CITY || '').trim();
  const city = normalizeCityName(rawCmsCity || parsedContactCity || 'Other');
  
  const pros = String(raw.pros || '').trim();
  const cons = String(raw.cons || '').trim();
  const notableAlumniAchievements = String(raw.notableAlumniAchievements || '').trim();

  return {
    id: rawId || slug,
    slug,
    schoolName,
    board,
    primaryBoard,
    grades,
    approxAnnualFeesInr,
    feeMin,
    feeMax,
    contactDetails,
    address: address || contactDetails,
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
 * Fetch schools from Wix CMS by city.
 * If a specific city is requested (e.g. Jaipur, Chennai, Nashik, Mumbai, etc.),
 * this fetches all schools for that city from the CMS collection.
 */
export async function fetchWixSchoolsByCity(
  city: string,
  fetchAllForCity = true
): Promise<{ schools: School[]; total: number }> {
  if (!isWixConfigured()) {
    const cityValsLower = getCityQueryValues(city).map(v => v.toLowerCase());
    const matched = city === 'All'
      ? SCHOOLS_DATA
      : SCHOOLS_DATA.filter(s => cityValsLower.some(cv => s.city.toLowerCase().includes(cv)));
    return { schools: matched, total: matched.length };
  }

  try {
    const isAll = !city || city === 'All';
    const cityVals = isAll ? [] : getCityQueryValues(city);
    const filter = isAll ? undefined : {
      $or: [
        ...cityVals.map(val => ({ ciy: { $eq: val } })),
        ...cityVals.map(val => ({ city: { $eq: val } }))
      ]
    };

    // First page (100 items) + total count
    const firstRes = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'wix-site-id': WIX_SITE_ID,
        Authorization: WIX_API_KEY,
      },
      body: JSON.stringify({
        dataCollectionId: WIX_COLLECTION_ID,
        query: {
          ...(filter ? { filter } : {}),
          paging: { limit: 100, offset: 0 }
        },
        returnTotalCount: true,
      }),
      next: { revalidate: 3600 },
    });

    if (!firstRes.ok) {
      console.warn(`Wix query for city ${city} failed with status ${firstRes.status}`);
      const cityValsLower = getCityQueryValues(city).map(v => v.toLowerCase());
      const matched = isAll
        ? SCHOOLS_DATA
        : SCHOOLS_DATA.filter(s => cityValsLower.some(cv => s.city.toLowerCase().includes(cv)));
      return { schools: matched, total: matched.length };
    }

    const firstData = await firstRes.json();
    const total = firstData.totalCount ?? firstData.pagingMetadata?.total ?? (firstData.dataItems || []).length;
    let rawItems: Record<string, unknown>[] = (firstData.dataItems || []).map((item: { data: Record<string, unknown> }) => item.data || {});

    // For specific cities, if there are more than 100 schools, fetch all remaining batches in parallel
    if (!isAll && fetchAllForCity && total > 100) {
      const remainingOffsets: number[] = [];
      for (let offset = 100; offset < total && offset < 1500; offset += 100) {
        remainingOffsets.push(offset);
      }

      const additionalBatches = await Promise.all(
        remainingOffsets.map(offset =>
          fetch('https://www.wixapis.com/wix-data/v2/items/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'wix-site-id': WIX_SITE_ID,
              Authorization: WIX_API_KEY,
            },
            body: JSON.stringify({
              dataCollectionId: WIX_COLLECTION_ID,
              query: { filter, paging: { limit: 100, offset } }
            }),
            next: { revalidate: 3600 },
          })
            .then(r => r.json())
            .then(d => (d.dataItems || []).map((i: { data: Record<string, unknown> }) => i.data || {}))
            .catch(() => [] as Record<string, unknown>[])
        )
      );

      for (const batch of additionalBatches) {
        rawItems.push(...batch);
      }
    }

    // Ensure unique schools by slug/name
    const seenSlugs = new Set<string>();
    const schools: School[] = [];
    rawItems.forEach((raw, idx) => {
      const school = normalizeWixSchool(raw, idx);
      if (!seenSlugs.has(school.slug)) {
        seenSlugs.add(school.slug);
        schools.push(school);
      } else {
        const uniqueSchool = { ...school, slug: `${school.slug}-${idx}` };
        schools.push(uniqueSchool);
      }
    });

    return { schools, total };
  } catch (err) {
    console.error('Error in fetchWixSchoolsByCity:', err);
    const cityValsLower = getCityQueryValues(city).map(v => v.toLowerCase());
    const matched = city === 'All'
      ? SCHOOLS_DATA
      : SCHOOLS_DATA.filter(s => cityValsLower.some(cv => s.city.toLowerCase().includes(cv)));
    return { schools: matched, total: matched.length };
  }
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

/**
 * Find a school by its slug.
 * Checks pre-bundled schools first; if not found, queries Wix CMS.
 */
export async function getSchoolBySlug(slug: string): Promise<School | undefined> {
  const local = SCHOOLS_DATA.find((s) => s.slug === slug);
  if (local) return local;

  if (!isWixConfigured()) return undefined;

  try {
    const response = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'wix-site-id': WIX_SITE_ID,
        Authorization: WIX_API_KEY,
      },
      body: JSON.stringify({
        dataCollectionId: WIX_COLLECTION_ID,
        query: {
          filter: {
            $or: [
              { slug: { $eq: slug } },
              { _id: { $eq: slug } },
            ],
          },
          paging: { limit: 1 },
        },
      }),
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const json = await response.json();
      const item = json.dataItems?.[0];
      if (item) {
        return normalizeWixSchool(item.data || {});
      }
    }
  } catch (err) {
    console.error(`Error querying Wix for slug ${slug}:`, err);
  }

  return undefined;
}

export interface SearchWixSchoolsParams {
  city?: string;
  board?: string;
  query?: string;
  grade?: string;
  limit?: number;
  offset?: number;
  sort?: string;
}

/**
 * High-performance search & pagination across all 5,249 schools in Wix CMS.
 */
export async function searchWixSchools(
  params: SearchWixSchoolsParams = {}
): Promise<{ schools: School[]; total: number; hasMore: boolean }> {
  const limit = params.limit || 36;
  const offset = params.offset || 0;
  const city = params.city || 'All';
  const board = params.board || 'All';
  const q = params.query ? params.query.trim() : '';

  if (!isWixConfigured()) {
    let list = SCHOOLS_DATA;
    if (city !== 'All') {
      const cityVals = getCityQueryValues(city).map(v => v.toLowerCase());
      list = list.filter(s => cityVals.some(cv => s.city.toLowerCase().includes(cv)));
    }
    if (board !== 'All') {
      list = list.filter(s => s.board.toLowerCase().includes(board.toLowerCase()));
    }
    if (q) {
      const qLower = q.toLowerCase();
      list = list.filter(s => s.schoolName.toLowerCase().includes(qLower));
    }
    const total = list.length;
    const schools = list.slice(offset, offset + limit);
    return { schools, total, hasMore: offset + limit < total };
  }

  try {
    const andClauses: Record<string, unknown>[] = [];

    // 1. City Filter
    if (city && city !== 'All') {
      const cityVals = getCityQueryValues(city);
      andClauses.push({
        $or: [
          ...cityVals.map(val => ({ ciy: { $eq: val } })),
          ...cityVals.map(val => ({ city: { $eq: val } }))
        ]
      });
    }

    // 2. Board Filter
    if (board && board !== 'All') {
      andClauses.push({
        board: { $contains: board }
      });
    }

    // 3. Search Keyword
    if (q) {
      andClauses.push({
        schoolName: { $contains: q }
      });
    }

    // 4. Grade Filter
    if (params.grade && params.grade !== 'All') {
      andClauses.push({
        grades: { $contains: params.grade }
      });
    }

    const filter = andClauses.length > 1 ? { $and: andClauses } : andClauses.length === 1 ? andClauses[0] : undefined;

    // Sorting
    const sortField = params.sort === 'name' ? [{ fieldName: 'schoolName', order: 'ASC' }] : undefined;

    const response = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'wix-site-id': WIX_SITE_ID,
        Authorization: WIX_API_KEY,
      },
      body: JSON.stringify({
        dataCollectionId: WIX_COLLECTION_ID,
        query: {
          ...(filter ? { filter } : {}),
          ...(sortField ? { sort: sortField } : {}),
          paging: { limit, offset },
        },
        returnTotalCount: true,
      }),
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      console.warn(`searchWixSchools failed with status ${response.status}`);
      return { schools: SCHOOLS_DATA.slice(0, limit), total: SCHOOLS_DATA.length, hasMore: false };
    }

    const data = await response.json();
    const total = data.pagingMetadata?.total ?? data.totalCount ?? (data.dataItems || []).length;
    const hasMore = Boolean(data.pagingMetadata?.hasNext) || offset + limit < total;

    const seenSlugs = new Set<string>();
    const schools: School[] = [];
    (data.dataItems || []).forEach((item: { data: Record<string, unknown> }, idx: number) => {
      const school = normalizeWixSchool(item.data || {}, offset + idx);
      if (!seenSlugs.has(school.slug)) {
        seenSlugs.add(school.slug);
        schools.push(school);
      } else {
        schools.push({ ...school, slug: `${school.slug}-${offset + idx}` });
      }
    });

    return { schools, total, hasMore };
  } catch (err) {
    console.error('Error in searchWixSchools:', err);
    return { schools: SCHOOLS_DATA.slice(0, limit), total: SCHOOLS_DATA.length, hasMore: false };
  }
}

export interface MatcherPreferences {
  city?: string;
  grade?: string;
  board?: string;
  budgetMax?: number;
  schoolType?: string;
  priority?: string;
}

export interface MatchedSchoolResult {
  school: School;
  matchScore: number;
  matchReasons: string[];
  badges: string[];
}

/**
 * Intelligent Matcher Engine that matches candidate schools against the live 5,249 database.
 */
export async function matchWixSchools(
  prefs: MatcherPreferences
): Promise<{ matchedSchools: MatchedSchoolResult[]; totalCandidates: number; topBoard: string }> {
  // Determine primary curriculum to match
  let targetBoard = prefs.board || 'CBSE';
  if (targetBoard === 'All' || targetBoard === 'Any' || !targetBoard) {
    if (prefs.priority === 'global_college') {
      targetBoard = 'IB';
    } else if (prefs.priority === 'competitive_exams') {
      targetBoard = 'CBSE';
    } else if (prefs.priority === 'balanced') {
      targetBoard = 'ICSE';
    } else {
      targetBoard = 'CBSE';
    }
  }

  // 1. Fetch candidate schools from live Wix CMS
  const { schools: candidateSchools, total } = await searchWixSchools({
    city: prefs.city && prefs.city !== 'All' ? prefs.city : undefined,
    board: targetBoard !== 'All' ? targetBoard : undefined,
    limit: 100,
    offset: 0,
  });

  // If city had fewer than 4 candidates, broaden search to include more schools
  let pool = candidateSchools;
  if (pool.length < 4 && prefs.city && prefs.city !== 'All') {
    const fallback = await searchWixSchools({
      city: prefs.city,
      limit: 100,
      offset: 0,
    });
    if (fallback.schools.length > pool.length) {
      pool = fallback.schools;
    }
  }

  // If still empty, fall back to pan-India pool
  if (pool.length === 0) {
    const panIndia = await searchWixSchools({
      board: targetBoard !== 'All' ? targetBoard : undefined,
      limit: 50,
      offset: 0,
    });
    pool = panIndia.schools;
  }

  const budgetCap = prefs.budgetMax || 1500000;
  const prefCityLower = (prefs.city || '').toLowerCase();

  // 2. Evaluate and score each school
  const scored = pool.map((school) => {
    let score = 70; // baseline
    const reasons: string[] = [];
    const badges: string[] = [];

    // Curriculum match
    const bLower = school.board.toLowerCase();
    const tLower = targetBoard.toLowerCase();
    if (bLower.includes(tLower) || school.primaryBoard.toLowerCase() === tLower) {
      score += 15;
      reasons.push(`Direct ${school.primaryBoard || school.board} curriculum alignment for your educational goals.`);
      badges.push(`${school.primaryBoard} Aligned`);
    }

    // City match
    if (prefCityLower && prefCityLower !== 'all') {
      if (school.city.toLowerCase().includes(prefCityLower)) {
        score += 10;
        reasons.push(`Prime campus location in ${school.city}.`);
      }
    }

    // Budget match
    if (school.feeMin > 0 && school.feeMin <= budgetCap) {
      score += 10;
      reasons.push(`Tuition fee matches your budget expectation (under ₹${budgetCap.toLocaleString('en-IN')}).`);
      badges.push('Budget Fit');
    } else if (school.feeMin === 0) {
      score += 5;
      reasons.push('Affordable fee structure verified upon admission request.');
    }

    // Priority match
    const textCorpus = `${school.pros} ${school.notableAlumniAchievements} ${school.cons}`.toLowerCase();
    if (prefs.priority === 'global_college') {
      if (textCorpus.includes('ivy') || textCorpus.includes('global') || textCorpus.includes('international') || textCorpus.includes('counsel')) {
        score += 8;
        reasons.push('Demonstrated pedigree for international undergraduate placements.');
        badges.push('Global Placements');
      }
    } else if (prefs.priority === 'competitive_exams') {
      if (textCorpus.includes('jee') || textCorpus.includes('neet') || textCorpus.includes('competitive') || textCorpus.includes('academic') || textCorpus.includes('olympiad')) {
        score += 8;
        reasons.push('Strong national competitive exam (JEE/NEET/CUET) orientation.');
        badges.push('STEM / JEE Track');
      }
    } else {
      if (textCorpus.includes('sports') || textCorpus.includes('arts') || textCorpus.includes('holistic') || textCorpus.includes('campus')) {
        score += 8;
        reasons.push('Well-rounded co-curricular, arts and sports development infrastructure.');
        badges.push('Holistic Campus');
      }
    }

    // Add general badge if missing
    if (badges.length === 0) {
      badges.push('Verified Institution');
    }

    const matchScore = Math.min(99, Math.max(78, score));
    return {
      school,
      matchScore,
      matchReasons: reasons.slice(0, 3),
      badges: badges.slice(0, 2),
    };
  });

  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return {
    matchedSchools: scored.slice(0, 36),
    totalCandidates: total,
    topBoard: targetBoard,
  };
}

