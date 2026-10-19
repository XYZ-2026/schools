'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import SchoolCard from '@/components/schools/SchoolCard';
import { useSchool } from '@/context/SchoolContext';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  GraduationCap, 
  Layers,
  Sparkles,
  BookmarkCheck,
  IndianRupee
} from 'lucide-react';

function SchoolsExplorerContent() {
  const searchParams = useSearchParams();
  const { shortlist } = useSchool();

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

  // Available cities from data
  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune'];

  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter((school) => {
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
      if (selectedCity !== 'All' && school.city !== selectedCity) {
        return false;
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title & Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A55D]" />
          Wix CMS Verified Database • {SCHOOLS_DATA.length} Schools
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Explore Schools in India
        </h1>
        <p className="mt-2 text-[15px] text-[#666] max-w-2xl">
          Search and compare verified schools across CBSE, ICSE, IB, and Cambridge IGCSE with accurate tuition fee ranges, curricula, and pros &amp; cons.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-6 shadow-xs mb-8">
        {/* Main Search Input */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by school name, board (CBSE, IB, ICSE), location, or alumni..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F6F4F2] border border-[#E7E1DD] text-[#111] placeholder:text-[#888] text-[14px] focus:outline-none focus:border-[#690B1B] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#888] hover:text-[#111]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Board Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#777] mb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#690B1B]" /> Curriculum
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E7E1DD] text-[13px] text-[#222] font-medium focus:outline-none focus:border-[#690B1B]"
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
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#777] mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#690B1B]" /> City / Region
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E7E1DD] text-[13px] text-[#222] font-medium focus:outline-none focus:border-[#690B1B]"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Locations' : c}</option>
              ))}
            </select>
          </div>

          {/* Grades Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#777] mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#690B1B]" /> Grades
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E7E1DD] text-[13px] text-[#222] font-medium focus:outline-none focus:border-[#690B1B]"
            >
              <option value="All">All Grades</option>
              <option value="1-12">Grades 1-12</option>
              <option value="PreK">Pre-K / Nursery</option>
              <option value="6-12">Grades 6-12</option>
            </select>
          </div>

          {/* Annual Tuition Budget */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#777] mb-1 flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-[#690B1B]" /> Annual Fees
            </label>
            <select
              value={feeBudget}
              onChange={(e) => setFeeBudget(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E7E1DD] text-[13px] text-[#222] font-medium focus:outline-none focus:border-[#690B1B]"
            >
              <option value="All">Any Budget</option>
              <option value="under3">Under ₹3,00,000</option>
              <option value="3to7">₹3,00,000 - ₹7,00,000</option>
              <option value="above7">Above ₹7,00,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#777] mb-1 block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E7E1DD] text-[13px] text-[#222] font-medium focus:outline-none focus:border-[#690B1B]"
            >
              <option value="name">Name (A-Z)</option>
              <option value="feesLow">Fees: Low to High</option>
              <option value="feesHigh">Fees: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills and Reset Button */}
        <div className="mt-4 pt-4 border-t border-[#F0EBE6] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-[#C9A55D] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#555] hover:bg-[#F2ECE6] border border-[#E7E1DD]'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved Schools ({shortlist.length})</span>
            </button>
          </div>

          <button
            onClick={resetFilters}
            className="text-[12px] text-[#888] hover:text-[#690B1B] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-semibold text-[#555]">
          Showing <span className="font-bold text-[#111]">{filteredSchools.length}</span> of {SCHOOLS_DATA.length} verified schools
        </h2>
      </div>

      {/* Schools Card Grid */}
      {filteredSchools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E7E2DE] p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#FAF0F2] text-[#690B1B] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] font-bold text-[#111]">No Matching Schools Found</h3>
          <p className="mt-1 text-[13px] text-[#666]">
            Try relaxing your search terms or resetting filters to browse all verified schools.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-full bg-[#690B1B] text-white text-[13px] font-bold hover:bg-[#7A1022] transition-colors"
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
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading Schools Directory...</div>}>
      <SchoolsExplorerContent />
    </Suspense>
  );
}
