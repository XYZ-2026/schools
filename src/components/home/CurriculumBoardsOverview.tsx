import React from 'react';
import Link from 'next/link';
import { BOARD_COMPARISONS } from '@/data/schoolsData';
import { ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';

export default function CurriculumBoardsOverview() {
  return (
    <section className="py-16 sm:py-24 bg-[#EFECE8]/60 border-y border-[#E7E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] border border-[#F0D5DA] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 text-[#C9A55D]" />
            Curricula Decoded
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111] tracking-tight">
            Which Board is Right for Your Child?
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#666] leading-relaxed">
            Every child learns differently. Compare India’s top four recognized curricula side-by-side to understand academic focus, exam style, and global university acceptance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOARD_COMPARISONS.map((board) => (
            <div
              key={board.code}
              className="bg-white rounded-2xl border border-[#E7E2DE] p-5 sm:p-6 shadow-sm hover:shadow-[0_12px_30px_rgba(105,11,27,0.08)] hover:border-[#690B1B]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[20px] font-extrabold text-[#690B1B] tracking-tight">
                    {board.code}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#690B1B] border border-[#F0D5DA]">
                    {board.averageAnnualFee}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-[#111] leading-snug mb-2">
                  {board.name}
                </h3>

                <p className="text-[12.5px] text-[#666] line-clamp-3 mb-4 leading-relaxed">
                  {board.pedagogyFocus}
                </p>

                {/* Pros List */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#888]">
                    Key Strengths:
                  </div>
                  {board.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[12px] text-[#444]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#F0EBE6]">
                <div className="text-[11px] text-[#777] mb-3">
                  <strong className="text-[#333]">Best For:</strong> {board.idealFor.slice(0, 75)}...
                </div>
                <Link
                  href={`/schools?board=${board.code}`}
                  className="w-full py-2.5 rounded-xl bg-[#F6F4F2] hover:bg-[#690B1B] hover:text-white text-[#690B1B] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore {board.code} Schools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Guide Banner */}
        <div className="mt-10 text-center">
          <Link
            href="/curriculum-guide"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#690B1B] hover:underline"
          >
            <Sparkles className="w-4 h-4 text-[#C9A55D]" />
            <span>Read Complete 2026 Board Comparison Guide (IB vs IGCSE vs ICSE vs CBSE) →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
