'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  CheckCircle2,
  Building2,
  ArrowRight,
  Loader2,
  Target,
  BookmarkCheck,
  Compass
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

interface QuestionOption {
  label: string;
  description: string;
  value: string;
  meta?: Record<string, unknown>;
}

interface MatcherQuestion {
  id: number;
  key: 'grade' | 'city' | 'goal' | 'budget' | 'priority';
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

const QUESTIONS: MatcherQuestion[] = [
  {
    id: 1,
    key: 'grade',
    title: "What is your child's upcoming grade level?",
    subtitle: 'Helps identify schools with active admissions and age-appropriate infrastructure.',
    options: [
      {
        label: 'Pre-Primary / Kindergarten (Nursery, LKG, UKG)',
        description: 'Focus on experiential learning, curiosity, play, and emotional safety.',
        value: 'Pre-Primary',
      },
      {
        label: 'Primary School (Grades 1 to 5)',
        description: 'Foundational literacy, numeracy, conceptual grasp, and habits.',
        value: 'Primary (1-5)',
      },
      {
        label: 'Middle School (Grades 6 to 8)',
        description: 'Broadening academic subjects, sports, languages, and early interests.',
        value: 'Middle (6-8)',
      },
      {
        label: 'Secondary (Grades 9 & 10)',
        description: 'Crucial board exam readiness (CBSE, ICSE, Cambridge IGCSE, or MYP).',
        value: 'Secondary (9-10)',
      },
      {
        label: 'Senior Secondary / Pre-University (Grades 11 & 12)',
        description: 'Launchpad for Ivy League, global university admissions or IIT-JEE/NEET.',
        value: 'Senior Secondary (11-12)',
      },
    ],
  },
  {
    id: 2,
    key: 'city',
    title: 'Which city or region are you targeting?',
    subtitle: 'We filter through real verified campuses in your preferred location.',
    options: [
      {
        label: 'Mumbai & MMR',
        description: 'South Mumbai, BKC, Bandra, Powai, Thane, Navi Mumbai.',
        value: 'Mumbai',
      },
      {
        label: 'Bengaluru (Bangalore)',
        description: 'Whitefield, Koramangala, Indiranagar, Sarjapur, North Bangalore.',
        value: 'Bengaluru',
      },
      {
        label: 'Delhi NCR (Delhi, Gurgaon, Noida)',
        description: 'South Delhi, Dwarka, Golf Course Rd Gurgaon, Noida Expressway.',
        value: 'Delhi-NCR',
      },
      {
        label: 'Pune',
        description: 'Kalyani Nagar, Kothrud, Baner, Hinjewadi, Hadapsar.',
        value: 'Pune',
      },
      {
        label: 'Chennai',
        description: 'Adyar, Anna Nagar, OMR, Velachery, Kilpauk.',
        value: 'Chennai',
      },
      {
        label: 'Hyderabad',
        description: 'Gachibowli, HITEC City, Jubilee Hills, Banjara Hills.',
        value: 'Hyderabad',
      },
      {
        label: 'Residential / Boarding Hubs (Dehradun, Mussoorie, Pan-India)',
        description: 'Premier heritage boarding schools and residential international campuses.',
        value: 'Boarding',
      },
      {
        label: 'All India (Relocating / Open to Any Location)',
        description: 'Search across 5,200+ verified schools across all major Indian cities.',
        value: 'All',
      },
    ],
  },
  {
    id: 3,
    key: 'goal',
    title: 'Where do you envision your child after Grade 12?',
    subtitle: 'Curricular alignment is the single most critical factor for university placements.',
    options: [
      {
        label: 'Global Ivy League, US, UK, Canada & Europe',
        description: 'Holistic profile building, research essays, critical thinking, and international recognition.',
        value: 'global_college',
        meta: { recommendedBoard: 'IB' },
      },
      {
        label: 'Indian National Competitive Exams (IIT-JEE, NEET, CUET, NDA)',
        description: 'Demands rigorous NCERT syllabus synchronization and objective problem-solving skills.',
        value: 'competitive_exams',
        meta: { recommendedBoard: 'CBSE' },
      },
      {
        label: 'Premier Indian Universities & Liberal Arts (Ashoka, Krea, Plaksha, BITS)',
        description: 'Interdisciplinary breadth, comprehensive English literature, and strong analytical reasoning.',
        value: 'balanced',
        meta: { recommendedBoard: 'ICSE' },
      },
      {
        label: 'Undecided / Open to Both Pathways',
        description: 'Balanced curriculum offering seamless transferability to both Indian and overseas colleges.',
        value: 'open',
        meta: { recommendedBoard: 'All' },
      },
    ],
  },
  {
    id: 4,
    key: 'budget',
    title: 'What is your annual tuition fee budget expectation?',
    subtitle: 'Our verified database covers tuition brackets from budget to elite tier.',
    options: [
      {
        label: 'Budget-Friendly (Under ₹1,50,000 / year)',
        description: 'Strong academic standards with accessible community-focused tuition.',
        value: '150000',
      },
      {
        label: 'Mid-Tier Standard (₹1,50,000 - ₹3,50,000 / year)',
        description: 'Reputed private CBSE, ICSE, and Cambridge day schools with solid infrastructure.',
        value: '350000',
      },
      {
        label: 'Premium Day School (₹3,50,000 - ₹7,00,000 / year)',
        description: 'Modern campus amenities, sports complexes, robotics labs, and international boards.',
        value: '700000',
      },
      {
        label: 'Elite International Continuum (₹7,00,000 - ₹15,00,000+ / year)',
        description: 'World-class IB World Schools with multinational faculty and dedicated college counsellors.',
        value: '1500000',
      },
      {
        label: 'Any Budget / No Constraint',
        description: 'Show premier institutions purely matched on academic and holistic merit.',
        value: '2500000',
      },
    ],
  },
  {
    id: 5,
    key: 'priority',
    title: 'What campus characteristic is most important to your family?',
    subtitle: 'Matches school cultures that nurture your child’s specific passions.',
    options: [
      {
        label: 'Academic Rigour & High Board Averages',
        description: 'Proven track record of stellar 95%+ board results, Olympiads, and university admits.',
        value: 'academic',
      },
      {
        label: 'World-Class Sports, Arts & Performing Facilities',
        description: 'Olympic-sized swimming pools, FIFA football turfs, auditoriums, and professional coaches.',
        value: 'sports_arts',
      },
      {
        label: 'Individual Attention & Low Student-Teacher Ratio',
        description: 'Small class batches (under 20 students), personalized mentoring, and pastoral care.',
        value: 'individual_attention',
      },
      {
        label: 'Global Outlook, Leadership & Innovation Labs',
        description: 'Model UN, design thinking studios, international student exchange, and entrepreneurship.',
        value: 'global_leadership',
      },
    ],
  },
];

interface MatchedSchoolItem {
  school: School;
  matchScore: number;
  matchReasons: string[];
  badges: string[];
}

function MatcherContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStage, setCalculationStage] = useState('Querying 5,200+ schools in database...');
  const [completed, setCompleted] = useState(false);
  const [matchedResults, setMatchedResults] = useState<MatchedSchoolItem[]>([]);
  const [recommendedBoard, setRecommendedBoard] = useState('CBSE');
  const [totalCandidates, setTotalCandidates] = useState(5249);
  const [errorMsg, setErrorMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const { toggleCompare, isInCompare, openSchoolModal, shortlist, toggleShortlist } = useSchool();

  const handleSelectOption = async (optionValue: string) => {
    const currentQ = QUESTIONS[currentStep];
    const updatedAnswers = { ...answers, [currentQ.key]: optionValue };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Question Answered -> Trigger Real AI Matching against Live Database
      setIsCalculating(true);
      setErrorMsg('');

      try {
        setCalculationStage('Filtering 5,200+ schools by location and board...');

        // Map answers to API parameters
        const cityPref = updatedAnswers.city || 'All';
        const goalPref = updatedAnswers.goal || 'open';
        let targetBoard = 'All';
        if (goalPref === 'global_college') targetBoard = 'IB';
        else if (goalPref === 'competitive_exams') targetBoard = 'CBSE';
        else if (goalPref === 'balanced') targetBoard = 'ICSE';

        const budgetMax = updatedAnswers.budget ? parseInt(updatedAnswers.budget, 10) : 1500000;

        const payload = {
          city: cityPref,
          grade: updatedAnswers.grade,
          board: targetBoard,
          budgetMax,
          priority: updatedAnswers.priority || 'academic',
        };

        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Failed to compute matches');
        }

        const data = await res.json();

        setCalculationStage('Ranking top candidate institutions...');
        await new Promise((r) => setTimeout(r, 400));

        if (data.matchedSchools && Array.isArray(data.matchedSchools) && data.matchedSchools.length > 0) {
          setMatchedResults(data.matchedSchools);
          setRecommendedBoard(data.topBoard || targetBoard || 'CBSE');
          setTotalCandidates(data.totalCandidates || 5249);
        } else {
          setErrorMsg('No exact schools matched your filters. Broadening search to all regions.');
        }

        setCompleted(true);
      } catch (err) {
        console.error('Matcher error:', err);
        setErrorMsg('Could not reach the database. Please try again.');
      } finally {
        setIsCalculating(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const resetMatcher = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
    setIsCalculating(false);
    setMatchedResults([]);
    setVisibleCount(4);
    setErrorMsg('');
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#2563EB] text-[12px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          Intelligent AI Matcher • 5,200+ Database
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Find Your Child's Ideal School &amp; Board
        </h1>
        <p className="mt-2 text-[15px] text-[#64748B] max-w-xl mx-auto">
          Personalized match engine powered by live admissions, verified tuition fees, curricula, and campus strengths across India.
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
              {currentQ.title}
            </h2>
            <p className="mt-1 text-[14px] text-[#64748B]">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = answers[currentQ.key] === option.value;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.value)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex items-start gap-4 ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#E8F0FF]/40 ring-2 ring-[#2563EB]/20'
                      : 'border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-[#CBD5E1] group-hover:border-[#2563EB]'
                  }`}>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[#2563EB] transition-colors" />
                    )}
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
              );
            })}
          </div>

          {/* Navigation Controls */}
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              ← Previous Question
            </button>
          )}
        </div>
      ) : isCalculating ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full border-4 border-[#2563EB] border-t-transparent animate-spin mx-auto mb-5" />
          <h3 className="text-2xl font-extrabold text-[#0F172A]">Cross-Referencing Verified Schools...</h3>
          <p className="text-[14px] text-[#2563EB] font-semibold mt-2 animate-pulse">{calculationStage}</p>
          <p className="text-[12.5px] text-[#64748B] mt-1">
            Analyzing 5,200+ institutions across India based on your fee budget, board, and location preferences.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Recommendation Banner */}
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[12px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#93C5FD]" /> AI Recommendation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {recommendedBoard === 'IB' && 'International Baccalaureate (IB PYP / MYP / DP)'}
              {recommendedBoard === 'IGCSE' && 'Cambridge Assessment International (IGCSE & A-Levels)'}
              {recommendedBoard === 'ICSE' && 'Council for the Indian School Certificate (ICSE / ISC)'}
              {recommendedBoard === 'CBSE' && 'Central Board of Secondary Education (CBSE)'}
              {recommendedBoard === 'All' && 'Top Pan-India Curricular Frameworks'}
            </h2>
            <p className="mt-3 text-[15px] text-white/90 leading-relaxed max-w-2xl">
              Based on your target university timeline, child’s learning orientation, and family budget, this curriculum provides the strongest strategic fit.
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <Link
                href={`/schools?board=${encodeURIComponent(recommendedBoard)}`}
                className="px-5 py-2.5 rounded-full bg-white text-[#1D4ED8] text-[13px] font-bold shadow-xs hover:bg-[#F8FAFC] transition-colors"
              >
                Browse All {recommendedBoard} Schools →
              </Link>
              <Link
                href="/curriculum-guide"
                className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[13px] font-semibold transition-colors"
              >
                Read Curriculum Guide
              </Link>
              <button
                onClick={resetMatcher}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Matched Schools Results from 5,249 database */}
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                  <span>Top Matched Schools for Your Child</span>
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[#E8F0FF] text-[#2563EB]">
                    {matchedResults.length} Matched from {totalCandidates.toLocaleString('en-IN')}+ Database
                  </span>
                </h3>
                <p className="text-[13px] text-[#64748B] mt-0.5">
                  Ranked by curriculum match, fee budget alignment, and campus focus areas.
                </p>
              </div>

              <Link
                href={`/schools?city=${encodeURIComponent(answers.city && answers.city !== 'All' ? answers.city : 'All')}`}
                className="text-[13px] font-bold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>View Full Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {matchedResults.length > 0 ? (
              <>
                <div className="space-y-4">
                  {matchedResults.slice(0, visibleCount).map(({ school, matchScore, matchReasons, badges }) => {
                    const isSaved = shortlist.includes(school.slug);
                    return (
                      <div
                        key={school.id || school.slug}
                        className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#2563EB]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                      >
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={getSchoolImage(school)}
                              alt={school.schoolName}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1.5 min-w-0 flex-1">
                            {/* Badges & Match Score */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[12.5px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                {matchScore}% Match
                              </span>

                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8F0FF] text-[#2563EB]">
                                {school.board}
                              </span>

                              {badges.map((b, i) => (
                                <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                  {b}
                                </span>
                              ))}
                            </div>

                            {/* Title */}
                            <button
                              type="button"
                              onClick={() => openSchoolModal(school.slug)}
                              className="text-left cursor-pointer"
                            >
                              <h4 className="text-[17px] font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors leading-snug">
                                {school.schoolName}
                              </h4>
                            </button>

                            {/* Location & Fee */}
                            <div className="text-[12.5px] text-[#64748B] flex items-center gap-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                                {school.address || school.city}
                              </span>
                              <span>•</span>
                              <span className="font-bold text-[#0F172A] flex items-center gap-0.5">
                                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                                {school.approxAnnualFeesInr}
                              </span>
                            </div>

                            {/* Match Reasons List */}
                            {matchReasons && matchReasons.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                                {matchReasons.map((reason, rIdx) => (
                                  <div key={rIdx} className="text-[12px] text-slate-600 flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{reason}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right CTA Buttons */}
                        <div className="flex items-center gap-2 self-end md:self-center shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                          <button
                            type="button"
                            onClick={() => toggleShortlist(school.slug)}
                            className={`p-2 rounded-xl border text-[12px] font-semibold transition-colors cursor-pointer ${
                              isSaved
                                ? 'bg-[#E8F0FF] border-[#2563EB] text-[#2563EB]'
                                : 'border-[#E2E8F0] text-slate-600 hover:bg-slate-50'
                            }`}
                            title={isSaved ? 'Saved in Shortlist' : 'Add to Shortlist'}
                          >
                            <BookmarkCheck className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
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
                            type="button"
                            onClick={() => openSchoolModal(school.slug)}
                            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12.5px] font-bold transition-all shadow-xs cursor-pointer"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* View More Matches Button */}
                <div className="mt-8 pt-4 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  {visibleCount < matchedResults.length ? (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <span>View More Matches ({matchedResults.length - visibleCount} remaining)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <Link
                    href={`/schools?city=${encodeURIComponent(answers.city && answers.city !== 'All' ? answers.city : 'All')}&board=${encodeURIComponent(recommendedBoard !== 'All' ? recommendedBoard : '')}`}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-300 hover:border-[#2563EB] bg-white text-slate-700 hover:text-[#2563EB] text-[14px] font-semibold transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Browse All {totalCandidates.toLocaleString('en-IN')} Schools in Directory</span>
                    <Compass className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 text-center">
                <p className="text-[14px] text-slate-600">
                  {errorMsg || 'No matching schools found for these specific criteria.'}
                </p>
                <button
                  type="button"
                  onClick={resetMatcher}
                  className="mt-4 px-5 py-2 rounded-full bg-[#2563EB] text-white text-[13px] font-bold"
                >
                  Retake Quiz
                </button>
              </div>
            )}
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
