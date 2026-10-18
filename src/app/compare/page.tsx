'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSchool } from '@/context/SchoolContext';
import { SCHOOLS_DATA } from '@/data/schoolsData';
import { 
  ArrowLeftRight, 
  X, 
  Plus, 
  Check, 
  MapPin, 
  IndianRupee, 
  Users, 
  GraduationCap, 
  Building2, 
  Award, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, toggleCompare, getSchoolBySlug } = useSchool();
  const [selectorOpen, setSelectorOpen] = useState(false);

  // Quick preset pairs
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
          Decision Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Side-by-Side School Comparison
        </h1>
        <p className="mt-2 text-[15px] text-[#666] max-w-3xl">
          Evaluate curriculum rigor, annual tuition fees, faculty-student ratios, boarding amenities, and global university placement statistics.
        </p>
      </div>

      {/* Preset Comparison Buttons */}
      <div className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-5 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[13px] font-bold text-[#111] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C9A55D]" /> Popular Comparison Matchups:
          </div>
          <div className="text-[12px] text-[#777]">Instant benchmark for top applicant choices</div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => applyPreset(['dhirubhai-ambani-international-school', 'the-international-school-bangalore'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            DAIS vs TISB (Top IB)
          </button>
          <button
            onClick={() => applyPreset(['the-doon-school-dehradun', 'woodstock-school-mussoorie'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            Doon vs Woodstock (Boarding)
          </button>
          <button
            onClick={() => applyPreset(['heritage-xperiential-learning-school', 'dps-rk-puram'])}
            className="px-3.5 py-1.5 rounded-xl bg-[#F6F4F2] hover:bg-[#FAF0F2] text-[#690B1B] text-[12.5px] font-bold border border-[#E7E1DD] transition-colors cursor-pointer"
          >
            Heritage vs DPS RKP (NCR)
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
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#690B1B] text-white text-[14px] font-bold shadow-md hover:bg-[#7A1022]"
          >
            <span>Browse Schools Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#E7E2DE] bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header row with school cards */}
            <thead>
              <tr className="border-b border-[#E7E2DE] bg-[#FAF8F5]">
                <th className="p-4 sm:p-5 w-48 text-[13px] font-bold text-[#777] uppercase tracking-wider align-top">
                  Features & Metrics
                </th>
                {comparedSchools.map((school) => {
                  if (!school) return null;
                  return (
                    <th key={school.id} className="p-4 sm:p-5 align-top min-w-[220px] max-w-[280px]">
                      <div className="relative group">
                        <button
                          onClick={() => removeFromCompare(school.slug)}
                          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                          title="Remove school"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="h-28 w-full rounded-xl overflow-hidden relative mb-3 bg-stone-100">
                          <Image
                            src={school.heroImage}
                            alt={school.name}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                        </div>
                        <div className="text-[12px] font-bold text-[#690B1B]">Rank #{school.rank} in India</div>
                        <Link href={`/schools/${school.slug}`}>
                          <h4 className="text-[16px] font-bold text-[#111] leading-snug hover:text-[#690B1B] transition-colors mt-0.5 line-clamp-2">
                            {school.name}
                          </h4>
                        </Link>
                        <div className="text-[12px] text-[#777] mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#690B1B]" />
                          {school.city}, {school.state}
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

            {/* Table Body Comparison Rows */}
            <tbody className="divide-y divide-[#EFEBE6] text-[13.5px]">
              {/* Row: Curricula / Boards */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#690B1B]" />
                    <span>Curricula / Boards</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-medium text-[#222]">
                    <div className="flex flex-wrap gap-1">
                      {s?.boards.map((b) => (
                        <span key={b} className="px-2 py-0.5 rounded bg-[#FAF0F2] text-[#690B1B] font-bold text-[12px]">
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] text-[#777] mt-1">Primary: {s?.primaryBoard}</div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: Annual Fees */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-[#C9A55D]" />
                    <span>Annual Tuition</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-extrabold text-[#690B1B] text-[15px]">
                    {s?.feeRangeLabel}
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: Student to Teacher Ratio */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#690B1B]" />
                    <span>Faculty Ratio</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 font-semibold text-[#111]">
                    {s?.studentTeacherRatio}
                    <div className="text-[11px] text-[#777] font-normal">Dedicated faculty per student</div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: Format & Campus Size */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#690B1B]" />
                    <span>Format & Campus</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#333]">
                    <div className="font-semibold">{s?.schoolType} ({s?.gender})</div>
                    <div className="text-[12px] text-[#666] mt-0.5">{s?.campusSize}</div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: Academic Achievement */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C9A55D]" />
                    <span>Academic Track Record</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#444]">
                    <div className="font-bold text-[#111]">{s?.academicAchievements[0]?.title}</div>
                    <div className="text-[12px] text-[#666] mt-1 leading-snug">
                      {s?.academicAchievements[0]?.description}
                    </div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: University Placements */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#690B1B]" />
                    <span>Top Placements</span>
                  </div>
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5 text-[#444]">
                    <div className="flex flex-wrap gap-1">
                      {s?.collegePlacements.topUniversities.slice(0, 4).map((u, i) => (
                        <span key={i} className="text-[11.5px] px-2 py-0.5 rounded bg-[#F6F4F2] text-[#333] border border-[#E7E1DD]">
                          {u}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11.5px] text-[#666] mt-1.5">
                      {s?.collegePlacements.internationalHighlights}
                    </div>
                  </td>
                ))}
                {comparedSchools.length < 4 && <td className="p-4 bg-[#F6F4F2]/20" />}
              </tr>

              {/* Row: Actions */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[#444] bg-[#FDFBF9]">
                  Admissions Action
                </td>
                {comparedSchools.map((s) => (
                  <td key={s?.id} className="p-4 sm:p-5">
                    <div className="mb-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        {s?.admissionsStatus}
                      </span>
                    </div>
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
