'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSchool } from '@/context/SchoolContext';
import { getSchoolImage } from '@/components/schools/SchoolCard';
import { X, ArrowRight, ArrowLeftRight } from 'lucide-react';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, getSchoolBySlug } = useSchool();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[96%] sm:w-[92%] max-w-4xl bg-white/95 backdrop-blur-xl border border-[#E4E7EC] shadow-[0_16px_40px_rgba(37,99,235,0.18)] rounded-2xl p-3 sm:p-4 transition-all animate-in fade-in slide-in-from-bottom-5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Info & count */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E8F0FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] sm:text-[14px] font-bold text-[#080F1C] flex items-center gap-2">
                Compare Schools ({compareList.length}/4)
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#667085] hidden xs:block">
                Compare board, fees, pros &amp; cons
              </div>
            </div>
          </div>

          {/* Quick Clear on Mobile top right */}
          <button
            onClick={clearCompare}
            className="lg:hidden text-[12px] font-semibold text-[#667085] hover:text-[#2563EB] px-2 py-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Selected school pill items */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center w-full lg:w-auto">
          {compareList.map((slug) => {
            const school = getSchoolBySlug(slug);
            if (!school) return null;
            return (
              <div
                key={slug}
                className="flex items-center gap-1.5 sm:gap-2 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl pl-1.5 sm:pl-2 pr-1 sm:pr-1.5 py-1 text-[11px] sm:text-[12px] font-medium text-[#080F1C]"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md overflow-hidden relative shrink-0">
                  <Image
                    src={getSchoolImage(school)}
                    alt={school.schoolName}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <span className="max-w-[100px] sm:max-w-[130px] md:max-w-[150px] truncate">{school.schoolName}</span>
                <button
                  onClick={() => removeFromCompare(slug)}
                  className="w-4 h-4 rounded-full hover:bg-black/10 flex items-center justify-center text-[#667085] hover:text-[#080F1C] cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="hidden lg:block text-[13px] font-medium text-[#667085] hover:text-[#2563EB] px-3 py-1.5 cursor-pointer"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="h-[36px] sm:h-[38px] px-4 rounded-full bg-[#2563EB] text-white text-[12.5px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-[0_6px_16px_rgba(37,99,235,0.2)] hover:bg-[#1D4ED8] transition-colors w-full sm:w-auto"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
