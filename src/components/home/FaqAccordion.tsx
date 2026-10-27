'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    q: "IB vs CBSE: Which is better for studying abroad vs Indian competitive exams?",
    a: "If your child is aiming for Ivy League, UK Russell Group, or European universities, the IB Diploma or Cambridge IGCSE provides unmatched critical thinking, research essays, and college credits. If your goal is IIT-JEE, NEET, or CUET, CBSE provides exact 1-to-1 syllabus alignment with national entrance examinations."
  },
  {
    q: "What is the realistic fee breakdown for premier international schools in India?",
    a: "Annual tuition for top-tier day schools (DAIS, Cathedral, TISB, Heritage) ranges from ₹3.5 Lakhs to ₹12.5 Lakhs. Heritage residential boarding schools (The Doon School, Woodstock, Mayo College) range from ₹8.5 Lakhs to ₹21 Lakhs annually, which covers full boarding, dining, equestrian academies, and 24/7 pastoral care."
  },
  {
    q: "At what age or grade should a child be admitted to a boarding school?",
    a: "Premier heritage boarding schools admit boarders primarily from Grade 7 (approx. age 11–12) or Grade 8. Some schools offer admissions from Grade 4 or 5. Child developmental experts advise waiting until at least age 11, when children have built emotional resilience and self-reliance."
  },
  {
    q: "When do admissions open for the 2026-2027 academic session?",
    a: "For high-demand international schools like DAIS, Doon, TISB, and Cathedral, registrations open between July and September of the previous year. Assessments are conducted between October and January. Applications submitted after February are typically evaluated against waitlist availability."
  }
];

export default function FaqAccordion({ items = DEFAULT_FAQ_ITEMS }: { items?: FaqItem[] }) {
  // Mobile accordion state: initially null so all cards are collapsed and compact
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className={`bg-white rounded-xl sm:rounded-[16px] border transition-all duration-200 overflow-hidden shadow-xs ${
              isOpen 
                ? 'border-[#2563EB]/50 shadow-md ring-1 ring-[#2563EB]/10' 
                : 'border-[#E2E8F0] hover:border-[#2563EB]/40'
            }`}
          >
            {/* Header: Clickable button for mobile collapse */}
            <button
              type="button"
              onClick={() => toggleItem(i)}
              className="w-full p-4 sm:p-7 text-left flex items-center justify-between gap-3 cursor-pointer select-none focus:outline-none"
              aria-expanded={isOpen}
            >
              <h3 className="text-[14.5px] sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                {item.q}
              </h3>
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-[#E8F0FF] text-[#2563EB]'
                    : 'bg-[#F1F5F9] text-[#64748B]'
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {/* Answer Content: Collapsible on mobile, open or expandable on desktop */}
            <div
              className={`transition-all duration-300 ease-in-out px-4 sm:px-7 ${
                isOpen
                  ? 'max-h-96 pb-4 sm:pb-7 opacity-100'
                  : 'max-h-0 sm:max-h-96 pb-0 sm:pb-7 opacity-0 sm:opacity-100'
              } overflow-hidden`}
            >
              <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                <p className="text-[#64748B] text-[13px] sm:text-[14px] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
