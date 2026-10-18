'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { School } from '@/types/school';
import { useSchool } from '@/context/SchoolContext';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw, 
  MapPin, 
  Star, 
  IndianRupee, 
  GraduationCap,
  Award
} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    boardWeight: { IB: number; IGCSE: number; ICSE: number; CBSE: number };
    preferredType?: string;
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
    title: 'What school environment best supports your child’s lifestyle?',
    subtitle: 'Considering campus dynamics, commute, and residential pastoral care.',
    options: [
      {
        label: 'Urban Day School in City',
        description: 'Daily parent involvement, local extracurriculars, and close family proximity.',
        boardWeight: { IB: 2, IGCSE: 2, ICSE: 2, CBSE: 2 },
        preferredType: 'Day School'
      },
      {
        label: 'Prestigious Residential Boarding Academy (Hills / Estate)',
        description: 'Focus on independent leadership, round-the-clock sports, camaraderie, and character.',
        boardWeight: { IB: 3, IGCSE: 2, ICSE: 3, CBSE: 2 },
        preferredType: 'Boarding School'
      },
      {
        label: 'Flexible Day-cum-Boarding Institution',
        description: 'Modern campus providing both extended day scholar and weekday boarding choices.',
        boardWeight: { IB: 2, IGCSE: 3, ICSE: 2, CBSE: 2 },
        preferredType: 'Day & Boarding'
      }
    ]
  },
  {
    id: 4,
    title: 'What is your comfortable annual tuition budget?',
    subtitle: 'Excludes optional international field trips and uniform kits.',
    options: [
      {
        label: 'Under ₹4 Lakhs / year',
        description: 'High academic value with established national standards.',
        boardWeight: { IB: 0, IGCSE: 1, ICSE: 3, CBSE: 4 },
        maxBudget: 400000
      },
      {
        label: '₹4 Lakhs to ₹9 Lakhs / year',
        description: 'Premier metro day schools with international faculties and modern STEM labs.',
        boardWeight: { IB: 3, IGCSE: 4, ICSE: 3, CBSE: 2 },
        maxBudget: 900000
      },
      {
        label: '₹10 Lakhs+ / year (World-class facilities & Residential)',
        description: 'Top-tier IB World schools and heritage boarding estates with equestrian & Olympic pools.',
        boardWeight: { IB: 4, IGCSE: 3, ICSE: 2, CBSE: 1 },
        maxBudget: 2500000
      }
    ]
  },
  {
    id: 5,
    title: "How does your child learn most effectively?",
    subtitle: 'Matching pedagogical methodology to natural cognitive disposition.',
    options: [
      {
        label: 'Inquiry-Driven & Project Explorer',
        description: 'Thrives when asking "Why?", conducting personal research, debates, and presentations.',
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
      },
      {
        label: 'All-Rounder with High Focus on Sports & Leadership',
        description: 'Thrives in expansive campuses with competitive athletics, polo, swimming, and teamwork.',
        boardWeight: { IB: 3, IGCSE: 2, ICSE: 3, CBSE: 3 }
      }
    ]
  }
];

