'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import SchoolCard from '@/components/schools/SchoolCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedSchoolsShowcase() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredSchools = SCHOOLS_DATA.filter((school) => {
    if (activeTab === 'All') return true;
    const b = school.board.toLowerCase();
    const pb = school.primaryBoard.toLowerCase();
    const target = activeTab.toLowerCase();
    return b.includes(target) || pb.includes(target);
  }).slice(0, 6);

  const tabs = [
    { label: 'All Featured', value: 'All' },
    { label: 'IB World Schools', value: 'IB' },
    { label: 'Cambridge IGCSE', value: 'IGCSE' },
    { label: 'ICSE / ISC', value: 'ICSE' },
    { label: 'CBSE Leaders', value: 'CBSE' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 w-full min-w-0">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] border border-[#93C5FD]/40 text-[#2563EB] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="truncate">Verified Schools Directory • {SCHOOLS_DATA.length} Institutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#080F1C] tracking-tight">
            Featured Schools in India
          </h2>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[#667085] leading-relaxed">
            Verified data on curricula, annual tuition fees, strengths, and alumni achievements from our database.
          </p>
        </div>

        {/* Filter Pills - Mobile Edge-to-Edge Scrollable without overflowing page */}
        <div className="w-full md:w-auto min-w-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 w-max">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-1.5 sm:py-2 rounded-full text-[12.5px] sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white border border-[#E4E7EC] text-[#667085] hover:border-[#2563EB]/40 hover:text-[#080F1C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of School Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 w-full">
        {filteredSchools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 sm:mt-12 text-center w-full">
        <Link
          href="/schools"
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 h-[48px] sm:h-[50px] w-full sm:w-auto rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] sm:text-[15px] font-bold shadow-[0_10px_25px_rgba(37,99,235,0.22)] hover:scale-[1.02] transition-all"
        >
          <span>Explore All {SCHOOLS_DATA.length} Verified Schools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
