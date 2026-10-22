'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  Castle, 
  Menu, 
  X, 
  BookmarkCheck,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { shortlist } = useSchool();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Explore Schools', href: '/schools', icon: Compass },
    { label: 'Curriculum Guide', href: '/curriculum-guide', icon: BookOpen },
    { label: 'School Matcher', href: '/match', icon: Sparkles, isHighlight: true },
    { label: 'Boarding Schools', href: '/schools?type=Boarding', icon: Castle },
  ];

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'P';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/92 backdrop-blur-xl border-b border-[#E4E7EC]">
      <div className="w-full h-[68px] sm:h-[84px] md:h-[92px] px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        {/* LEFT - Logo & Website Name */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0">
          <div className="relative w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] shrink-0 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="CLARVO Logo" 
              width={52} 
              height={52} 
              priority 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <div className="text-[17px] sm:text-[20px] md:text-[22px] font-bold tracking-[-0.03em] leading-none text-[#080F1C] whitespace-nowrap">
              CLARVO
            </div>
            <div className="hidden sm:flex mt-[5px] items-center gap-1.5">
              <span className="w-[4px] h-[4px] rounded-full bg-[#2563EB] shrink-0" />
              <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-[#667085] whitespace-nowrap">
                Clarity for Their Future
              </span>
            </div>
          </div>
        </Link>

        {/* CENTER - Navigation Pills */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 z-10 w-max pointer-events-auto">
          <div className="flex items-center gap-1 xl:gap-1.5 bg-white/80 border border-[#E4E7EC] rounded-full px-2 xl:px-2.5 py-1.5 shadow-sm backdrop-blur-md shrink-0">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && !item.href.includes('?'));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 xl:px-4 h-[40px] rounded-full flex items-center gap-1.5 text-[14px] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'text-[#667085] hover:bg-[#2563EB] hover:text-white'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT - Shortlist, Auth & CTA */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 relative z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#080F1C] focus:outline-none shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Shortlist link */}
          <Link
            href="/schools?saved=true"
            className="hidden xl:flex items-center gap-1.5 text-[14px] font-medium text-[#667085] hover:text-[#2563EB] transition-colors whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#E8F0FF]"
            title="Saved Schools"
          >
            <BookmarkCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Shortlist</span>
            {shortlist.length > 0 && (
              <span className="text-[11px] font-bold bg-[#2563EB] text-white rounded-full px-1.5 py-0.2">
                {shortlist.length}
              </span>
            )}
          </Link>

          {/* Auth State Button */}
          {user ? (
            <div className="hidden md:flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full pl-2 pr-1.5 py-1">
              <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {getUserInitials()}
              </div>
              <span className="text-[12.5px] font-semibold text-[#080F1C] max-w-[100px] truncate">
                {user.displayName || user.email?.split('@')[0]}
              </span>
              <button
                onClick={() => logout()}
                className="w-7 h-7 rounded-full hover:bg-rose-50 text-[#64748B] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden md:flex items-center gap-1.5 text-[13.5px] font-semibold text-[#667085] hover:text-[#2563EB] transition-colors whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#E8F0FF]"
            >
              <LogIn className="w-4 h-4 text-[#2563EB]" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Primary Action Button */}
          <Link
            href="/match"
            className="group relative h-[38px] sm:h-[46px] md:h-[50px] px-4 sm:px-6 rounded-full overflow-hidden bg-[#2563EB] text-white text-[12px] sm:text-[14px] md:text-[15px] font-bold shadow-[0_10px_25px_rgba(37,99,235,0.22)] hover:bg-[#1D4ED8] hover:scale-[1.02] transition-all flex items-center justify-center whitespace-nowrap shrink-0"
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
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#E4E7EC] shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="px-5 py-5 space-y-1.5">
            {/* User status on mobile */}
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                    {getUserInitials()}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-[#080F1C] truncate max-w-[180px]">
                      {user.displayName || 'Parent Account'}
                    </div>
                    <div className="text-[11px] text-[#667085] truncate max-w-[180px]">
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-[12px] font-bold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mb-3">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2563EB]/30 bg-[#E8F0FF] text-[#2563EB] font-bold text-[14px]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Create Parent Account</span>
                </Link>
              </div>
            )}

            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#667085] mb-3 px-1">
              Find The Perfect School
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-[14px] text-[15px] font-semibold text-[#080F1C] hover:bg-[#E8F0FF] hover:text-[#2563EB] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E8F0FF] border border-[#93C5FD]/40 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}

            {/* Shortlist mobile link */}
            <Link
              href="/schools?saved=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-[14px] text-[15px] font-semibold text-[#080F1C] hover:bg-[#E8F0FF] hover:text-[#2563EB] transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8F0FF] border border-[#93C5FD]/40 text-[#2563EB] flex items-center justify-center shrink-0">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <span>Saved Shortlist</span>
              </div>
              {shortlist.length > 0 && (
                <span className="text-[11px] font-bold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                  {shortlist.length}
                </span>
              )}
            </Link>

            <div className="pt-4 border-t border-[#E4E7EC] mt-3">
              <Link
                href="/match"
                className="flex items-center justify-center w-full py-3.5 rounded-[14px] bg-[#2563EB] text-white font-bold text-[15px] shadow-[0_6px_20px_rgba(37,99,235,0.22)] hover:bg-[#1D4ED8] transition-all"
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
