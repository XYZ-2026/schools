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
      className="group bg-white rounded-2xl sm:rounded-[22px] border border-[#E4E7EC] overflow-hidden shadow-sm hover:shadow-[0_14px_35px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer w-full min-w-0"
    >
      {/* Top Media & Badges */}
      <div>
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={school.schoolName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="bg-[#2563EB] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              {school.board}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-[#080F1C] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#2563EB]" /> Grades {school.grades}
            </span>
          </div>

          {/* Top right actions */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleShortlist(school.slug);
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                shortlisted
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
              title={shortlisted ? 'Saved to shortlist' : 'Save to shortlist'}
            >
              <Bookmark className="w-4 h-4" fill={shortlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Status pill on bottom left of image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="bg-emerald-600/90 text-white text-[10.5px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
              Verified Institution
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-5">
          {/* Location */}
          <div className="flex items-center justify-between text-[12px] text-[#667085] mb-1.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <strong className="text-[#344054] font-medium">{school.city}</strong>
              {school.address && <span className="truncate max-w-[170px]">• {school.address}</span>}
            </span>
            <span className="bg-[#F8FAFC] px-2 py-0.5 rounded text-[11px] font-medium text-[#344054]">
              {school.primaryBoard}
            </span>
          </div>

          {/* Title */}
          <a 
            href={`/schools/${school.slug}`}
            onClick={(e) => {
              e.preventDefault();
              openSchoolModal(school.slug);
            }}
          >
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#080F1C] leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-1">
              {school.schoolName}
            </h3>
          </a>

          {/* Strengths / Pros snippet */}
          <p className="text-[12.5px] text-[#667085] line-clamp-2 mt-1 mb-3 leading-relaxed">
            {school.pros || school.notableAlumniAchievements || 'Premier academic institution with comprehensive learning facilities.'}
          </p>

          {/* Key Metrics Pill Grid */}
          <div className="grid grid-cols-2 gap-2 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 mb-3 text-[12px]">
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
      </div>

      {/* Card Footer Actions */}
      <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 pt-2 border-t border-[#E4E7EC] flex items-center justify-between gap-2">
        {/* Compare Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(school.slug);
          }}
          className={`text-[12px] font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
            comparing
              ? 'bg-[#2563EB] text-white'
              : 'text-[#667085] hover:bg-[#E8F0FF] hover:text-[#2563EB]'
          }`}
        >
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
            comparing ? 'border-white bg-[#2563EB]' : 'border-[#AAA] bg-white'
          }`}>
            {comparing && <Check className="w-2.5 h-2.5 text-white" />}
          </span>
          <span>{comparing ? 'In Compare' : 'Compare'}</span>
        </button>

        {/* View Profile */}
        <a
          href={`/schools/${school.slug}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openSchoolModal(school.slug);
          }}
          className="text-[12.5px] font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 group/btn cursor-pointer"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
