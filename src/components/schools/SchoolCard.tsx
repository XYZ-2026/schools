'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { School } from '@/types/school';
import { useSchool } from '@/context/SchoolContext';
import { MapPin, Bookmark, Check, IndianRupee, ArrowUpRight, GraduationCap, Layers } from 'lucide-react';

const SCHOOL_CAMPUS_IMAGES = [
  'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
];

export function getSchoolImage(school: School): string {
  if (school.heroImage) return school.heroImage;
  let hash = 0;
  const key = school.slug || school.schoolName || school.id;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % SCHOOL_CAMPUS_IMAGES.length;
  return SCHOOL_CAMPUS_IMAGES[idx];
}

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const { isInCompare, toggleCompare, isInShortlist, toggleShortlist } = useSchool();
  const comparing = isInCompare(school.slug);
  const shortlisted = isInShortlist(school.slug);
  const imageUrl = getSchoolImage(school);

  return (
    <div className="group bg-white rounded-2xl sm:rounded-[22px] border border-[#E7E2DE] overflow-hidden shadow-sm hover:shadow-[0_14px_35px_rgba(105,11,27,0.08)] hover:border-[#690B1B]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Top Media & Badges */}
      <div>
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
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
            <span className="bg-[#690B1B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              {school.board}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-[#111] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#C9A55D]" /> Grades {school.grades}
            </span>
          </div>

          {/* Top right actions */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleShortlist(school.slug);
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                shortlisted
                  ? 'bg-[#C9A55D] text-white'
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
        <div className="p-4 sm:p-5">
          {/* Location */}
          <div className="flex items-center justify-between text-[12px] text-[#777] mb-1.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#690B1B]" />
              <strong className="text-[#333] font-medium">{school.city}</strong>
              {school.address && <span className="truncate max-w-[170px]">• {school.address}</span>}
            </span>
            <span className="bg-[#F7F5F3] px-2 py-0.5 rounded text-[11px] font-medium text-[#555]">
              {school.primaryBoard}
            </span>
          </div>

          {/* Title */}
          <Link href={`/schools/${school.slug}`}>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111] leading-snug group-hover:text-[#690B1B] transition-colors line-clamp-1">
              {school.schoolName}
            </h3>
          </Link>

          {/* Strengths / Pros snippet */}
          <p className="text-[12.5px] text-[#666] line-clamp-2 mt-1 mb-3 leading-relaxed">
            {school.pros || school.notableAlumniAchievements || 'Premier academic institution with comprehensive learning facilities.'}
          </p>

          {/* Key Metrics Pill Grid */}
          <div className="grid grid-cols-2 gap-2 bg-[#F9F7F5] border border-[#EFE9E4] rounded-xl p-2.5 mb-3 text-[12px]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#888] font-semibold flex items-center gap-1">
                <IndianRupee className="w-2.5 h-2.5 text-[#C9A55D]" /> Annual Fees
              </span>
              <span className="font-bold text-[#222] truncate mt-0.5">
                {school.approxAnnualFeesInr}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#888] font-semibold flex items-center gap-1">
                <GraduationCap className="w-2.5 h-2.5 text-[#690B1B]" /> Curriculum
              </span>
              <span className="font-bold text-[#222] truncate mt-0.5">
                {school.board}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#F0EBE6] flex items-center justify-between gap-2">
        {/* Compare Checkbox */}
        <button
          onClick={() => toggleCompare(school.slug)}
          className={`text-[12px] font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
            comparing
              ? 'bg-[#690B1B] text-white'
              : 'text-[#666] hover:bg-[#F7F0F1] hover:text-[#690B1B]'
          }`}
        >
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
            comparing ? 'border-white bg-[#690B1B]' : 'border-[#AAA] bg-white'
          }`}>
            {comparing && <Check className="w-2.5 h-2.5 text-white" />}
          </span>
          <span>{comparing ? 'In Compare' : 'Compare'}</span>
        </button>

        {/* View Profile */}
        <Link
          href={`/schools/${school.slug}`}
          className="text-[12.5px] font-bold text-[#690B1B] hover:text-[#7A1022] flex items-center gap-1 group/btn"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
