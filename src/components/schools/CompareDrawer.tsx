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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl bg-white/95 backdrop-blur-xl border border-[#E7E2DE] shadow-[0_16px_40px_rgba(105,11,27,0.18)] rounded-2xl p-3 sm:p-4 transition-all animate-in fade-in slide-in-from-bottom-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Info & count */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F7F0F1] text-[#690B1B] flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-[#111] flex items-center gap-2">
              Compare Schools ({compareList.length}/4)
            </div>
            <div className="text-[12px] text-[#777]">
              Compare board, fees, pros &amp; cons side-by-side
            </div>
          </div>
        </div>

        {/* Selected school pill items */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {compareList.map((slug) => {
            const school = getSchoolBySlug(slug);
            if (!school) return null;
            return (
              <div
                key={slug}
                className="flex items-center gap-2 bg-[#F6F4F2] border border-[#E7E1DD] rounded-xl pl-2 pr-1.5 py-1 text-[12px] font-medium text-[#111]"
              >
                <div className="w-5 h-5 rounded-md overflow-hidden relative shrink-0">
                  <Image
                    src={getSchoolImage(school)}
                    alt={school.schoolName}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <span className="max-w-[120px] sm:max-w-[150px] truncate">{school.schoolName}</span>
                <button
                  onClick={() => removeFromCompare(slug)}
                  className="w-4 h-4 rounded-full hover:bg-black/10 flex items-center justify-center text-[#777] hover:text-[#111] cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-[13px] font-medium text-[#777] hover:text-[#690B1B] px-3 py-1.5 cursor-pointer"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="h-[38px] px-4 rounded-full bg-[#690B1B] text-white text-[13px] font-bold flex items-center gap-1.5 shadow-[0_6px_16px_rgba(105,11,27,0.2)] hover:bg-[#7A1022] transition-colors"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
