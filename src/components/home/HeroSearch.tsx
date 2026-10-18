'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, GraduationCap, Building2, ArrowRight } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [board, setBoard] = useState('');
  const [city, setCity] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (board) params.set('board', board);
    if (city) params.set('city', city);
    if (schoolType) params.set('type', schoolType);
    if (keyword.trim()) params.set('q', keyword.trim());
    router.push(`/schools?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-[#E7E2DE] shadow-[0_16px_45px_rgba(105,11,27,0.12)] rounded-3xl p-3 sm:p-4 transition-all"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Keyword Search */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F6F4F2] border border-[#E7E1DD] hover:border-[#690B1B]/40 transition-colors">
          <Search className="w-4 h-4 text-[#690B1B] shrink-0" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search school name..."
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111] placeholder-[#888] focus:outline-none"
          />
        </div>

        {/* Board Select */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F6F4F2] border border-[#E7E1DD] hover:border-[#690B1B]/40 transition-colors">
          <GraduationCap className="w-4 h-4 text-[#690B1B] shrink-0" />
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111] focus:outline-none cursor-pointer"
          >
            <option value="">All Curricula (IB, IGCSE...)</option>
            <option value="IB">IB World School</option>
            <option value="IGCSE">Cambridge IGCSE</option>
            <option value="ICSE">ICSE / ISC</option>
            <option value="CBSE">CBSE Excellence</option>
          </select>
        </div>

        {/* City Select */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F6F4F2] border border-[#E7E1DD] hover:border-[#690B1B]/40 transition-colors">
          <MapPin className="w-4 h-4 text-[#690B1B] shrink-0" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111] focus:outline-none cursor-pointer"
          >
            <option value="">All Cities / Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Gurugram">Delhi NCR / Gurugram</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Dehradun">Dehradun</option>
            <option value="Mussoorie">Mussoorie</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Ajmer">Ajmer</option>
          </select>
        </div>

        {/* School Type Select */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F6F4F2] border border-[#E7E1DD] hover:border-[#690B1B]/40 transition-colors">
          <Building2 className="w-4 h-4 text-[#690B1B] shrink-0" />
          <select
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111] focus:outline-none cursor-pointer"
          >
            <option value="">Day vs Boarding</option>
            <option value="Day School">Day School</option>
            <option value="Boarding School">Boarding (Residential)</option>
            <option value="Day & Boarding">Day & Boarding</option>
          </select>
        </div>
      </div>

      {/* Submit Button Row */}
      <div className="mt-3 pt-3 border-t border-[#F0EBE6] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12px] text-[#777]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Showing 2026-27 admission dates, fees & student-teacher ratios</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto h-[44px] px-7 rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[14px] font-bold shadow-[0_8px_20px_rgba(105,11,27,0.22)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>Find Schools</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
