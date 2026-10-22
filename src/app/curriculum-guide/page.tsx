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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#2563EB] text-[12px] font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
          Comprehensive Curricular Analysis
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          IB vs Cambridge (IGCSE) vs ICSE vs CBSE
        </h1>
        <p className="mt-3 text-[16px] text-[#64748B] leading-relaxed">
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
                ? 'bg-[#2563EB] text-white shadow-md scale-105'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
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
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm mb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9]">
          <div>
            <div className="text-[12px] uppercase tracking-wider text-[#2563EB] font-bold">
              {selectedBoard.governingBody}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
              {selectedBoard.fullForm}
            </h2>
            <div className="mt-2 text-[14px] text-[#64748B] font-medium flex items-center gap-3 flex-wrap">
              <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-md text-[#334155]">
                Average Tuition: <strong className="text-[#2563EB]">{selectedBoard.averageAnnualFee}</strong>
              </span>
              <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-md text-[#334155]">
                Recognition: <strong className="text-[#0F172A]">{selectedBoard.globalRecognition}</strong>
              </span>
            </div>
          </div>

          <Link
            href={`/schools?board=${selectedBoard.code}`}
            className="px-6 h-[46px] rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-bold flex items-center gap-2 shadow-sm self-start lg:self-center transition-all"
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
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" /> Pedagogy & Core Philosophy
              </h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                {selectedBoard.pedagogyFocus}
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" /> Assessment & Examination Structure
              </h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                {selectedBoard.examStructure}
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2563EB]" /> Best Suited Child Personality
              </h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                {selectedBoard.idealFor}
              </p>
            </div>
          </div>

          {/* Right: Pros & Cons */}
          <div className="space-y-6">
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5">
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

            <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-rose-900 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" /> Critical Trade-offs to Consider
              </h4>
              <ul className="space-y-2 text-[13.5px] text-rose-950">
                {selectedBoard.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Matrix Table */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
        <div className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#2563EB]">Quick Reference</div>
          <h3 className="text-2xl font-bold text-[#0F172A] mt-1">4-Board Executive Matrix for Parents</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="p-4 font-bold text-[#64748B] uppercase text-[12px]">Evaluation Metric</th>
                <th className="p-4 font-bold text-[#2563EB]">IB Diploma</th>
                <th className="p-4 font-bold text-[#2563EB]">Cambridge IGCSE / A-Levels</th>
                <th className="p-4 font-bold text-[#2563EB]">ICSE / ISC</th>
                <th className="p-4 font-bold text-[#2563EB]">CBSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              <tr>
                <td className="p-4 font-bold text-[#334155] bg-[#F8FAFC]">Primary Focus</td>
                <td className="p-4">Research, TOK & Critical Inquiry</td>
                <td className="p-4">Deep Subject Specialization</td>
                <td className="p-4">English Literature & Detailed Sciences</td>
                <td className="p-4">STEM & National Exam Syllabus</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#334155] bg-[#F8FAFC]">College Abroad (US/UK)</td>
                <td className="p-4 text-emerald-700 font-bold">Highest Standing (Direct Credits)</td>
                <td className="p-4 text-emerald-700 font-bold">Standard UK Benchmark</td>
                <td className="p-4 text-[#334155]">Strong (Requires SAT/IELTS)</td>
                <td className="p-4 text-[#334155]">Accepted (High Percentage)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#334155] bg-[#F8FAFC]">Indian Entrances (JEE/NEET)</td>
                <td className="p-4 text-[#64748B]">Challenging (Requires Extra Coaching)</td>
                <td className="p-4 text-[#64748B]">Moderate (Curriculum Differentiates)</td>
                <td className="p-4 text-[#334155]">Good Foundation</td>
                <td className="p-4 text-emerald-700 font-bold">Exact 1-to-1 Syllabus Match</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#334155] bg-[#F8FAFC]">Tuition Bracket</td>
                <td className="p-4 font-bold text-[#2563EB]">₹4.5L – ₹14.0L / yr</td>
                <td className="p-4 font-bold text-[#2563EB]">₹3.0L – ₹9.5L / yr</td>
                <td className="p-4 font-bold text-[#2563EB]">₹1.5L – ₹5.0L / yr</td>
                <td className="p-4 font-bold text-[#2563EB]">₹80K – ₹3.5L / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
