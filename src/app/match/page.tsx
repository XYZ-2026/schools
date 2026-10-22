'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { School } from '@/types/school';
import { useSchool } from '@/context/SchoolContext';
import { getSchoolImage } from '@/components/schools/SchoolCard';
import { 
  Sparkles, 
  RotateCcw, 
  MapPin, 
  IndianRupee, 
  GraduationCap,
  Layers,
  ThumbsUp,
  Award,
  ArrowRight
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    boardWeight: { IB: number; IGCSE: number; ICSE: number; CBSE: number };
    maxBudget?: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "What is your child's upcoming grade level?",
    subtitle: 'This helps determine which curriculum transitions are most seamless.',
    options: [
      {
        label: 'Pre-Primary / Primary (Nursery to Grade 5)',
        description: 'Building curiosity, language foundations, and foundational numeracy.',
        boardWeight: { IB: 3, IGCSE: 2, ICSE: 2, CBSE: 2 }
      },
      {
        label: 'Middle School (Grades 6 to 8)',
        description: 'Broadening academic horizons and discovering extracurricular passions.',
        boardWeight: { IB: 2, IGCSE: 3, ICSE: 2, CBSE: 2 }
      },
      {
        label: 'Secondary (Grades 9 & 10)',
        description: 'Crucial board certification years (IGCSE, ICSE, or CBSE Class 10).',
        boardWeight: { IB: 2, IGCSE: 3, ICSE: 3, CBSE: 3 }
      },
      {
        label: 'Senior Secondary / Pre-University (Grades 11 & 12)',
        description: 'Direct launchpad to global undergraduate degrees or competitive exams.',
        boardWeight: { IB: 3, IGCSE: 2, ICSE: 2, CBSE: 3 }
      }
    ]
  },
  {
    id: 2,
    title: 'Where do you envision your child attending college / university?',
    subtitle: 'Curricular alignment is the single most important factor for university admissions.',
    options: [
      {
        label: 'Global Ivy League, US, UK, Canada & Europe',
        description: 'Prioritizing holistic profile building, research essays, and extracurricular depth.',
        boardWeight: { IB: 4, IGCSE: 3, ICSE: 2, CBSE: 1 }
      },
      {
        label: 'Indian National Competitive Exams (IIT-JEE, NEET, CUET, NDA)',
        description: 'Requires direct NCERT syllabus alignment and specialized objective problem solving.',
        boardWeight: { IB: 0, IGCSE: 1, ICSE: 2, CBSE: 4 }
      },
      {
        label: 'Premier Indian Liberal Arts & Global Dual Degrees (Ashoka, Krea, Plaksha)',
        description: 'Emphasis on interdisciplinary thinking, communication, and humanities.',
        boardWeight: { IB: 3, IGCSE: 3, ICSE: 3, CBSE: 2 }
      },
      {
        label: 'Undecided / Open to Both Pathways',
        description: 'Looking for a balanced curriculum with maximum flexible future transferability.',
        boardWeight: { IB: 2, IGCSE: 3, ICSE: 3, CBSE: 3 }
      }
    ]
  },
  {
    id: 3,
    title: 'What is your annual tuition budget expectation?',
    subtitle: 'CLARVO features verified fee structures across every bracket.',
    options: [
      {
        label: 'Affordable / Moderate (Under ₹3,00,000 / year)',
        description: 'High academic standard state-supported or premier government institutions.',
        boardWeight: { IB: 0, IGCSE: 1, ICSE: 3, CBSE: 4 },
        maxBudget: 300000
      },
      {
        label: 'Mid-Tier Premium (₹3,00,000 - ₹7,00,000 / year)',
        description: 'Reputed Cambridge IGCSE and ICSE institutions with strong campus amenities.',
        boardWeight: { IB: 2, IGCSE: 4, ICSE: 4, CBSE: 3 },
        maxBudget: 700000
      },
      {
        label: 'Elite International (₹7,00,000 - ₹15,00,000+ / year)',
        description: 'World-class IB continuum schools with multinational faculty and college counsellors.',
        boardWeight: { IB: 5, IGCSE: 3, ICSE: 1, CBSE: 1 },
        maxBudget: 2500000
      }
    ]
  },
  {
    id: 4,
    title: 'What pedagogical style resonates best with your child?',
    subtitle: 'Different curricula nurture different problem-solving orientations.',
    options: [
      {
        label: 'Inquiry-Based & Research-Oriented Explorer',
        description: 'Thrives on questions, debates, critical analysis, and hands-on projects.',
        boardWeight: { IB: 4, IGCSE: 3, ICSE: 2, CBSE: 1 }
      },
      {
        label: 'Structured & Goal-Oriented Learner',
        description: 'Excels with clear benchmarks, systematic textbook practice, and objective tests.',
        boardWeight: { IB: 1, IGCSE: 2, ICSE: 3, CBSE: 4 }
      },
      {
        label: 'Passionate in Arts, Literature & Debate',
        description: 'Deep love for essay writing, literature, linguistic expression, and theatre.',
        boardWeight: { IB: 3, IGCSE: 3, ICSE: 4, CBSE: 2 }
      }
    ]
  }
];

function MatcherContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { toggleCompare, isInCompare, openSchoolModal } = useSchool();

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = optionIndex;
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setCompleted(true);
      }, 700);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const resetMatcher = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCompleted(false);
    setIsCalculating(false);
  };

  // Compute matched board and ranked school recommendations
  const getResults = () => {
    const boardScores = { IB: 0, IGCSE: 0, ICSE: 0, CBSE: 0 };
    let budgetCap = 2500000;

    answers.forEach((ansIdx, qIdx) => {
      const q = QUESTIONS[qIdx];
      const opt = q.options[ansIdx];
      if (opt) {
        boardScores.IB += opt.boardWeight.IB;
        boardScores.IGCSE += opt.boardWeight.IGCSE;
        boardScores.ICSE += opt.boardWeight.ICSE;
        boardScores.CBSE += opt.boardWeight.CBSE;
        if (opt.maxBudget) budgetCap = opt.maxBudget;
      }
    });

    // Best board
    const sortedBoards = (Object.keys(boardScores) as (keyof typeof boardScores)[]).sort(
      (a, b) => boardScores[b] - boardScores[a]
    );
    const topBoard = sortedBoards[0];

    // Score schools
    const scoredSchools = SCHOOLS_DATA.map((school) => {
      let score = 70; // baseline
      const bLower = school.board.toLowerCase();
      const targetLower = topBoard.toLowerCase();
      if (bLower.includes(targetLower)) score += 18;
      if (school.primaryBoard === topBoard) score += 8;
      if (school.feeMin <= budgetCap && school.feeMin > 0) score += 6;
      const matchPercentage = Math.min(99, Math.round(score));
      return { school, matchPercentage };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 4);

    return { topBoard, scoredSchools };
  };

  const { topBoard, scoredSchools } = getResults();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#2563EB] text-[12px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          Intelligent Recommendation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Find Your Child's Ideal School &amp; Board
        </h1>
        <p className="mt-2 text-[15px] text-[#64748B] max-w-xl mx-auto">
          Takes under 60 seconds. We analyze your academic vision, target university timeline, and family values.
        </p>
      </div>

      {!completed && !isCalculating ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-[#2563EB]">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              {QUESTIONS[currentStep].title}
            </h2>
            <p className="mt-1 text-[14px] text-[#64748B]">
              {QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#E8F0FF]/30 transition-all cursor-pointer group flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#CBD5E1] group-hover:border-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[#2563EB] transition-colors" />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[#0F172A] group-hover:text-[#2563EB]">
                    {option.label}
                  </div>
                  <div className="text-[13px] text-[#64748B] mt-0.5 leading-relaxed">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              ← Previous Question
            </button>
          )}
        </div>
      ) : isCalculating ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full border-4 border-[#2563EB] border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#0F172A]">Analyzing Curricular Profiles...</h3>
          <p className="text-[14px] text-[#64748B] mt-1">Cross-referencing verified schools across India.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Recommendation Banner */}
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[12px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#93C5FD]" /> Recommended Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {topBoard === 'IB' && 'International Baccalaureate (IB DP / MYP)'}
              {topBoard === 'IGCSE' && 'Cambridge IGCSE & A-Levels'}
              {topBoard === 'ICSE' && 'ICSE & ISC Board'}
              {topBoard === 'CBSE' && 'Central Board of Secondary Education (CBSE)'}
            </h2>
            <p className="mt-3 text-[15px] text-white/90 leading-relaxed max-w-2xl">
              Based on your target university timeline and child's learning orientation, the {topBoard} framework provides the strongest competitive edge.
            </p>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <Link
                href={`/schools?board=${topBoard}`}
                className="px-5 py-2.5 rounded-full bg-white text-[#1D4ED8] text-[13px] font-bold shadow-xs hover:bg-[#F8FAFC]"
              >
                Browse All {topBoard} Schools →
              </Link>
              <Link
                href="/curriculum-guide"
                className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[13px] font-semibold"
              >
                Read Curriculum Guide
              </Link>
            </div>
          </div>

          {/* Top 4 School Matches */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A]">
                Top Matched Schools for Your Child
              </h3>
              <button
                onClick={resetMatcher}
                className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>

            <div className="space-y-4">
              {scoredSchools.map(({ school, matchPercentage }) => (
                <div
                  key={school.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md hover:border-[#2563EB]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={getSchoolImage(school)}
                        alt={school.schoolName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {matchPercentage}% Match
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8F0FF] text-[#2563EB]">
                          {school.board}
                        </span>
                        <span className="text-[11px] font-semibold text-[#64748B]">
                          Grades: {school.grades}
                        </span>
                      </div>

                      <a 
                        href={`/schools/${school.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          openSchoolModal(school.slug);
                        }}
                      >
                        <h4 className="text-[17px] font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors leading-snug cursor-pointer">
                          {school.schoolName}
                        </h4>
                      </a>

                      <div className="text-[12.5px] text-[#64748B] flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                          {school.address || school.city}
                        </span>
                        <span>•</span>
                        <span className="font-bold text-[#2563EB]">{school.approxAnnualFeesInr}</span>
                      </div>

                      {school.pros && (
                        <p className="text-[12px] text-[#475569] line-clamp-1 italic">
                          "{school.pros}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => toggleCompare(school.slug)}
                      className={`px-3 py-2 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer ${
                        isInCompare(school.slug)
                          ? 'bg-[#E8F0FF] border-[#2563EB] text-[#2563EB]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {isInCompare(school.slug) ? 'In Compare' : 'Compare'}
                    </button>
                    <button
                      onClick={() => openSchoolModal(school.slug)}
                      className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12.5px] font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatcherPage() {
  return (
    <AuthGuard fallbackUrl="/auth">
      <MatcherContent />
    </AuthGuard>
  );
}
