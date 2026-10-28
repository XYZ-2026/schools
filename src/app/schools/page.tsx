'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { School } from '@/types/school';
import SchoolCard from '@/components/schools/SchoolCard';
import CitySelectorGrid from '@/components/schools/CitySelectorGrid';
import { useSchool } from '@/context/SchoolContext';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  GraduationCap, 
  Layers,
  Sparkles,
  BookmarkCheck,
  IndianRupee,
  Loader2,
  Building2
} from 'lucide-react';

function SchoolsExplorerContent() {
  const searchParams = useSearchParams();
  const { shortlist, openSchoolModal, registerSchools } = useSchool();

  useEffect(() => {
    const schoolParam = searchParams.get('school');
    if (schoolParam) {
      openSchoolModal(schoolParam);
    }
  }, [searchParams, openSchoolModal]);

  // Initial values from URL search params
  const initialBoard = searchParams.get('board') || 'All';
  const initialCity = searchParams.get('city') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialSavedOnly = searchParams.get('saved') === 'true';

  const [selectedBoard, setSelectedBoard] = useState<string>(initialBoard);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [feeBudget, setFeeBudget] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('name');
  const [onlySaved, setOnlySaved] = useState<boolean>(initialSavedOnly);

  // Live CMS schools list (initial fallback to bundled data)
  const [schoolsList, setSchoolsList] = useState<School[]>(() => {
    if (initialCity && initialCity !== 'All') {
      const lower = initialCity.toLowerCase().replace(/[^a-z0-9]/g, '');
      const initialMatches = SCHOOLS_DATA.filter((s) => {
        const sCity = s.city.toLowerCase().replace(/[^a-z0-9]/g, '');
        return sCity.includes(lower) || lower.includes(sCity);
      });
      return initialMatches.length > 0 ? initialMatches : SCHOOLS_DATA;
    }
    return SCHOOLS_DATA;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [totalServerCount, setTotalServerCount] = useState<number>(5249);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Available cities from CMS database matching landmark selector
  const cities = [
    'All',
    'Mumbai',
    'Delhi-NCR',
    'Bengaluru',
    'Hyderabad',
    'Chandigarh',
    'Ahmedabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Kochi',
    'Jaipur',
    'Nashik',
    'Dehradun'
  ];

  // Live search across 5,249 schools in Wix CMS database
  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    const debounceMs = searchQuery ? 350 : 0;
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (selectedCity && selectedCity !== 'All') params.set('city', selectedCity);
      if (selectedBoard && selectedBoard !== 'All') params.set('board', selectedBoard);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (selectedGrade && selectedGrade !== 'All') params.set('grade', selectedGrade);
      params.set('limit', selectedCity !== 'All' && !searchQuery.trim() && selectedBoard === 'All' ? '300' : '60');
      params.set('offset', '0');

      fetch(`/api/schools?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isCurrent) return;
          if (data.schools && Array.isArray(data.schools)) {
            registerSchools(data.schools);
            setSchoolsList(data.schools);
            setTotalServerCount(typeof data.total === 'number' ? data.total : data.schools.length);
            setHasMore(data.hasMore ?? (data.schools.length < data.total));
            setVisibleCount(36);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch schools from CMS:', err);
        })
        .finally(() => {
          if (isCurrent) setIsLoading(false);
        });
    }, debounceMs);

    return () => {
      isCurrent = false;
      clearTimeout(handler);
    };
  }, [selectedCity, selectedBoard, searchQuery, selectedGrade, registerSchools]);

  const handleLoadMore = () => {
    if (visibleCount + 36 <= schoolsList.length) {
      setVisibleCount((prev) => prev + 36);
      return;
    }

    // Load next batch from server if available
    if (schoolsList.length < totalServerCount && !isLoadingMore) {
      setIsLoadingMore(true);
      const params = new URLSearchParams();
      if (selectedCity && selectedCity !== 'All') params.set('city', selectedCity);
      if (selectedBoard && selectedBoard !== 'All') params.set('board', selectedBoard);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (selectedGrade && selectedGrade !== 'All') params.set('grade', selectedGrade);
      params.set('limit', '60');
      params.set('offset', schoolsList.length.toString());

      fetch(`/api/schools?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.schools && Array.isArray(data.schools) && data.schools.length > 0) {
            registerSchools(data.schools);
            setSchoolsList((prev) => [...prev, ...data.schools]);
            setVisibleCount((prev) => prev + 36);
            setHasMore(data.hasMore);
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => console.error('Error loading more schools:', err))
        .finally(() => setIsLoadingMore(false));
    } else {
      setVisibleCount((prev) => prev + 36);
    }
  };

  const filteredSchools = useMemo(() => {
    return schoolsList.filter((school) => {
      // Shortlist filter
      if (onlySaved && !shortlist.includes(school.slug)) return false;

      // Board filter
      if (selectedBoard !== 'All') {
        const boardLower = school.board.toLowerCase();
        const primaryLower = school.primaryBoard.toLowerCase();
        const target = selectedBoard.toLowerCase();
        if (!boardLower.includes(target) && !primaryLower.includes(target)) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== 'All') {
        const sLower = school.city.toLowerCase().trim();
        const selLower = selectedCity.toLowerCase().trim();
        
        const isSelDelhi = selLower.includes('delhi') || selLower.includes('ncr');
        const isSchoolDelhi = sLower.includes('delhi') || sLower.includes('gurugram') || sLower.includes('gurgaon') || sLower.includes('noida') || sLower.includes('ncr');
        
        const isSelBlr = selLower.includes('bengaluru') || selLower.includes('bangalore');
        const isSchoolBlr = sLower.includes('bengaluru') || sLower.includes('bangalore');

        const isSelKochi = selLower.includes('kochi') || selLower.includes('cochin');
        const isSchoolKochi = sLower.includes('kochi') || sLower.includes('cochin');

        let match = false;
        if (isSelDelhi && isSchoolDelhi) {
          match = true;
        } else if (isSelBlr && isSchoolBlr) {
          match = true;
        } else if (isSelKochi && isSchoolKochi) {
          match = true;
        } else {
          const sClean = sLower.replace(/[^a-z0-9]/g, '');
          const selClean = selLower.replace(/[^a-z0-9]/g, '');
          match = sLower === selLower || sLower.includes(selLower) || selLower.includes(sLower) || sClean === selClean || sClean.includes(selClean) || selClean.includes(sClean);
        }

        if (!match) return false;
      }

      // Grade filter
      if (selectedGrade !== 'All') {
        if (!school.grades.toLowerCase().includes(selectedGrade.toLowerCase())) {
          return false;
        }
      }

      // Fee Budget filter
      if (feeBudget === 'under3') {
        if (school.feeMin > 300000 && school.feeMin !== 0) return false;
      } else if (feeBudget === '3to7') {
        if (school.feeMax < 300000 || school.feeMin > 700000) return false;
      } else if (feeBudget === 'above7') {
        if (school.feeMax < 700000) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = school.schoolName.toLowerCase().includes(q);
        const matchesBoard = school.board.toLowerCase().includes(q);
        const matchesContact = school.contactDetails.toLowerCase().includes(q);
        const matchesAlumni = school.notableAlumniAchievements.toLowerCase().includes(q);
        const matchesPros = school.pros.toLowerCase().includes(q);
        if (!matchesName && !matchesBoard && !matchesContact && !matchesAlumni && !matchesPros) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.schoolName.localeCompare(b.schoolName);
      if (sortBy === 'feesLow') return a.feeMin - b.feeMin;
      if (sortBy === 'feesHigh') return b.feeMax - a.feeMax;
      return 0;
    });
  }, [
    schoolsList,
    selectedBoard,
    selectedCity,
    selectedGrade,
    feeBudget,
    searchQuery,
    sortBy,
    onlySaved,
    shortlist
  ]);

  const resetFilters = () => {
    setSelectedBoard('All');
    setSelectedCity('All');
    setSelectedGrade('All');
    setFeeBudget('All');
    setSearchQuery('');
    setSortBy('name');
    setOnlySaved(false);
    setVisibleCount(36);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-12 md:py-16 w-full overflow-hidden">
      {/* Title & Page Header */}
      <div className="mb-4 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#E8F0FF] text-[#2563EB] text-[10.5px] sm:text-[12px] font-bold uppercase tracking-wide sm:tracking-wider mb-2 whitespace-nowrap shadow-xs">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2563EB] shrink-0" />
          <span>Verified Database • Pan-India Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Explore Schools in India
        </h1>
        <p className="mt-1.5 sm:mt-2 text-[13.5px] sm:text-[15px] text-[#64748B] max-w-2xl">
          Search and compare verified schools across CBSE, ICSE, IB, and Cambridge IGCSE with accurate tuition fee ranges, curricula, and pros &amp; cons.
        </p>
      </div>

      {/* ── CITY LANDMARK SELECTOR GRID ── */}
      <div className="mb-4 sm:mb-8">
        <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
              Search Schools by City
            </h2>
            {selectedCity !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-[#F0FDFA] text-[#0D9488] border border-[#0D9488]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                Selected: {selectedCity}
              </span>
            )}
          </div>

          {selectedCity !== 'All' && (
            <button
              onClick={() => setSelectedCity('All')}
              className="text-[12px] font-semibold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Show All Cities</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        <CitySelectorGrid
          selectedCity={selectedCity}
          onSelectCity={(city) => {
            setSelectedCity(city);
          }}
        />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 sm:p-6 shadow-xs mb-4 sm:mb-8">
        {/* Main Search Input */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by school name, board (CBSE, IB, ICSE), location, or alumni..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#64748B] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Board Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#2563EB]" /> Curriculum
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              <option value="All">All Curricula</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="IB">IB (PYP, MYP, DP)</option>
              <option value="IGCSE">Cambridge IGCSE</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#2563EB]" /> City / Region
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Locations' : c}</option>
              ))}
            </select>
          </div>

          {/* Grades Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#2563EB]" /> Grades
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              <option value="All">All Grades</option>
              <option value="1-12">Grades 1-12</option>
              <option value="PreK">Pre-K / Nursery</option>
              <option value="6-12">Grades 6-12</option>
            </select>
          </div>

          {/* Annual Tuition Budget */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-[#2563EB]" /> Annual Fees
            </label>
            <select
              value={feeBudget}
              onChange={(e) => setFeeBudget(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              <option value="All">Any Budget</option>
              <option value="under3">Under ₹3,00,000</option>
              <option value="3to7">₹3,00,000 - ₹7,00,000</option>
              <option value="above7">Above ₹7,00,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              <option value="name">Name (A-Z)</option>
              <option value="feesLow">Fees: Low to High</option>
              <option value="feesHigh">Fees: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills and Reset Button */}
        <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved Schools ({shortlist.length})</span>
            </button>
          </div>

          <button
            onClick={resetFilters}
            className="text-[12px] text-[#64748B] hover:text-[#2563EB] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-6 flex-wrap gap-2">
        <h2 className="text-[15px] font-semibold text-[#64748B] flex items-center gap-2 flex-wrap">
          <span>
            Showing <span className="font-bold text-[#0F172A]">{Math.min(visibleCount, filteredSchools.length)}</span> of{' '}
            <span className="font-bold text-[#0F172A]">{totalServerCount.toLocaleString('en-IN')}</span> verified schools
            {selectedCity !== 'All' ? ` in ${selectedCity}` : ' across India'}
          </span>
          {isLoading && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#2563EB] font-medium bg-[#E8F0FF] px-2.5 py-0.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin text-[#2563EB]" />
              Searching 5,200+ Database...
            </span>
          )}
        </h2>
      </div>

      {/* Schools Card Grid */}
      {filteredSchools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredSchools.slice(0, visibleCount).map((school) => (
              <SchoolCard key={school.id || school.slug} school={school} />
            ))}
          </div>

          {(filteredSchools.length > visibleCount || schoolsList.length < totalServerCount) && (
            <div className="mt-10 sm:mt-12 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-70"
              >
                {isLoadingMore && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>
                  {isLoadingMore
                    ? 'Loading Schools from CMS...'
                    : `Load More Schools (${Math.max(0, totalServerCount - Math.min(visibleCount, filteredSchools.length))} remaining)`}
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#E8F0FF] text-[#2563EB] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] font-bold text-[#0F172A]">No Matching Schools Found</h3>
          <p className="mt-1 text-[13px] text-[#64748B]">
            Try relaxing your search terms or resetting filters to browse all verified schools.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-full bg-[#2563EB] text-white text-[13px] font-bold hover:bg-[#1D4ED8] transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#64748B]">Loading Schools Directory...</div>}>
      <SchoolsExplorerContent />
    </Suspense>
  );
}
