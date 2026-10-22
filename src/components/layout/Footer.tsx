import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#080F1C] px-4 sm:px-6 md:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-20 pb-8 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-14">
          {/* BRAND */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 max-w-[320px]">
            <Link href="/" className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity">
              <div className="w-[48px] h-[48px] rounded-[14px] overflow-hidden shadow-[0_6px_20px_rgba(37,99,235,0.3)] shrink-0 bg-white p-1 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="CLARVO Logo" 
                  width={48} 
                  height={48} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-[22px] font-bold tracking-[-0.03em]">CLARVO</span>
            </Link>
            <p className="mt-6 text-[#667085] text-[15px] leading-[2]">
              Empowering Indian parents to discover, compare, and choose the ideal school for their children across IB, IGCSE, ICSE, and CBSE.
            </p>
          </div>

          {/* BOARDS & CURRICULA */}
          <div>
            <div className="text-[#93C5FD] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
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
                  className="block text-[#667085] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* TOP SCHOOL HUBS */}
          <div>
            <div className="text-[#93C5FD] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
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
                  className="block text-[#667085] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* PLATFORM TOOLS */}
          <div>
            <div className="text-[#93C5FD] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Parent Resources
            </div>
            <div className="space-y-4">
              {[
                { label: "AI School Matcher Assessment", href: "/match" },
                { label: "Side-by-Side School Comparison", href: "/compare" },
                { label: "Admissions Timeline 2026-27", href: "/schools" },
                { label: "Fee & Facilities Calculator", href: "/compare" },
                { label: "Advisory: support@clarvo.in", href: "mailto:support@clarvo.in", isMail: true },
              ].map((item) => (
                item.isMail ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-[#667085] text-[15px] hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-[#667085] text-[15px] hover:text-white transition cursor-pointer"
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
          <div className="text-[#667085] text-[14px] text-center md:text-left">
            © 2026 CLARVO. Clarity for Their Future. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#667085] text-[14px]">
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
