'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BOARD_COMPARISONS } from '@/data/schoolsData';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

export default function CurriculumGuidePage() {
  const [selectedBoardCode, setSelectedBoardCode] = useState<'IB' | 'IGCSE' | 'ICSE' | 'CBSE'>('IB');

  const selectedBoard = BOARD_COMPARISONS.find((b) => b.code === selectedBoardCode) || BOARD_COMPARISONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#C9A55D]" />
          Comprehensive Curricular Analysis
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111] tracking-tight">
          IB vs Cambridge (IGCSE) vs ICSE vs CBSE
        </h1>
        <p className="mt-3 text-[16px] text-[#666] leading-relaxed">
          The decisive parent handbook to decoding India’s four most respected educational boards. Compare philosophy, workload, global university recognition, and entrance examination suitability.
        </p>
      </div>

      {/* Board Selector Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {BOARD_COMPARISONS.map((board) => (
          <button
            key={board.code}
            onClick={() => setSelectedBoardCode(board.code)}
            className={`px-5 py-3 rounded-2xl font-bold text-[15px] transition-all cursor-pointer flex items-center gap-2 ${
              selectedBoardCode === board.code
                ? 'bg-[#690B1B] text-white shadow-md scale-105'
                : 'bg-white border border-[#E7E2DE] text-[#666] hover:bg-[#F6F4F2] hover:text-[#111]'
            }`}
          >
            <span>{board.code}</span>
            <span className="text-[11px] font-normal opacity-80 hidden sm:inline">
              ({board.name.split(' ')[0]})
            </span>
          </button>
        ))}
      </div>

      {/* Active Board Deep-Dive Card */}
      <div className="bg-white rounded-3xl border border-[#E7E2DE] p-6 sm:p-10 shadow-sm mb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE6]">
          <div>
            <div className="text-[12px] uppercase tracking-wider text-[#690B1B] font-bold">
              {selectedBoard.governingBody}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111] mt-1">
              {selectedBoard.fullForm}
            </h2>
            <div className="mt-2 text-[14px] text-[#555] font-medium flex items-center gap-3 flex-wrap">
              <span className="bg-[#FAF8F5] border border-[#E8E1DA] px-2.5 py-1 rounded-md text-[#333]">
                Average Tuition: <strong className="text-[#690B1B]">{selectedBoard.averageAnnualFee}</strong>
              </span>
              <span className="bg-[#FAF8F5] border border-[#E8E1DA] px-2.5 py-1 rounded-md text-[#333]">
                Recognition: <strong className="text-[#333]">{selectedBoard.globalRecognition}</strong>
              </span>
            </div>
          </div>

          <Link
            href={`/schools?board=${selectedBoard.code}`}
            className="px-6 h-[46px] rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[14px] font-bold flex items-center gap-2 shadow-sm self-start lg:self-center transition-all"
          >
            <span>Explore Top {selectedBoard.code} Schools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Core breakdown columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Left: Pedagogy & Exam style */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[16px] font-bold text-[#111] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A55D]" /> Pedagogy & Core Philosophy
              </h3>
              <p className="text-[14.5px] text-[#555] leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE9E4]">
                {selectedBoard.pedagogyFocus}
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#111] mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#690B1B]" /> Assessment & Examination Structure
              </h3>
              <p className="text-[14.5px] text-[#555] leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE9E4]">
                {selectedBoard.examStructure}
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#111] mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C9A55D]" /> Best Suited Child Personality
              </h3>
              <p className="text-[14.5px] text-[#555] leading-relaxed">
                {selectedBoard.idealFor}
              </p>
            </div>
          </div>

          {/* Right: Pros & Cons */}
          <div className="space-y-6">
            <div className="bg-[#F6FAF7] border border-[#D5EADB] rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Advantages
              </h4>
              <ul className="space-y-2 text-[13.5px] text-emerald-950">
                {selectedBoard.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FDF6F7] border border-[#F2D7DA] rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-[#8A1A2A] mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#8A1A2A]" /> Critical Trade-offs to Consider
              </h4>
              <ul className="space-y-2 text-[13.5px] text-[#690B1B]">
                {selectedBoard.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8A1A2A] font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Matrix Table */}
      <div className="bg-white rounded-3xl border border-[#E7E2DE] p-6 sm:p-10 shadow-sm">
        <div className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#690B1B]">Quick Reference</div>
          <h3 className="text-2xl font-bold text-[#111] mt-1">4-Board Executive Matrix for Parents</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-[#E7E2DE] bg-[#FAF8F5]">
                <th className="p-4 font-bold text-[#777] uppercase text-[12px]">Evaluation Metric</th>
                <th className="p-4 font-bold text-[#690B1B]">IB Diploma</th>
                <th className="p-4 font-bold text-[#690B1B]">Cambridge IGCSE / A-Levels</th>
                <th className="p-4 font-bold text-[#690B1B]">ICSE / ISC</th>
                <th className="p-4 font-bold text-[#690B1B]">CBSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEBE6]">
              <tr>
                <td className="p-4 font-bold text-[#444] bg-[#FDFBF9]">Primary Focus</td>
                <td className="p-4">Research, TOK & Critical Inquiry</td>
                <td className="p-4">Deep Subject Specialization</td>
                <td className="p-4">English Literature & Detailed Sciences</td>
                <td className="p-4">STEM & National Exam Syllabus</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#444] bg-[#FDFBF9]">College Abroad (US/UK)</td>
                <td className="p-4 text-emerald-700 font-bold">Highest Standing (Direct Credits)</td>
                <td className="p-4 text-emerald-700 font-bold">Standard UK Benchmark</td>
                <td className="p-4 text-[#333]">Strong (Requires SAT/IELTS)</td>
                <td className="p-4 text-[#333]">Accepted (High Percentage)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#444] bg-[#FDFBF9]">Indian Entrances (JEE/NEET)</td>
                <td className="p-4 text-[#777]">Challenging (Requires Extra Coaching)</td>
                <td className="p-4 text-[#777]">Moderate (Curriculum Differentiates)</td>
                <td className="p-4 text-[#333]">Good Foundation</td>
                <td className="p-4 text-emerald-700 font-bold">Exact 1-to-1 Syllabus Match</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#444] bg-[#FDFBF9]">Tuition Bracket</td>
                <td className="p-4 font-bold text-[#690B1B]">₹4.5L – ₹14.0L / yr</td>
                <td className="p-4 font-bold text-[#690B1B]">₹3.0L – ₹9.5L / yr</td>
                <td className="p-4 font-bold text-[#690B1B]">₹1.5L – ₹5.0L / yr</td>
                <td className="p-4 font-bold text-[#690B1B]">₹80K – ₹3.5L / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
