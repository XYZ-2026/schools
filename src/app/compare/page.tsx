'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSchool } from '@/context/SchoolContext';
import { getSchoolImage } from '@/components/schools/SchoolCard';
import { 
  ArrowLeftRight, 
  X, 
  Plus, 
  MapPin, 
  IndianRupee, 
  GraduationCap, 
  Layers,
  ThumbsUp, 
  AlertCircle,
  Award, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, toggleCompare, getSchoolBySlug } = useSchool();

  // Quick preset pairs from Import9 dataset
  const applyPreset = (slugs: string[]) => {
    slugs.forEach((slug) => {
      if (!compareList.includes(slug)) {
        toggleCompare(slug);
      }
    });
  };

  const comparedSchools = compareList.map((slug) => getSchoolBySlug(slug)).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#C9A55D]" />
          Wix CMS Benchmark Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Side-by-Side School Comparison
        </h1>
        <p className="mt-2 text-[15px] text-[#666] max-w-3xl">
          Evaluate verified curricula, annual tuition fee schedules, pros, cons, and notable alumni track records side-by-side.
        </p>
      </div>

      {/* Preset Comparison Buttons */}
      <div className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-5 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[13px] font-bold text-[#111] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C9A55D]" /> Popular Comparison Matchups:
          </div>
          <div className="text-[12px] text-[#777]">Instant benchmark for top applicant choices</div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => applyPreset(['dhirubhai-ambani-international-school', 'oberoi-international-school'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            DAIS vs Oberoi (Mumbai IB)
          </button>
          <button
            onClick={() => applyPreset(['oakridge-international-school-bangalore', 'inventure-academy'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            Oakridge vs Inventure (Bengaluru)
          </button>
          <button
            onClick={() => applyPreset(['deens-academy', 'trio-world-academy'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            Deens vs Trio (Dual Board)
          </button>
        </div>
      </div>

      {comparedSchools.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E2DE] p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#FAF0F2] text-[#690B1B] flex items-center justify-center mx-auto mb-4">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <h3 className="text-[20px] font-bold text-[#111]">No Schools Selected For Comparison</h3>
          <p className="mt-2 text-[14px] text-[#666]">
            Select schools from the directory or choose one of our curated popular presets above.
          </p>
          <Link
            href="/schools"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#690B1B] text-white text-[14px] font-bold shadow-xs hover:bg-[#7A1022]"
          >
            <span>Browse Schools Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#E7E2DE] bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header row with school cards */}
            <thead>
              <tr className="border-b border-[#E7E2DE] bg-[#FAF8F5]">
                <th className="p-4 sm:p-5 w-48 text-[13px] font-bold text-[#777] uppercase tracking-wider align-top">
                  Verified Columns
                </th>
                {comparedSchools.map((school) => {
                  if (!school) return null;
                  return (
                    <th key={school.id} className="p-4 sm:p-5 align-top min-w-[240px] max-w-[300px]">
                      <div className="relative group bg-white border border-[#E7E1DD] rounded-xl p-4 shadow-xs">
                        <button
                          onClick={() => removeFromCompare(school.slug)}
                          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove school"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="h-28 w-full rounded-xl overflow-hidden relative mb-3 bg-stone-100">
                          <Image
                            src={getSchoolImage(school)}
                            alt={school.schoolName}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#690B1B] text-white mb-1.5">
                          {school.board}
                        </span>
                        <Link href={`/schools/${school.slug}`}>
                          <h4 className="text-[16px] font-bold text-[#111] leading-snug hover:text-[#690B1B] transition-colors line-clamp-2">
                            {school.schoolName}
                          </h4>
                        </Link>
                        <div className="text-[12px] text-[#666] mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#690B1B] shrink-0" />
                          <span className="line-clamp-1">{school.address}</span>
                        </div>
                      </div>
                    </th>
                  );
                })}
                {comparedSchools.length < 4 && (
                  <th className="p-5 align-middle text-center min-w-[180px] bg-[#F6F4F2]/50">
                    <Link
                      href="/schools"
                      className="inline-flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[#DDD] hover:border-[#690B1B] text-[#777] hover:text-[#690B1B] transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-[13px] font-bold">Add Another School</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body Comparison Rows: ONLY IMPORT9 COLUMNS */}
            <tbody className="divide-y divide-[#EFEBE6] text-[13.5px]">
              {/* Row 1: Board / Curriculum */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#690B1B]" />
                    <span>Board</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-semibold text-[#111]">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAF0F2] text-[#690B1B] font-bold text-[13px] border border-[#F0D5DA]">
                      {s?.board}
                    </span>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 2: Grades Offered */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#C9A55D]" />
                    <span>Grades</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-semibold text-[#222]">
                    Grades {s?.grades}
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 3: Approx Annual Fees */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-[#C9A55D]" />
                    <span>Approx Annual Fees (INR)</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-extrabold text-[#690B1B] text-[15px]">
                    {s?.approxAnnualFeesInr || 'Fees upon request'}
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 4: Key Strengths (Pros) */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4 text-emerald-700" />
                    <span>Key Strengths (Pros)</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#333]">
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2.5 text-[12.5px] leading-relaxed text-emerald-950">
                      {s?.pros || 'Not specified'}
                    </div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 5: Considerations (Cons) */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-700" />
                    <span>Considerations (Cons)</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#333]">
                    <div className="bg-rose-50/60 border border-rose-100 rounded-lg p-2.5 text-[12.5px] leading-relaxed text-rose-950">
                      {s?.cons || 'Not specified'}
                    </div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 6: Notable Alumni & Achievements */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C9A55D]" />
                    <span>Notable Alumni &amp; Achievements</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#444] text-[12.5px] leading-relaxed">
                    {s?.notableAlumniAchievements || 'No records reported'}
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 7: Contact Details */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#690B1B]" />
                    <span>Contact Details</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[12px] text-[#555] leading-relaxed">
                    {s?.contactDetails}
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row 8: Action Profile */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  School Profile
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5">
                    <Link
                      href={`/schools/${s?.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#690B1B] hover:bg-[#7A1022] text-white font-bold text-[13px] shadow-xs transition-colors"
                    >
                      <span>View Full Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
