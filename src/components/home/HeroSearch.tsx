'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CitySelectorGrid, { getCityLandmarkIcon } from '@/components/schools/CitySelectorGrid';
import { Search, MapPin, GraduationCap, Building2, ArrowRight, X, ChevronDown } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [board, setBoard] = useState('');
  const [city, setCity] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (board) params.set('board', board);
    if (city && city !== 'All') params.set('city', city);
    if (schoolType) params.set('type', schoolType);
    if (keyword.trim()) params.set('q', keyword.trim());
    router.push(`/schools?${params.toString()}`);
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-[#E4E7EC] shadow-[0_16px_45px_rgba(37,99,235,0.10)] rounded-3xl p-3 sm:p-4 transition-all"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Keyword Search */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E4E7EC] hover:border-[#2563EB]/40 transition-colors">
            <Search className="w-4 h-4 text-[#2563EB] shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search school name..."
              className="w-full bg-transparent text-[13.5px] font-medium text-[#080F1C] placeholder-[#667085] focus:outline-none"
            />
          </div>

          {/* Board Select */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E4E7EC] hover:border-[#2563EB]/40 transition-colors">
            <GraduationCap className="w-4 h-4 text-[#2563EB] shrink-0" />
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full bg-transparent text-[13.5px] font-medium text-[#080F1C] focus:outline-none cursor-pointer"
            >
              <option value="">All Curricula (IB, IGCSE...)</option>
              <option value="IB">IB World School</option>
              <option value="IGCSE">Cambridge IGCSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="CBSE">CBSE Excellence</option>
            </select>
          </div>

          {/* City Interactive Picker with Landmark Grid Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-[#F8FAFC] border transition-colors cursor-pointer text-left ${
                city
                  ? 'border-[#0D9488]/40 bg-[#F0FDFA]/60 text-[#0F172A]'
                  : 'border-[#E4E7EC] hover:border-[#2563EB]/40 text-[#667085]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {city ? (
                  <div className="shrink-0 flex items-center">
                    {getCityLandmarkIcon(city, true, "w-4 h-4")}
                  </div>
                ) : (
                  <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                )}
                <span className={`text-[13.5px] truncate ${city ? 'font-semibold text-[#0F172A]' : 'font-medium'}`}>
                  {city ? city : 'Select City / Region'}
                </span>
              </div>

              {city ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCity('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      setCity('');
                    }
                  }}
                  className="p-0.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-700"
                  title="Clear city"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
              )}
            </button>
          </div>

        {/* School Type Select */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E4E7EC] hover:border-[#2563EB]/40 transition-colors">
          <Building2 className="w-4 h-4 text-[#2563EB] shrink-0" />
          <select
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#080F1C] focus:outline-none cursor-pointer"
          >
            <option value="">Day vs Boarding</option>
            <option value="Day School">Day School</option>
            <option value="Boarding School">Boarding (Residential)</option>
            <option value="Day & Boarding">Day & Boarding</option>
          </select>
        </div>
      </div>

      {/* Submit Button Row */}
      <div className="mt-3 pt-3 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12px] text-[#667085]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Showing 2026-27 admission dates, fees & student-teacher ratios</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto h-[44px] px-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-bold shadow-[0_8px_20px_rgba(37,99,235,0.22)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>Find Schools</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>

    {/* City Landmark Selection Modal */}
    {isCityModalOpen && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsCityModalOpen(false)}
      >
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Select City to Search Schools</h3>
              </div>
              <p className="text-[13px] text-[#64748B] mt-0.5">
                Browse top schools across major educational hubs in India
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCityModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <CitySelectorGrid
            selectedCity={city || 'All'}
            onSelectCity={(selected) => {
              setCity(selected === 'All' ? '' : selected);
              setIsCityModalOpen(false);
            }}
          />

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
            <span>Click any city to filter schools immediately</span>
            <button
              type="button"
              onClick={() => {
                setCity('');
                setIsCityModalOpen(false);
              }}
              className="text-[#0D9488] font-bold hover:underline cursor-pointer"
            >
              Reset to All India
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
