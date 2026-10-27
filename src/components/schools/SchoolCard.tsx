'use client';

import React from 'react';
import Image from 'next/image';
import { School } from '@/types/school';
import { useSchool } from '@/context/SchoolContext';
import { MapPin, Bookmark, Check, IndianRupee, ArrowUpRight, GraduationCap, Layers } from 'lucide-react';

const SCHOOL_IMAGES = [
  'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
];

export function getSchoolImage(school: School): string {
  if (school.heroImage) return school.heroImage;
  let hash = 0;
  for (let i = 0; i < school.schoolName.length; i++) {
    hash = (hash << 5) - hash + school.schoolName.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % SCHOOL_IMAGES.length;
  return SCHOOL_IMAGES[index];
}

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const { isInCompare, toggleCompare, isInShortlist, toggleShortlist, openSchoolModal } = useSchool();
  const comparing = isInCompare(school.slug);
  const shortlisted = isInShortlist(school.slug);
  const imageUrl = getSchoolImage(school);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open modal if not clicking compare or shortlist button
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    e.preventDefault();
    openSchoolModal(school.slug);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl sm:rounded-[22px] border border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-xs hover:shadow-[0_12px_30px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-row sm:flex-col justify-between cursor-pointer w-full min-w-0 p-2.5 sm:p-0 gap-3 sm:gap-0 overflow-hidden"
    >
      {/* ── LEFT (MOBILE) / TOP (DESKTOP) MEDIA ── */}
      <div className="relative w-24 h-24 sm:w-full sm:h-52 rounded-xl sm:rounded-none overflow-hidden shrink-0 bg-slate-100">
        <Image
          src={imageUrl}
          alt={school.schoolName}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Board badge (Desktop only on top of hero image) */}
        <div className="hidden sm:flex absolute top-3 left-3 items-center gap-1.5 flex-wrap">
          <span className="bg-[#2563EB] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
            {school.board}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#080F1C] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#2563EB]" /> Grades {school.grades}
          </span>
        </div>

        {/* Shortlist button */}
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleShortlist(school.slug);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
              shortlisted
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-black/35 hover:bg-black/55 text-white'
            }`}
            title={shortlisted ? 'Saved to shortlist' : 'Save to shortlist'}
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill={shortlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Verified pill on bottom left */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 flex items-center gap-1.5">
          <span className="bg-emerald-600/90 text-white text-[9px] sm:text-[10.5px] font-semibold px-1.5 py-0.5 rounded sm:rounded-md backdrop-blur-xs flex items-center gap-1">
            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden xs:inline sm:inline">Verified</span>
          </span>
        </div>
      </div>

      {/* ── RIGHT (MOBILE) / BOTTOM (DESKTOP) DETAILS ── */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 sm:p-5">
        <div>
          {/* Location row */}
          <div className="flex items-center justify-between text-[11px] sm:text-[12px] text-[#64748B] mb-0.5 sm:mb-1.5">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2563EB] shrink-0" />
              <strong className="text-[#344054] font-semibold">{school.city}</strong>
              {school.address && <span className="truncate max-w-[130px] sm:max-w-[170px] text-[#64748B]">• {school.address}</span>}
            </span>
            <span className="hidden sm:inline-block bg-[#F8FAFC] px-2 py-0.5 rounded text-[11px] font-medium text-[#344054]">
              {school.primaryBoard}
            </span>
          </div>

          {/* School Name */}
          <a 
            href={`/schools/${school.slug}`}
            onClick={(e) => {
              e.preventDefault();
              openSchoolModal(school.slug);
            }}
          >
            <h3 className="text-[14.5px] sm:text-[18px] font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2 sm:line-clamp-1 mb-1 sm:mb-0">
              {school.schoolName}
            </h3>
          </a>

          {/* Desktop Strengths / Pros snippet */}
          <p className="hidden sm:block text-[12.5px] text-[#667085] line-clamp-2 mt-1 mb-3 leading-relaxed">
            {school.pros || school.notableAlumniAchievements || 'Premier academic institution with comprehensive learning facilities.'}
          </p>

          {/* Desktop Key Metrics Pill Grid */}
          <div className="hidden sm:grid grid-cols-2 gap-2 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 mb-3 text-[12px]">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#667085] font-semibold flex items-center gap-1">
                <IndianRupee className="w-2.5 h-2.5 text-[#2563EB] shrink-0" /> <span className="truncate">Annual Fees</span>
              </span>
              <span className="font-bold text-[#080F1C] truncate mt-0.5" title={school.approxAnnualFeesInr}>
                {school.approxAnnualFeesInr}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#667085] font-semibold flex items-center gap-1">
                <GraduationCap className="w-2.5 h-2.5 text-[#2563EB] shrink-0" /> <span className="truncate">Curriculum</span>
              </span>
              <span className="font-bold text-[#080F1C] truncate mt-0.5" title={school.board}>
                {school.board}
              </span>
            </div>
          </div>
        </div>

        {/* ── MOBILE BADGES & ACTIONS ROW ── */}
        <div className="flex sm:hidden items-center justify-between gap-1.5 mt-2 pt-1.5 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-md truncate max-w-[85px]">
              {school.primaryBoard || school.board}
            </span>
            <span className="text-[10px] font-medium text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded-md truncate">
              Grades {school.grades}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openSchoolModal(school.slug);
            }}
            className="text-[11.5px] font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-0.5 cursor-pointer shrink-0"
          >
            <span>View</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── DESKTOP FOOTER ACTIONS ── */}
      <div className="hidden sm:flex px-5 py-3.5 border-t border-[#E4E7EC] items-center justify-between gap-3 mt-auto bg-white">
        {/* Compare Checkbox Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(school.slug);
          }}
          className={`h-9 px-3 text-[12px] font-semibold flex items-center gap-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            comparing
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:bg-[#E8F0FF] hover:text-[#2563EB] hover:border-[#BFDBFE]'
          }`}
        >
          <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
            comparing ? 'border-white bg-[#2563EB]' : 'border-[#CBD5E1] bg-white'
          }`}>
            {comparing && <Check className="w-3 h-3 text-white" />}
          </span>
          <span className="whitespace-nowrap">{comparing ? 'In Compare' : 'Compare'}</span>
        </button>

        {/* View Profile Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openSchoolModal(school.slug);
          }}
          className="h-9 px-2 text-[12.5px] font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 group/btn cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

