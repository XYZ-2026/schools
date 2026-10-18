import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#030303] px-4 sm:px-6 md:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-20 pb-8 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-14">
          {/* BRAND */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 max-w-[320px]">
            <Link href="/" className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity">
              <div className="w-[46px] h-[46px] rounded-[14px] overflow-hidden shadow-[0_6px_20px_rgba(105,11,27,0.3)] shrink-0 bg-gradient-to-br from-[#8C0C1D] to-[#5A0612] p-1 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Schools Simplified Logo" 
                  width={46} 
                  height={46} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-[22px] font-bold tracking-[-0.03em]">Schools Simplified</span>
            </Link>
            <p className="mt-6 text-[#5E6168] text-[15px] leading-[2]">
              Empowering Indian parents to discover, compare, and choose the ideal school for their children across IB, IGCSE, ICSE, and CBSE.
            </p>
          </div>

          {/* BOARDS & CURRICULA */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Curricula & Boards
            </div>
            <div className="space-y-4">
              {[
                { label: "IB World Schools", href: "/schools?board=IB" },
                { label: "Cambridge IGCSE Schools", href: "/schools?board=IGCSE" },
                { label: "Top ICSE / ISC Schools", href: "/schools?board=ICSE" },
                { label: "Premier CBSE Institutions", href: "/schools?board=CBSE" },
                { label: "Complete Curriculum Guide", href: "/curriculum-guide" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* TOP SCHOOL HUBS */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Leading Hubs
            </div>
            <div className="space-y-4">
              {[
                { label: "Best Schools in Mumbai", href: "/schools?city=Mumbai" },
                { label: "Best Schools in Bengaluru", href: "/schools?city=Bengaluru" },
                { label: "Top Schools in Delhi NCR", href: "/schools?city=Gurugram" },
                { label: "Dehradun Boarding Schools", href: "/schools?city=Dehradun" },
                { label: "Top Residential Schools", href: "/schools?type=Boarding" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* PLATFORM TOOLS */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Parent Resources
            </div>
            <div className="space-y-4">
              {[
                { label: "AI School Matcher Assessment", href: "/match" },
                { label: "Side-by-Side School Comparison", href: "/compare" },
                { label: "Admissions Timeline 2026-27", href: "/schools" },
                { label: "Fee & Facilities Calculator", href: "/compare" },
                { label: "Advisory: support@schoolssimplified.in", href: "mailto:support@schoolssimplified.in", isMail: true },
              ].map((item) => (
                item.isMail ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/5 mt-16 md:mt-20 mb-6" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#5E6168] text-[14px] text-center md:text-left">
            © 2026 Schools Simplified. Followed the Abroad Simplified design system. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#5E6168] text-[14px]">
            <Link href="/curriculum-guide" className="hover:text-white transition cursor-pointer">
              Board Comparison
            </Link>
            <Link href="/compare" className="hover:text-white transition cursor-pointer">
              Compare Tool
            </Link>
            <Link href="/match" className="hover:text-white transition cursor-pointer">
              Find Ideal School
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
