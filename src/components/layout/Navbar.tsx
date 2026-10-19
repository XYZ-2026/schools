'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { 
  Compass, 
  BookOpen, 
  ArrowLeftRight, 
  Sparkles, 
  Castle, 
  Menu, 
  X, 
  BookmarkCheck
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { compareList, shortlist } = useSchool();

  const navLinks = [
    { label: 'Explore Schools', href: '/schools', icon: Compass },
    { label: 'Curriculum Guide', href: '/curriculum-guide', icon: BookOpen },
    { 
      label: 'Compare', 
      href: '/compare', 
      icon: ArrowLeftRight,
      badge: compareList.length > 0 ? compareList.length : undefined
    },
    { label: 'School Matcher', href: '/match', icon: Sparkles, isHighlight: true },
    { label: 'Boarding Schools', href: '/schools?type=Boarding', icon: Castle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F6F4F2]/92 backdrop-blur-xl border-b border-[#E7E2DE]">
      <div className="w-full h-[68px] sm:h-[84px] md:h-[92px] px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        {/* LEFT - Logo & Website Name */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0">
          <div className="relative w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-[14px] sm:rounded-[16px] shadow-[0_6px_20px_rgba(105,11,27,0.22)] overflow-hidden shrink-0 bg-gradient-to-br from-[#8C0C1D] to-[#5A0612] p-1.5 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Schools Simplified Logo" 
              width={52} 
              height={52} 
              priority 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <div className="text-[17px] sm:text-[20px] md:text-[22px] font-bold tracking-[-0.03em] leading-none text-[#111111] whitespace-nowrap">
              Schools Simplified
            </div>
            <div className="hidden sm:flex mt-[5px] items-center gap-1.5">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C9A55D] shrink-0" />
              <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-[#8C8C8C] whitespace-nowrap">
                India School Finder
              </span>
            </div>
          </div>
        </Link>

        {/* CENTER - Navigation Pills */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 z-10 w-max pointer-events-auto">
          <div className="flex items-center gap-1 xl:gap-1.5 bg-white/80 border border-[#E7E1DD] rounded-full px-2 xl:px-2.5 py-1.5 shadow-sm backdrop-blur-md shrink-0">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && !item.href.includes('?'));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 xl:px-4 h-[40px] rounded-full flex items-center gap-1.5 text-[14px] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#690B1B] text-white shadow-sm'
                      : 'text-[#5F5F5F] hover:bg-[#690B1B] hover:text-white'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap shrink-0 ${
                      isActive ? 'bg-white text-[#690B1B]' : 'bg-[#690B1B] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.isHighlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55D] animate-pulse shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT - Shortlist & CTA */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#111] focus:outline-none shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Shortlist link */}
          <Link
            href="/schools?saved=true"
            className="hidden xl:flex items-center gap-1.5 text-[14px] font-medium text-[#5B5B5B] hover:text-[#690B1B] transition-colors whitespace-nowrap px-3 py-2 rounded-full hover:bg-black/5"
            title="Saved Schools"
          >
            <BookmarkCheck className="w-4 h-4 text-[#C9A55D]" />
            <span>Shortlist</span>
            {shortlist.length > 0 && (
              <span className="text-[11px] font-bold bg-[#C9A55D] text-white rounded-full px-1.5 py-0.2">
                {shortlist.length}
              </span>
            )}
          </Link>

          {/* Primary Action Button */}
          <Link
            href="/match"
            className="group relative h-[38px] sm:h-[46px] md:h-[50px] px-4 sm:px-6 rounded-full overflow-hidden bg-[#690B1B] text-white text-[12px] sm:text-[14px] md:text-[15px] font-bold shadow-[0_10px_25px_rgba(105,11,27,0.22)] hover:scale-[1.02] transition-all flex items-center justify-center whitespace-nowrap shrink-0"
          >
            {/* SHINE EFFECT */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
            <span className="relative flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              Match My Child
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#E7E2DE] shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="px-5 py-5 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3] mb-3 px-1">
              Find The Perfect School
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-[14px] text-[15px] font-semibold text-[#111111] hover:bg-[#F7F0F1] hover:text-[#690B1B] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F7F0F1] border border-[#E8C4CC] text-[#690B1B] flex items-center justify-center shrink-0 group-hover:bg-[#690B1B] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[11px] font-bold bg-[#690B1B] text-white px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-[#F0EBE6] mt-3">
              <Link
                href="/match"
                className="flex items-center justify-center w-full py-3.5 rounded-[14px] bg-[#690B1B] text-white font-bold text-[15px] shadow-[0_6px_20px_rgba(105,11,27,0.22)] hover:bg-[#7A1022] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Best School for Child →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