export default function MatcherPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { toggleCompare, isInCompare } = useSchool();

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = optionIndex;
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate
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
    let preferredType = '';
    let budgetCap = 2500000;

    answers.forEach((ansIdx, qIdx) => {
      const q = QUESTIONS[qIdx];
      const opt = q.options[ansIdx];
      if (opt) {
        boardScores.IB += opt.boardWeight.IB;
        boardScores.IGCSE += opt.boardWeight.IGCSE;
        boardScores.ICSE += opt.boardWeight.ICSE;
        boardScores.CBSE += opt.boardWeight.CBSE;
        if (opt.preferredType) preferredType = opt.preferredType;
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
      if (school.boards.includes(topBoard as any)) score += 18;
      if (school.primaryBoard === topBoard) score += 8;
      if (preferredType && school.schoolType.includes(preferredType)) score += 10;
      if (school.annualFeeMin <= budgetCap) score += 6;
      if (school.rating >= 4.88) score += 4;
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A55D]" />
          Intelligent Recommendation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Find Your Child's Ideal School & Board
        </h1>
        <p className="mt-2 text-[15px] text-[#666] max-w-xl mx-auto">
          Takes under 60 seconds. We analyze your academic vision, target university timeline, and family values.
        </p>
      </div>

      {!completed && !isCalculating ? (
        <div className="bg-white rounded-3xl border border-[#E7E2DE] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#888] uppercase tracking-wider mb-2">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-[#690B1B]">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-[#F0EBE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#690B1B] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111] leading-snug">
              {QUESTIONS[currentStep].title}
            </h2>
            <p className="text-[14px] text-[#666] mt-1">
              {QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {QUESTIONS[currentStep].options.map((opt, idx) => {
              const isSelected = answers[currentStep] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#FAF0F2] border-[#690B1B] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#E8E1DA] hover:border-[#690B1B]/40 hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#690B1B] bg-[#690B1B] text-white'
                        : 'border-[#AAA] bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-[#111]">{opt.label}</div>
                    <div className="text-[13px] text-[#666] mt-0.5">{opt.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#777] hover:text-[#111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>
          )}
        </div>
      ) : isCalculating ? (
        <div className="bg-white rounded-3xl border border-[#E7E2DE] p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full border-4 border-[#690B1B] border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#111]">Analyzing Compatibility...</h3>
          <p className="text-[14px] text-[#666] mt-1">
            Matching your child’s profile with 100+ accredited Indian schools.
          </p>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in">
          {/* Top Board Verdict Card */}
          <div className="bg-gradient-to-br from-[#690B1B] to-[#40050E] text-white rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#C9A55D] mb-2">
              <Sparkles className="w-4 h-4" /> Recommended Board
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {topBoard === 'IB' && 'International Baccalaureate (IB DP / MYP)'}
              {topBoard === 'IGCSE' && 'Cambridge IGCSE & A-Levels'}
              {topBoard === 'ICSE' && 'ICSE & ISC Board'}
              {topBoard === 'CBSE' && 'Central Board of Secondary Education (CBSE)'}
            </h2>
            <p className="mt-3 text-[15px] text-white/90 leading-relaxed max-w-2xl">
              Based on your target university timeline and child's learning orientation, the {topBoard} framework provides the strongest competitive edge and learning satisfaction.
            </p>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <Link
                href={`/schools?board=${topBoard}`}
                className="px-5 py-2.5 rounded-full bg-white text-[#690B1B] text-[13px] font-bold shadow-sm hover:bg-[#F6F4F2]"
              >
                Browse All {topBoard} Schools →
              </Link>
              <Link
                href="/curriculum-guide"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold"
              >
                Read Curricular Guide
              </Link>
            </div>
          </div>

          {/* Top 4 School Matches */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-[#111]">
                Top Matched Schools for Your Child
              </h3>
              <button
                onClick={resetMatcher}
                className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#690B1B] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>

            <div className="space-y-4">
              {scoredSchools.map(({ school, matchPercentage }) => (
                <div
                  key={school.id}
                  className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#690B1B]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                      <Image
                        src={school.heroImage}
                        alt={school.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {matchPercentage}% Match
                        </span>
                        <span className="text-[11px] font-semibold text-[#888]">
                          Rank #{school.rank} in India
                        </span>
                      </div>
                      <Link href={`/schools/${school.slug}`}>
                        <h4 className="text-[16px] sm:text-[17px] font-bold text-[#111] hover:text-[#690B1B] transition-colors leading-snug">
                          {school.name}
                        </h4>
                      </Link>
                      <div className="text-[12.5px] text-[#666] mt-0.5 flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#690B1B]" />
                          {school.city}
                        </span>
                        <span>•</span>
                        <span>{school.feeRangeLabel.split('/')[0]}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#690B1B]">{school.primaryBoard} World</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => toggleCompare(school.slug)}
                      className={`px-3 py-2 rounded-xl text-[12px] font-bold border transition-colors ${
                        isInCompare(school.slug)
                          ? 'bg-[#FAF0F2] border-[#690B1B] text-[#690B1B]'
                          : 'border-[#E7E2DE] text-[#666] hover:bg-[#F6F4F2]'
                      }`}
                    >
                      {isInCompare(school.slug) ? 'In Compare' : 'Compare'}
                    </button>
                    <Link
                      href={`/schools/${school.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#690B1B] hover:bg-[#7A1022] text-white text-[12.5px] font-bold transition-colors"
                    >
                      View Profile →
                    </Link>
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
