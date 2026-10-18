import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function MatcherBanner() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#690B1B] via-[#520815] to-[#2E030B] p-8 sm:p-12 md:p-16 text-white shadow-[0_20px_50px_rgba(105,11,27,0.3)]">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#C9A55D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C9A55D] text-[12px] font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI School Matcher Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Not sure which school or board fits your child’s temperament?
          </h2>

          <p className="mt-4 text-[15px] sm:text-[17px] text-white/85 leading-relaxed max-w-2xl">
            Answer 5 tailored questions about your child’s learning style, target university goals, and family budget. Our intelligent recommendation engine matches you with the top-fit schools in India with instant compatibility scores.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="flex items-center gap-2.5 text-[13px] text-white/90">
              <Compass className="w-4 h-4 text-[#C9A55D] shrink-0" />
              <span>Tailored Board Recommendation</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-white/90">
              <ShieldCheck className="w-4 h-4 text-[#C9A55D] shrink-0" />
              <span>Independent & Unbiased</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-white/90">
              <HeartHandshake className="w-4 h-4 text-[#C9A55D] shrink-0" />
              <span>Takes less than 60 seconds</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/match"
              className="w-full sm:w-auto px-8 h-[52px] rounded-full bg-white text-[#690B1B] text-[15px] font-bold shadow-lg hover:bg-[#F6F4F2] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Start Free School Matcher</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="w-full sm:w-auto px-6 h-[52px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] font-semibold transition-all flex items-center justify-center"
            >
              Side-by-Side School Comparison →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
