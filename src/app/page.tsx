import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedSchoolsShowcase from '@/components/home/FeaturedSchoolsShowcase';
import { 
  Compass, 
  BookOpen, 
  ArrowLeftRight, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Users, 
  IndianRupee, 
  MapPin, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake,
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-[#F6F4F2] text-[#111111] overflow-x-hidden font-[Poppins] font-normal min-h-screen flex flex-col">
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — Split 2-Column (Exact Abroad Simplified style)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 lg:gap-20 items-center">
        {/* LEFT COLUMN */}
        <div className="max-w-[540px] w-full">
          <div className="flex items-center gap-2.5 text-[#C4A15F] text-[11px] tracking-[0.18em] uppercase font-bold mb-6">
            <span className="w-[5px] h-[5px] rounded-full bg-[#C4A15F]" />
            AI-POWERED SCHOOL ADMISSIONS • IB • IGCSE • ICSE • CBSE
          </div>

          <h1 className="text-[32px] xs:text-[38px] sm:text-[46px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.05em] font-bold text-[#0D0D0D] break-words">
            Find Your Child’s
            <br />
            <span className="text-[#690B1B]">
              Dream School.
            </span>
            <br />
            Build Their Legacy.
          </h1>

          <p className="mt-5 sm:mt-7 text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#727272] max-w-[500px]">
            Real verified fee structures, student-to-teacher ratios, board comparison (IB, Cambridge IGCSE, ICSE, CBSE), and holistic admissions guidance. Everything parents need to choose with absolute confidence.
          </p>

          {/* DUAL ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 w-full">
            <Link
              href="/match"
              className="h-[52px] sm:h-[54px] px-7 rounded-[10px] bg-[#690B1B] text-white text-[15px] font-bold inline-flex items-center justify-center shadow-[0_10px_30px_rgba(105,11,27,0.22)] hover:bg-[#7A1022] hover:scale-[1.01] transition-all w-full sm:w-auto text-center cursor-pointer"
            >
              Match My Child Free →
            </Link>
            <Link
              href="/schools"
              className="h-[52px] sm:h-[54px] px-7 rounded-[10px] border border-[#690B1B]/20 text-[#690B1B] text-[15px] font-semibold inline-flex items-center justify-center hover:bg-[#690B1B]/5 transition-all w-full sm:w-auto text-center cursor-pointer"
            >
              Explore Top Schools
            </Link>
          </div>

          {/* STATS UNDER HERO */}
          <div className="flex flex-row flex-wrap gap-4 sm:gap-7 border-t border-[#E8E8E8] pt-5 sm:pt-7 mt-8 sm:mt-10 text-[12px] sm:text-[13px] text-[#8B8B8B]">
            <div>
              <strong className="text-[#111] font-bold text-[14px] sm:text-[15px]">
                10,000+
              </strong>{" "}
              parents guided
            </div>
            <div>
              <strong className="text-[#111] font-bold text-[14px] sm:text-[15px]">
                100+
              </strong>{" "}
              premier schools
            </div>
            <div>
              <strong className="text-[#111] font-bold text-[14px] sm:text-[15px]">
                98%
              </strong>{" "}
              admission fit rate
            </div>
          </div>
        </div>

        {/* RIGHT CARD — Interactive School Fit Evaluator Demo */}
        <div className="w-full max-w-[500px] bg-white border border-[#EBEBEB] rounded-[18px] overflow-hidden shadow-sm mx-auto lg:mx-0 lg:justify-self-end">
          {/* Card Top Title Bar */}
          <div className="h-12 sm:h-14 border-b border-[#EFEFEF] flex items-center gap-3 sm:gap-4 px-4 sm:px-5">
            <div className="flex gap-[7px] shrink-0">
              <span className="w-[9px] h-[9px] rounded-full bg-[#DDDDDD]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#DDDDDD]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#DDDDDD]" />
            </div>
            <div className="text-[11px] sm:text-[13px] text-[#B2B2B2] font-medium truncate">
              AI School Fit Evaluator — app.schoolssimplified.in
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="inline-flex px-3 py-1.5 rounded-[7px] bg-[#F7F0F1] text-[#690B1B] text-[10px] font-bold tracking-[0.12em] uppercase">
              TARGET: DHIRUBHAI AMBANI &amp; TISB BANGALORE
            </div>

            <h3 className="mt-5 text-[18px] leading-[1.45] text-[#111] font-bold">
              International Baccalaureate (IB DP) · Global University Track
            </h3>

            <div className="mt-4 flex flex-wrap justify-between text-[12px] sm:text-[13px] text-[#B0B0B0] gap-2">
              <span>Session 2026-27 · Verified Criteria</span>
              <span className="text-[#C4A15F] font-bold">Match Compatibility: 96%</span>
            </div>

            <div className="w-full h-px bg-[#EEEEEE] my-4 sm:my-6" />

            {[
              { title: "Academic Rigor & Inquiry", width: "96%" },
              { title: "Individual Faculty Attention (8:1)", width: "94%" },
              { title: "Olympic Sports & Robotics", width: "91%" },
              { title: "Ivy League & Oxbridge Placement", width: "98%" },
            ].map((metric) => (
              <div
                key={metric.title}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[160px_1fr_36px] items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-[12px] sm:text-[13px] text-[#717171]"
              >
                <span className="font-medium text-[#444] col-span-1 sm:col-span-1 truncate">{metric.title}</span>
                <div className="hidden sm:block w-full h-[6px] bg-[#ECECEC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#690B1B] rounded-full"
                    style={{ width: metric.width }}
                  />
                </div>
                <span className="font-bold text-[#111] text-right">{metric.width}</span>
                <div className="col-span-2 sm:hidden w-full h-[5px] bg-[#ECECEC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#690B1B] rounded-full"
                    style={{ width: metric.width }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t border-[#F0EBE6] flex items-center justify-between">
              <span className="text-[12px] text-[#888]">100% Parent Advisory Privacy</span>
              <Link
                href="/match"
                className="text-[13px] font-bold text-[#690B1B] hover:underline flex items-center gap-1"
              >
                <span>Evaluate Your Child</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. STATS BAR — Dark banner (Exact Abroad Simplified style)
          ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#111217]">
        <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {[
            { num: "100+", text: "PREMIER SCHOOLS IN INDIA", gold: true },
            { num: "4", text: "RECOGNIZED CURRICULA DECODED", gold: false },
            { num: "8:1", text: "AVERAGE STUDENT-TEACHER RATIO", gold: true },
            { num: "100%", text: "VERIFIED ADMISSION DATA", gold: false },
          ].map((item) => (
            <div
              key={item.text}
              className="h-[120px] sm:h-[145px] border-r border-b lg:border-b-0 border-white/5 flex flex-col items-center justify-center p-3 sm:p-4 text-center"
            >
              <span
                className={`text-[30px] sm:text-[38px] md:text-[44px] font-bold leading-none ${
                  item.gold ? "text-[#C9A55D]" : "text-white"
                }`}
              >
                {item.num}
              </span>
              <p className="mt-2 sm:mt-3 text-[#6E7380] text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] font-semibold text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. THE ADMISSIONS JOURNEY — 5-Step Milestone Process
          ═══════════════════════════════════════════════════════════ */}
      <section id="journey" className="bg-[#F7F5F3] px-4 sm:px-5 md:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="text-[#C9A55D] text-[12px] tracking-[0.22em] font-bold uppercase mb-4">
          THE SCHOOL ADMISSIONS JOURNEY
        </div>
        <h2 className="text-[28px] sm:text-[36px] md:text-[50px] font-bold tracking-[-0.04em] text-[#090909] px-2">
          From target shortlist to acceptance letter
        </h2>

        <div className="max-w-7xl mx-auto mt-10 sm:mt-14 relative">
          <div className="hidden lg:block absolute top-5 left-[9%] w-[82%] h-px bg-[#EAD9DD]" />

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 relative z-10">
            {[
              { num: "01", title: "Board Selection", desc: "Compare IB vs Cambridge IGCSE vs ICSE vs CBSE", active: true },
              { num: "02", title: "Discovery & Filter", desc: "Day vs boarding, metro cities, fees & ratios", active: false },
              { num: "03", title: "AI Child Matcher", desc: "Aptitude alignment & learning style test", active: false },
              { num: "04", title: "Campus Tour", desc: "Schedule walkthroughs & leadership meets", active: false },
              { num: "05", title: "Admissions Offer", desc: "Assessment interaction & formal enrollment", active: false },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center w-[calc(50%-12px)] sm:w-[calc(33.333%-27px)] lg:w-[170px]">
                <div
                  className={`w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full flex items-center justify-center text-[15px] sm:text-[16px] font-bold ${
                    step.active
                      ? "bg-[#690B1B] text-white shadow-sm"
                      : "border border-[#D9BFC5] text-[#690B1B] bg-white"
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] font-bold text-[#111]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] sm:text-[13.5px] text-[#888888] max-w-[170px] text-center leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. TOP SCHOOL HUBS ACROSS INDIA — Grid of Regional Capitals
          ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-mt-24 px-4 sm:px-5 md:px-8 py-12 sm:py-16 lg:py-20 bg-[#F6F4F2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <div>
              <div className="text-[#C9A55D] text-[12px] tracking-[0.2em] font-bold uppercase mb-3">
                PAN-INDIA REACH
              </div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-bold tracking-[-0.04em] text-[#111]">
                Top School Hubs Across India
              </h2>
            </div>
            <Link
              href="/schools"
              className="px-5 py-2.5 rounded-full bg-[#690B1B] text-white text-[13px] font-bold hover:bg-[#7A1022] transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All Cities</span>
              <span>→</span>
            </Link>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#727272] max-w-[600px]">
            Discover leading institutions by city, verified annual tuition, boarding campuses, and board affiliations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-12">
            {[
              { code: "MUM", name: "Mumbai", count: "15+ Top Schools", desc: "DAIS, Cathedral, Bombay Scottish & Oberoi", city: "Mumbai" },
              { code: "BLR", name: "Bengaluru", count: "18+ Top Schools", desc: "TISB, Greenwood High, Indus International & Mallya Aditi", city: "Bengaluru" },
              { code: "DEL", name: "Delhi NCR / Gurugram", count: "25+ Top Schools", desc: "Heritage Xperiential, Step by Step, DPS RKP & Pathways", city: "Gurugram" },
              { code: "DDN", name: "Dehradun", count: "12+ Boarding Academies", desc: "The Doon School, Welham Girls, Welham Boys & Kasiga", city: "Dehradun" },
              { code: "MSO", name: "Mussoorie", count: "8+ Mountain Campuses", desc: "Woodstock School & St. George's College in the Himalayas", city: "Mussoorie" },
              { code: "HYD", name: "Hyderabad", count: "14+ Top Schools", desc: "Oakridge Gachibowli, Chirec & Hyderabad Public School", city: "Hyderabad" },
              { code: "AJM", name: "Ajmer & Rajasthan", count: "10+ Heritage Boarding", desc: "Mayo College, Mayo Girls & Scindia School", city: "Ajmer" },
              { code: "PUN", name: "Pune & Sahyadris", count: "9+ Global Campuses", desc: "UWC Mahindra College & Sahyadri Krishnamurti School", city: "Pune" },
            ].map((item) => (
              <Link
                key={item.code}
                href={`/schools?city=${item.city}`}
                className="group bg-white border border-[#E7E2DE] rounded-[16px] p-5 sm:p-6 hover:border-[#690B1B] hover:-translate-y-1 transition-all shadow-xs hover:shadow-md flex flex-col justify-between h-full min-h-[220px] cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-bold text-[#690B1B] bg-[#F7F0F1] px-2.5 py-1 rounded-full uppercase border border-[#E8C4CC]/50">
                      {item.code}
                    </span>
                    <span className="text-[11px] font-semibold text-[#888]">
                      Admissions 2026-27
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#111] mb-1 leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-[12.5px] font-bold text-[#690B1B] mb-2">
                    {item.count}
                  </div>
                  <p className="text-[12.5px] text-[#777777] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F5F2EF] flex items-center gap-1 text-[12px] font-semibold text-[#690B1B] group-hover:translate-x-0.5 transition-transform">
                  View Schools in {item.name} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. PLATFORM FEATURES — 6 Essential Parent Decision Tools
          ═══════════════════════════════════════════════════════════ */}
      <section id="features" className="scroll-mt-24 px-4 sm:px-5 md:px-8 py-12 sm:py-16 lg:py-20 bg-[#F7F5F3]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8 border-b border-[#E7E1DD] pb-10">
          <div>
            <div className="text-[#C9A55D] text-[12px] tracking-[0.2em] font-bold uppercase mb-4">
              PLATFORM FEATURES
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[50px] leading-[1.08] font-bold tracking-[-0.05em] text-[#111]">
              Everything you need
              <br />
              to choose the best school
            </h2>
          </div>
          <div className="max-w-full lg:max-w-[340px] text-left lg:text-right text-[#909090] text-[14px] sm:text-[15px] leading-7 pt-0 sm:pt-3">
            From board selection to campus tour confirmations — all research tools unified in one elegant parent dashboard.
          </div>
        </div>

        {/* Features 6-Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-10">
          {[
            {
              icon: BookOpen,
              title: "Curriculum Comparison Guide",
              desc: "Deep comparative breakdowns of IB DP, Cambridge IGCSE, ICSE, and CBSE syllabi, exam rigor, and college readiness.",
              link: "/curriculum-guide",
              linkText: "Read Curriculum Guide"
            },
            {
              icon: Sparkles,
              title: "AI Child Matcher Assessment",
              desc: "60-second interactive questionnaire evaluating your child's learning temperament, budget, and future career pathway.",
              link: "/match",
              linkText: "Take Matcher Quiz"
            },
            {
              icon: ArrowLeftRight,
              title: "Side-by-Side School Comparison",
              desc: "Compare up to 4 schools across tuition brackets, student-teacher ratios, sports amenities, and board pass rates.",
              link: "/compare",
              linkText: "Launch Compare Tool"
            },
            {
              icon: IndianRupee,
              title: "Verified Fee Transparency",
              desc: "Authentic annual tuition schedules, boarding costs, and admission registration fees without hidden surprises.",
              link: "/schools",
              linkText: "View Fee Structures"
            },
            {
              icon: Award,
              title: "Ivy League & College Placements",
              desc: "Verified matriculation data for Stanford, Harvard, Oxford, Cambridge, IITs, and Ashoka University.",
              link: "/schools",
              linkText: "Check Placements"
            },
            {
              icon: Building2,
              title: "Direct Campus Tour Inquiries",
              desc: "Connect directly with official school admissions desks to schedule private walkthroughs and obtain brochures.",
              link: "/schools",
              linkText: "Book School Visits"
            },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-7 shadow-xs hover:border-[#690B1B]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0F2] text-[#690B1B] border border-[#F0D5DA] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#111] mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[13.5px] text-[#666] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0EBE6]">
                  <Link
                    href={feat.link}
                    className="text-[13px] font-bold text-[#690B1B] hover:underline flex items-center gap-1.5"
                  >
                    <span>{feat.linkText}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. CURATED BEST SCHOOLS SHOWCASE (Interactive Tabs)
          ═══════════════════════════════════════════════════════════ */}
      <FeaturedSchoolsShowcase />

      {/* ═══════════════════════════════════════════════════════════
          7. DARK SECTION — AI School Advisor Interactive Showcase
          ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-mt-24 w-full bg-[#050505] px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-24 lg:py-28 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="max-w-[540px]">
            <div className="text-[#C9A55D] text-[12px] tracking-[0.22em] uppercase font-bold mb-6">
              AI SCHOOL ADMISSIONS ADVISOR
            </div>

            <h2 className="text-white text-[30px] sm:text-[42px] md:text-[56px] leading-[1.05] tracking-[-0.05em] font-bold">
              Personalized guidance
              <br />
              grounded in real
              <br />
              student outcomes
            </h2>

            <p className="mt-8 text-[#8A8A8A] text-[16px] md:text-[17px] leading-[2.1] max-w-[500px]">
              Ask anything from comparing IB Diploma vs Cambridge IGCSE to choosing between day vs boarding campuses. Our advisory engine provides honest, data-backed recommendations tailored to your child.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-8 sm:mt-10">
              {["Board Rigor Analysis", "Fee Transparency Check", "Day vs Boarding Fit", "Admission Assessment Prep"].map((tag) => (
                <div
                  key={tag}
                  className="h-[38px] sm:h-[42px] px-3 sm:px-5 rounded-[10px] border border-white/10 bg-[#0B0B0B] text-[#BEBEBE] text-[13px] sm:text-[14px] flex items-center"
                >
                  {tag}
                </div>
              ))}
            </div>

            <Link
              href="/match"
              className="mt-8 sm:mt-12 h-[50px] sm:h-[56px] px-6 sm:px-8 rounded-[14px] bg-[#690B1B] text-white text-[14px] sm:text-[16px] font-bold hover:bg-[#7A1022] transition-all inline-flex items-center justify-center shadow-[0_10px_25px_rgba(105,11,27,0.3)] w-full sm:w-auto text-center cursor-pointer"
            >
              Try School Matcher Assessment Free →
            </Link>
          </div>

          {/* RIGHT — Dark Chat Widget Simulation */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[460px] rounded-[18px] border border-white/10 bg-[#111114] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)] min-w-0">
              <div className="h-[70px] border-b border-white/10 px-6 flex items-center gap-3">
                <div className="w-[8px] h-[8px] rounded-full bg-[#C9A55D]" />
                <div className="text-[#8B7B63] tracking-[0.08em] text-[13px] font-bold uppercase">
                  Schools Simplified AI Advisor
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* User Message */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#3A2D18] text-[#D7B16A] text-[12px] flex items-center justify-center shrink-0 font-bold">
                    PA
                  </div>
                  <div className="bg-[#1B1D25] rounded-[14px] px-4 sm:px-5 py-4 max-w-[280px] sm:max-w-[320px] text-[#D8D8D8] text-[13px] sm:text-[14px] leading-[1.8]">
                    My child is entering Grade 9 and loves debate and robotics. We want Ivy League university options. Should we pick DAIS or TISB?
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#4A111A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C9A55D]" />
                  </div>
                  <div className="bg-[#2A1116] rounded-[14px] px-5 py-5 max-w-[320px]">
                    <div className="text-[#B58C8F] text-[14px] leading-[1.8] mb-3">
                      Based on verified 2026 admissions and college placement metrics:
                    </div>
                    <div className="border-l-2 border-[#C9A55D] pl-4 space-y-2.5 text-[#F0ECE8] text-[13.5px] leading-[1.8]">
                      <div>
                        <strong className="text-white">DAIS Mumbai:</strong> World-leading 39.8 IB average, premier MUN/debate society, Day School.
                      </div>
                      <div>
                        <strong className="text-white">TISB Bangalore:</strong> 140-acre campus, premier FIRST Robotics labs, Day &amp; Boarding options.
                      </div>
                      <div className="text-[12.5px] text-[#C4A15F] font-semibold pt-1">
                        💡 Verdict: Choose DAIS for urban day-scholar humanities/debate; choose TISB for immersive STEM robotics and boarding independence.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-white/10 p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#111114]">
                <input
                  type="text"
                  placeholder="Ask about boarding vs day, IB vs CBSE..."
                  className="flex-1 h-[44px] sm:h-[48px] rounded-[12px] bg-[#1B1B1B] border border-white/10 px-3 sm:px-4 text-[13px] sm:text-[14px] text-white outline-none placeholder:text-[#6D6D6D] min-w-0"
                  readOnly
                  aria-label="AI Advisor chat input (demo)"
                />
                <Link
                  href="/match"
                  className="h-[44px] sm:h-[48px] px-4 sm:px-5 rounded-[12px] bg-[#690B1B] text-white text-[13px] sm:text-[14px] font-bold hover:bg-[#7A1022] transition-all shrink-0 flex items-center"
                >
                  Ask
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. FAQ SECTION — 2-Column Card Grid (Abroad Simplified style)
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="my-14 sm:my-20 max-w-7xl mx-auto px-4 sm:px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[#C9A55D] text-[12px] tracking-[0.22em] font-bold uppercase mb-3">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-[26px] sm:text-[34px] md:text-[46px] font-bold text-[#111] tracking-[-0.03em]">
            Everything Parents Need to Know About School Admissions
          </h2>
          <p className="mt-3 text-[#727272] text-[15px] max-w-xl mx-auto">
            Got questions about board differences, residential boarding, or admission timelines? We have answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
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
          ].map((item, i) => (
            <div key={i} className="p-7 bg-white rounded-[16px] border border-[#E7E2DE] shadow-sm hover:border-[#690B1B]/40 transition-all">
              <h3 className="text-[17px] font-bold text-[#111] mb-3">
                {item.q}
              </h3>
              <p className="text-[#666666] text-[14px] leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. GRAND CTA BANNER — Burgundy Banner (Exact Abroad style)
          ═══════════════════════════════════════════════════════════ */}
      <section className="w-full overflow-hidden mt-auto">
        <div className="bg-[#73061C] px-4 sm:px-6 md:px-10 py-14 sm:py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white font-bold tracking-[-0.05em] leading-[1.02]">
              <span className="block text-[32px] sm:text-[46px] md:text-[64px]">
                Start building your child’s
              </span>
              <span className="block mt-2 sm:mt-3 text-[#C8A15D] italic text-[32px] sm:text-[46px] md:text-[64px] leading-tight">
                educational legacy
              </span>
              <span className="block mt-1 text-white text-[32px] sm:text-[46px] md:text-[64px] leading-tight">
                today
              </span>
            </h2>

            <p className="mt-6 sm:mt-8 text-[#D6AEB7] text-[14px] sm:text-[15px] md:text-[18px] leading-[1.9] sm:leading-[2.1] max-w-[760px] mx-auto px-2">
              Join 10,000+ ambitious families already discovering premier schools, comparing fee structures, and securing admissions across India.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/match"
                className="w-full sm:w-auto h-[54px] sm:h-[58px] px-8 sm:px-10 rounded-[14px] bg-white text-[#5B0819] text-[15px] sm:text-[17px] font-bold hover:scale-[1.02] transition-all inline-flex items-center justify-center shadow-lg cursor-pointer"
              >
                Begin Your School Discovery Journey →
              </Link>
              <Link
                href="/schools"
                className="w-full sm:w-auto h-[54px] sm:h-[58px] px-8 sm:px-10 rounded-[14px] bg-black/20 hover:bg-black/30 border border-white/20 text-white text-[15px] font-semibold transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Browse Schools Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
