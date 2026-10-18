'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import SchoolCard from '@/components/schools/SchoolCard';
import { useSchool } from '@/context/SchoolContext';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  GraduationCap, 
  Building2, 
  Sparkles,
  BookmarkCheck
} from 'lucide-react';

function SchoolsExplorerContent() {
  const searchParams = useSearchParams();
  const { shortlist } = useSchool();

  // Initial values from URL search params
  const initialBoard = searchParams.get('board') || 'All';
  const initialCity = searchParams.get('city') || 'All';
  const initialType = searchParams.get('type') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialSavedOnly = searchParams.get('saved') === 'true';

  const [selectedBoard, setSelectedBoard] = useState<string>(initialBoard);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [feeBudget, setFeeBudget] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('rank');
  const [onlySaved, setOnlySaved] = useState<boolean>(initialSavedOnly);

  // Available cities from data
  const cities = ['All', 'Mumbai', 'Bengaluru', 'Gurugram', 'New Delhi', 'Dehradun', 'Mussoorie', 'Hyderabad', 'Noida', 'Ajmer'];

  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter((school) => {
      // Shortlist filter
      if (onlySaved && !shortlist.includes(school.slug)) return false;

      // Board filter
      if (selectedBoard !== 'All' && !school.boards.includes(selectedBoard as any)) {
        return false;
      }

      // City filter
      if (selectedCity !== 'All' && school.city !== selectedCity) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All') {
        if (selectedType === 'Boarding' && !school.schoolType.includes('Boarding')) return false;
        if (selectedType === 'Day School' && !school.schoolType.includes('Day')) return false;
      }

      // Gender filter
      if (selectedGender !== 'All' && school.gender !== selectedGender) {
        return false;
      }

      // Fee Budget filter
      if (feeBudget === 'under5') {
        if (school.annualFeeMin > 500000) return false;
      } else if (feeBudget === '5to10') {
        if (school.annualFeeMax < 500000 || school.annualFeeMin > 1000000) return false;
      } else if (feeBudget === 'above10') {
        if (school.annualFeeMax < 1000000) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = school.name.toLowerCase().includes(q);
        const matchesCity = school.city.toLowerCase().includes(q);
        const matchesTagline = school.tagline.toLowerCase().includes(q);
        const matchesBoards = school.boards.some((b) => b.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesTagline && !matchesBoards) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'feesLow') return a.annualFeeMin - b.annualFeeMin;
      if (sortBy === 'feesHigh') return b.annualFeeMax - a.annualFeeMax;
      return 0;
    });
  }, [
    selectedBoard,
    selectedCity,
    selectedType,
    selectedGender,
    feeBudget,
    searchQuery,
    sortBy,
    onlySaved,
    shortlist
  ]);

  const resetFilters = () => {
    setSelectedBoard('All');
    setSelectedCity('All');
    setSelectedType('All');
    setSelectedGender('All');
    setFeeBudget('All');
    setSearchQuery('');
    setSortBy('rank');
    setOnlySaved(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title & Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A55D]" />
          Directory & Comparison
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Explore Premier Schools in India
        </h1>
        <p className="mt-2 text-[15px] text-[#666] max-w-3xl">
          Filter through elite IB World, Cambridge IGCSE, ICSE, and CBSE schools. Compare verified tuition brackets, campus amenities, faculty-student ratios, and admissions availability.
        </p>
      </div>

      {/* Main Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        {/* Top search input & sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Keyword search input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by school name, city, board..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6F4F2] border border-[#E7E1DD] text-[13.5px] text-[#111] placeholder-[#888] focus:outline-none focus:border-[#690B1B]"
            />
          </div>

          {/* Quick options: Shortlist toggle & sort dropdown */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-[#C9A55D] text-white shadow-xs'
                  : 'bg-[#F6F4F2] text-[#666] hover:bg-[#EFECE8]'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Saved Only ({shortlist.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[12.5px] text-[#777] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F6F4F2] border border-[#E7E1DD] text-[13px] font-semibold text-[#111] px-3 py-2 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="rank">National Rank (Top 1st)</option>
                <option value="rating">Parent Rating (Highest)</option>
                <option value="feesLow">Fees: Low to High</option>
                <option value="feesHigh">Fees: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Board Pill Selector */}
        <div className="pt-2 border-t border-[#F0EBE6] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[12px] font-bold text-[#888] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-[#690B1B]" /> Board:
          </span>
          {['All', 'IB', 'IGCSE', 'ICSE', 'CBSE'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBoard(b)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedBoard === b
                  ? 'bg-[#690B1B] text-white shadow-xs'
                  : 'bg-[#F6F4F2] text-[#666] hover:bg-[#EFECE8] hover:text-[#111]'
              }`}
            >
              {b === 'All' ? 'All Curricula' : b}
            </button>
          ))}
        </div>

        {/* Secondary Filters Grid */}
        <div className="pt-2 border-t border-[#F0EBE6] grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[12.5px]">
          {/* City */}
          <div>
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider mb-1">
              City / Region
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-2.5 py-2 rounded-xl font-medium text-[#222] focus:outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
              ))}
            </select>
          </div>

          {/* School Type */}
          <div>
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider mb-1">
              School Format
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-2.5 py-2 rounded-xl font-medium text-[#222] focus:outline-none cursor-pointer"
            >
              <option value="All">Day & Boarding</option>
              <option value="Day School">Day School Only</option>
              <option value="Boarding">Residential Boarding</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider mb-1">
              Gender Format
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-2.5 py-2 rounded-xl font-medium text-[#222] focus:outline-none cursor-pointer"
            >
              <option value="All">All Genders</option>
              <option value="Co-educational">Co-educational</option>
              <option value="All-Boys">All-Boys</option>
              <option value="All-Girls">All-Girls</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider mb-1">
              Annual Fee Bracket
            </label>
            <select
              value={feeBudget}
              onChange={(e) => setFeeBudget(e.target.value)}
              className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-2.5 py-2 rounded-xl font-medium text-[#222] focus:outline-none cursor-pointer"
            >
              <option value="All">Any Budget</option>
              <option value="under5">Under ₹5 Lakhs / yr</option>
              <option value="5to10">₹5 Lakhs – ₹10 Lakhs / yr</option>
              <option value="above10">Above ₹10 Lakhs / yr</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[14px] text-[#555]">
          Showing <strong className="text-[#111] font-bold">{filteredSchools.length}</strong> premier institutions in India
        </div>
        {(selectedBoard !== 'All' || selectedCity !== 'All' || selectedType !== 'All' || selectedGender !== 'All' || feeBudget !== 'All' || searchQuery.trim() || onlySaved) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#690B1B] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Grid of Results */}
      {filteredSchools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E7E2DE] p-12 text-center max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-[#FAF0F2] text-[#690B1B] flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] font-bold text-[#111]">No matching schools found</h3>
          <p className="mt-1 text-[14px] text-[#666]">
            Try clearing some filters or searching with broader keywords to discover institutions.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 rounded-full bg-[#690B1B] text-white text-[13px] font-bold hover:bg-[#7A1022] transition-colors"
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
    <Suspense fallback={<div className="p-12 text-center text-[#777]">Loading Schools Directory...</div>}>
      <SchoolsExplorerContent />
    </Suspense>
  );
}
