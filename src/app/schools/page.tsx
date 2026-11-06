'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { School } from '@/types/school';
import SchoolCard from '@/components/schools/SchoolCard';
import CitySelectorGrid from '@/components/schools/CitySelectorGrid';
import { useSchool } from '@/context/SchoolContext';
import { matchBudgetFilter } from '@/lib/wix';
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
  Building2,
  X,
  SlidersHorizontal,
  Check,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

function formatInr(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1).replace(/\.0$/, '')}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val.toLocaleString('en-IN')}`;
}

const BUDGET_OPTIONS = [
  { value: 'All', label: 'All Budgets', shortLabel: 'All' },
  { value: 'under2', label: 'Under ₹2 Lakhs / yr', shortLabel: 'Under ₹2L' },
  { value: '2to5', label: '₹2L - ₹5 Lakhs / yr', shortLabel: '₹2L - ₹5L' },
  { value: '5to10', label: '₹5L - ₹10 Lakhs / yr', shortLabel: '₹5L - ₹10L' },
  { value: 'above10', label: 'Above ₹10 Lakhs / yr', shortLabel: '₹10L+' },
  { value: 'custom', label: '⚙️ Custom Budget Range...', shortLabel: 'Custom' },
  { value: 'under3', label: 'Under ₹3 Lakhs / yr', shortLabel: 'Under ₹3L' },
  { value: '3to7', label: '₹3L - ₹7 Lakhs / yr', shortLabel: '₹3L - ₹7L' },
  { value: 'above7', label: 'Above ₹7 Lakhs / yr', shortLabel: 'Above ₹7L' },
];

function getBudgetLabel(val: string, min?: number, max?: number): string {
  if (val === 'custom') {
    const minText = min !== undefined && min > 0 ? formatInr(min) : '₹0';
    const maxText = max !== undefined && max < 2500000 ? formatInr(max) : 'No Max';
    return `${minText} – ${maxText}`;
  }
  if (val.startsWith('custom:')) {
    const parts = val.slice(7).split('-');
    const pMin = parts[0] ? parseInt(parts[0], 10) : 0;
    const pMax = parts[1] && parseInt(parts[1], 10) < 2500000 ? parseInt(parts[1], 10) : undefined;
    return `${formatInr(pMin)} – ${pMax ? formatInr(pMax) : 'No Max'}`;
  }
  const found = BUDGET_OPTIONS.find((b) => b.value === val);
  if (found) return found.label;
  if (val === '150000') return 'Under ₹1.5 Lakhs / yr';
  if (val === '350000') return 'Under ₹3.5 Lakhs / yr';
  if (val === '700000') return 'Under ₹7 Lakhs / yr';
  if (val === '1500000') return 'Above ₹7 Lakhs / yr';
  return val;
}

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
  const initialBudget = searchParams.get('budget') || searchParams.get('fee') || 'All';
  const initialMinFee = searchParams.get('minFee') ? parseInt(searchParams.get('minFee')!, 10) : undefined;
  const initialMaxFee = searchParams.get('maxFee') ? parseInt(searchParams.get('maxFee')!, 10) : undefined;

  const [selectedBoard, setSelectedBoard] = useState<string>(initialBoard);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [feeBudget, setFeeBudget] = useState<string>(initialBudget);
  const [customMinFee, setCustomMinFee] = useState<number | undefined>(initialMinFee);
  const [customMaxFee, setCustomMaxFee] = useState<number | undefined>(initialMaxFee);
  const [isCustomOpen, setIsCustomOpen] = useState<boolean>(initialBudget === 'custom' || initialMinFee !== undefined || initialMaxFee !== undefined);
  const [tempMinFee, setTempMinFee] = useState<number>(initialMinFee ?? 0);
  const [tempMaxFee, setTempMaxFee] = useState<number>(initialMaxFee ?? 2500000);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('name');
  const [onlySaved, setOnlySaved] = useState<boolean>(initialSavedOnly);

  // Live CMS schools list (initial fallback to bundled data)
  const [schoolsList, setSchoolsList] = useState<School[]>(() => {
    let initial = SCHOOLS_DATA;
    if (initialCity && initialCity !== 'All') {
      const lower = initialCity.toLowerCase().replace(/[^a-z0-9]/g, '');
      const initialMatches = initial.filter((s) => {
        const sCity = s.city.toLowerCase().replace(/[^a-z0-9]/g, '');
        return sCity.includes(lower) || lower.includes(sCity);
      });
      if (initialMatches.length > 0) initial = initialMatches;
    }
    if (initialBudget && initialBudget !== 'All') {
      const budgetMatches = initial.filter((s) => matchBudgetFilter(s, initialBudget, initialMinFee, initialMaxFee));
      if (budgetMatches.length > 0) initial = budgetMatches;
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [totalServerCount, setTotalServerCount] = useState<number>(() => SCHOOLS_DATA.length);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Live preview counter for custom budget panel
  const previewCustomCount = useMemo(() => {
    const effectiveMax = tempMaxFee < 2500000 ? tempMaxFee : undefined;
    return SCHOOLS_DATA.filter((s) => {
      if (selectedCity !== 'All') {
        const sLower = s.city.toLowerCase().replace(/[^a-z0-9]/g, '');
        const selLower = selectedCity.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!sLower.includes(selLower) && !selLower.includes(sLower)) return false;
      }
      if (selectedBoard !== 'All') {
        if (!s.board.toLowerCase().includes(selectedBoard.toLowerCase())) return false;
      }
      return matchBudgetFilter(s, undefined, tempMinFee, effectiveMax);
    }).length;
  }, [tempMinFee, tempMaxFee, selectedCity, selectedBoard]);

  const applyCustomBudget = () => {
    setCustomMinFee(tempMinFee);
    setCustomMaxFee(tempMaxFee);
    setFeeBudget('custom');
    setVisibleCount(36);
  };

  const handleSelectBudget = (val: string) => {
    if (val === 'custom') {
      setIsCustomOpen(true);
      setFeeBudget('custom');
    } else {
      setFeeBudget(val);
      setCustomMinFee(undefined);
      setCustomMaxFee(undefined);
      if (val === 'All') {
        setIsCustomOpen(false);
      }
    }
  };

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

  // Live search across verified schools in Wix CMS database
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
      if (feeBudget && feeBudget !== 'All') params.set('budget', feeBudget);
      if (feeBudget === 'custom') {
        if (customMinFee !== undefined) params.set('minFee', customMinFee.toString());
        if (customMaxFee !== undefined && customMaxFee < 2500000) params.set('maxFee', customMaxFee.toString());
      }
      const isBudgetActive = feeBudget !== 'All' || customMinFee !== undefined || (customMaxFee !== undefined && customMaxFee < 2500000);
      params.set('limit', selectedCity !== 'All' && !searchQuery.trim() && selectedBoard === 'All' && !isBudgetActive ? '300' : '60');
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
  }, [selectedCity, selectedBoard, searchQuery, selectedGrade, feeBudget, customMinFee, customMaxFee, registerSchools]);

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
      if (feeBudget && feeBudget !== 'All') params.set('budget', feeBudget);
      if (feeBudget === 'custom') {
        if (customMinFee !== undefined) params.set('minFee', customMinFee.toString());
        if (customMaxFee !== undefined && customMaxFee < 2500000) params.set('maxFee', customMaxFee.toString());
      }
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
      if (!matchBudgetFilter(school, feeBudget, customMinFee, customMaxFee)) {
        return false;
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
    customMinFee,
    customMaxFee,
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
    setCustomMinFee(undefined);
    setCustomMaxFee(undefined);
    setIsCustomOpen(false);
    setTempMinFee(0);
    setTempMaxFee(2500000);
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
              type="button"
              suppressHydrationWarning
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
            suppressHydrationWarning
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by school name, board (CBSE, IB, ICSE), location, or alumni..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              suppressHydrationWarning
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
              <IndianRupee className="w-3 h-3 text-[#2563EB]" /> Budget / Fees
            </label>
            <select
              value={feeBudget}
              onChange={(e) => handleSelectBudget(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB]"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
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

        {/* Quick Budget Filter Pills (Smooth scroll on mobile, wrap on tablet/desktop) */}
        <div className="mt-4 pt-3.5 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-0.5 px-0.5 no-scrollbar flex-nowrap sm:flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] shrink-0 flex items-center gap-1 mr-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#2563EB]" /> Budget:
            </span>
            {[
              { id: 'All', label: 'All' },
              { id: 'under2', label: '< ₹2L' },
              { id: '2to5', label: '₹2L – ₹5L' },
              { id: '5to10', label: '₹5L – ₹10L' },
              { id: 'above10', label: '₹10L+' },
              { id: 'custom', label: 'Custom Range' },
            ].map((tier) => {
              const isActive = feeBudget === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    if (tier.id === 'custom') {
                      setIsCustomOpen((prev) => !prev || feeBudget !== 'custom');
                      setFeeBudget('custom');
                    } else {
                      handleSelectBudget(tier.id);
                    }
                  }}
                  className={`h-7.5 sm:h-8 px-3 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#EFF6FF] hover:text-[#2563EB] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{tier.label}</span>
                  {tier.id === 'custom' && (
                    isCustomOpen ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expandable Custom Budget Range Panel */}
        {isCustomOpen && (
          <div className="mt-3.5 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F0F7FF] via-[#F8FAFC] to-[#F1F5F9] border border-[#BFDBFE] shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#DBEAFE]/80">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                  <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-tight truncate">
                    Custom Tuition Budget
                  </div>
                  <div className="text-[11px] text-[#64748B] leading-tight mt-0.5 hidden sm:block">
                    Set your custom min and max annual fees
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="whitespace-nowrap text-[11px] sm:text-[12px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                  {formatInr(tempMinFee)} – {tempMaxFee >= 2500000 ? 'No Max' : formatInr(tempMaxFee)}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomOpen(false)}
                  className="w-7 h-7 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors cursor-pointer"
                  title="Close custom budget"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Min and Max Range Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-3.5">
              {/* Minimum Fee Card */}
              <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5 flex items-center justify-between">
                  <span>Minimum Fee</span>
                  <span className="text-[#2563EB] font-bold text-[12px] whitespace-nowrap">{formatInr(tempMinFee)}/yr</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#64748B]">₹</span>
                  <input
                    type="number"
                    min="0"
                    max="2000000"
                    step="25000"
                    value={tempMinFee}
                    onChange={(e) => setTempMinFee(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 pl-7 pr-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[13px] font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="0"
                  />
                </div>
                {/* Quick Min Preset Chips */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {[0, 50000, 100000, 200000, 350000].map((preset) => {
                    const isSelected = tempMinFee === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempMinFee(preset)}
                        className={`h-6.5 px-2 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected 
                            ? 'bg-[#2563EB] text-white shadow-xs font-semibold' 
                            : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {preset === 0 ? '₹0' : formatInr(preset)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Maximum Fee Card */}
              <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5 flex items-center justify-between">
                  <span>Maximum Fee</span>
                  <span className="text-[#2563EB] font-bold text-[12px] whitespace-nowrap">
                    {tempMaxFee >= 2500000 ? 'No Max Limit' : `${formatInr(tempMaxFee)}/yr`}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#64748B]">₹</span>
                  <input
                    type="number"
                    min="50000"
                    max="2500000"
                    step="50000"
                    value={tempMaxFee >= 2500000 ? '' : tempMaxFee}
                    onChange={(e) => setTempMaxFee(e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : 2500000)}
                    className="w-full h-10 pl-7 pr-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[13px] font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="e.g. 6,00,000 (empty = no max)"
                  />
                </div>
                {/* Quick Max Preset Chips */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {[180000, 350000, 600000, 1000000, 2500000].map((preset) => {
                    const isSelected = tempMaxFee === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempMaxFee(preset)}
                        className={`h-6.5 px-2 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected 
                            ? 'bg-[#2563EB] text-white shadow-xs font-semibold' 
                            : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {preset >= 2500000 ? 'Any Max' : `< ${formatInr(preset)}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Slider Cap */}
            <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] mb-3.5 shadow-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748B] mb-1.5">
                <span>Slider Cap: Max Annual Tuition</span>
                <span className="text-[#2563EB] font-bold text-[12px] whitespace-nowrap">
                  {tempMaxFee >= 2500000 ? '₹25L+ (No Max Limit)' : `Up to ${formatInr(tempMaxFee)} / yr`}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="50000"
                value={tempMaxFee}
                onChange={(e) => setTempMaxFee(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex justify-between text-[10px] text-[#94A3B8] font-medium mt-1">
                <span>₹50k</span>
                <span>₹2.5L</span>
                <span>₹6L</span>
                <span>₹10L</span>
                <span>₹15L</span>
                <span>Open</span>
              </div>
            </div>

            {/* Action Bar (Full responsive, no text wrap!) */}
            <div className="pt-3 border-t border-[#DBEAFE]/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-[12.5px] text-[#475569]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>
                  Live match: <strong className="text-[#0F172A] font-bold">{previewCustomCount}</strong> schools found
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setTempMinFee(0);
                    setTempMaxFee(2500000);
                    setFeeBudget('All');
                    setCustomMinFee(undefined);
                    setCustomMaxFee(undefined);
                    setIsCustomOpen(false);
                  }}
                  className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-[13px] font-semibold transition-colors cursor-pointer text-center flex items-center justify-center whitespace-nowrap"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={applyCustomBudget}
                  className="flex-[2] sm:flex-initial h-10 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-[13px] font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Apply Budget ({previewCustomCount})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills and Reset Button */}
        <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setOnlySaved(!onlySaved)}
              className={`h-7.5 px-3 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                onlySaved
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved ({shortlist.length})</span>
            </button>

            {feeBudget !== 'All' && (
              <span className="inline-flex items-center gap-1.5 h-7.5 px-2.5 rounded-full text-[12px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] shrink-0">
                <span>Budget: {getBudgetLabel(feeBudget, customMinFee, customMaxFee)}</span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    setFeeBudget('All');
                    setCustomMinFee(undefined);
                    setCustomMaxFee(undefined);
                    setIsCustomOpen(false);
                  }}
                  className="hover:text-[#1D4ED8] cursor-pointer p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                  title="Clear budget filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedBoard !== 'All' && (
              <span className="inline-flex items-center gap-1.5 h-7.5 px-2.5 rounded-full text-[12px] font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] shrink-0">
                <span>Board: {selectedBoard}</span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedBoard('All')}
                  className="hover:text-[#0F172A] cursor-pointer p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                  title="Clear board filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={resetFilters}
            className="text-[12px] text-[#64748B] hover:text-[#2563EB] font-semibold flex items-center gap-1 transition-colors cursor-pointer self-end xs:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-6 flex-wrap gap-2">
        <h2 className="text-[15px] font-semibold text-[#64748B] flex items-center gap-2 flex-wrap">
          <span>
            Showing <span className="font-bold text-[#0F172A]">{Math.min(visibleCount, filteredSchools.length)}</span> of{' '}
            <span className="font-bold text-[#0F172A]">{filteredSchools.length.toLocaleString('en-IN')}</span> verified schools
            {selectedCity !== 'All' ? ` in ${selectedCity}` : ' across India'}
            {feeBudget !== 'All' ? ` • ${getBudgetLabel(feeBudget, customMinFee, customMaxFee)}` : ''}
          </span>
          {isLoading && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#2563EB] font-medium bg-[#E8F0FF] px-2.5 py-0.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin text-[#2563EB]" />
              Searching Database...
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
                type="button"
                suppressHydrationWarning
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
            type="button"
            suppressHydrationWarning
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
