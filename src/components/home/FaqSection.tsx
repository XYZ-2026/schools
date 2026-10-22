'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I choose between IB, Cambridge (IGCSE), ICSE, and CBSE for my child?',
    answer: 'The ideal board depends on your child\'s learning orientation and long-term goals. If you envision undergraduate education in the US, UK, or Canada, the IB Diploma or Cambridge IGCSE / A-Levels offers unparalleled holistic inquiry and essay-writing skills. If your child is targeting Indian competitive entrances (IIT-JEE, NEET, CUET, NDA), CBSE provides direct syllabus alignment. If you want superior English linguistic mastery and humanities depth, ICSE/ISC is exceptional.'
  },
  {
    question: 'What is the realistic fee breakdown for top international schools in India?',
    answer: 'Annual tuition for premier day schools (DAIS, Cathedral, Heritage Xperiential, TISB) generally ranges from ₹3.5 Lakhs to ₹12.5 Lakhs per year. Historic residential/boarding schools (The Doon School, Woodstock, Mayo College) range from ₹8.5 Lakhs to ₹21 Lakhs per year, which includes boarding, dining, equestrian/sports facilities, and pastoral care. Most schools charge a one-time refundable security deposit and registration fee upon admission.'
  },
  {
    question: 'What age or grade is ideal to enroll a child into a residential boarding school?',
    answer: 'Most heritage residential academies like The Doon School, Welham, and Mayo College admit boarders primarily from Grade 7 (approx. age 11–12) or Grade 8. Some schools offer admissions from Grade 4 or 5. Developmental experts recommend waiting until at least age 11, when children have built adequate emotional resilience and self-care autonomy.'
  },
  {
    question: 'When should parents apply for the 2026-2027 academic session?',
    answer: 'For elite international and boarding schools, applications typically open between July and September of the preceding year (e.g., Autumn 2025 for 2026-27 entry). High-demand schools like DAIS, Doon, and TISB conduct entrance assessments between October and January. Late applications after February usually compete for limited waitlist slots.'
  },
  {
    question: 'Does CLARVO provide direct admission or campus tour booking?',
    answer: 'CLARVO acts as an independent advisory and comparison portal. Through our direct school profile inquiry modals, your verified details are forwarded directly to the school\'s admissions desk to schedule campus tours, receive official prospectus kits, and get assessment dates.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FF] border border-[#93C5FD]/40 text-[#2563EB] text-[12px] font-bold uppercase tracking-wider mb-3">
          Parent Advisory
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#080F1C] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-[15px] text-[#667085] max-w-xl mx-auto">
          Essential answers for parents navigating school selection, board choices, and admissions in India.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#2563EB]/40 shadow-[0_8px_24px_rgba(37,99,235,0.06)]'
                  : 'bg-white/80 border-[#E4E7EC] hover:border-[#2563EB]/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-[15px] sm:text-[16px] text-[#080F1C]"
              >
                <span>{faq.question}</span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#667085]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-[14px] leading-relaxed text-[#344054] border-t border-[#E4E7EC] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
