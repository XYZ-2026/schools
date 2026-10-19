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
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] border border-[#F0D5DA] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A55D]" />
            Verified Schools Directory • {SCHOOLS_DATA.length} Institutions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111] tracking-tight">
            Featured Schools in India
          </h2>
          <p className="mt-2 text-[15px] text-[#666] max-w-xl">
            Verified data on curricula, annual tuition fees, strengths, and alumni achievements from our database.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.value
                  ? 'bg-[#690B1B] text-white shadow-xs'
                  : 'bg-white border border-[#E7E2DE] text-[#666] hover:border-[#690B1B]/40 hover:text-[#111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of School Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredSchools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 text-center">
        <Link
          href="/schools"
          className="inline-flex items-center gap-2 px-8 h-[50px] rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[15px] font-bold shadow-[0_10px_25px_rgba(105,11,27,0.22)] hover:scale-[1.02] transition-all"
        >
          <span>Explore All {SCHOOLS_DATA.length} Verified Schools &amp; Filter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
