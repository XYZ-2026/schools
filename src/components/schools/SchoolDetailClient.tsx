'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { School } from '@/types/school';
import { useSchool } from '@/context/SchoolContext';
import { 
  MapPin, 
  Star, 
  Building2, 
  Users, 
  IndianRupee, 
  Calendar, 
  GraduationCap, 
  Award, 
  Globe, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowLeftRight, 
  Bookmark, 
  Sparkles,
  Send,
  X
} from 'lucide-react';

interface SchoolDetailClientProps {
  school: School;
}

export default function SchoolDetailClient({ school }: SchoolDetailClientProps) {
  const { isInCompare, toggleCompare, isInShortlist, toggleShortlist } = useSchool();
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'admissions' | 'facilities' | 'placements'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Form states
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('Grade 1');
  const [inquiryType, setInquiryType] = useState('Campus Tour & Visit');

  const comparing = isInCompare(school.slug);
  const shortlisted = isInShortlist(school.slug);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="w-full pb-20">
      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full bg-stone-900">
        <Image
          src={school.heroImage}
          alt={school.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6 sm:py-8">
          {/* Back button and quick actions */}
          <div className="flex items-center justify-between">
            <Link
              href="/schools"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md text-[13px] font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCompare(school.slug)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold backdrop-blur-md transition-colors cursor-pointer ${
                  comparing ? 'bg-[#690B1B] text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>{comparing ? 'In Comparison' : 'Compare'}</span>
              </button>
              <button
                onClick={() => toggleShortlist(school.slug)}
                className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  shortlisted ? 'bg-[#C9A55D] text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
                title="Save school"
              >
                <Bookmark className="w-4 h-4" fill={shortlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* School identity & headline */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-[#690B1B] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
                National Rank #{school.rank}
              </span>
              <span className="bg-emerald-600 text-white text-[12px] font-semibold px-3 py-1 rounded-full shadow-sm">
                {school.admissionsStatus}
              </span>
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[12px] font-bold">
                <Star className="w-3.5 h-3.5 text-[#C9A55D] fill-[#C9A55D]" />
                <span>{school.rating}</span>
                <span className="text-white/60 font-normal">({school.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {school.name}
            </h1>

            <p className="mt-2 text-[15px] sm:text-[17px] text-white/90 max-w-3xl leading-relaxed">
              {school.tagline}
            </p>

            <div className="mt-4 flex items-center gap-4 text-[13px] sm:text-[14px] text-white/80 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A55D]" />
                {school.city}, {school.state}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#C9A55D]" />
                {school.schoolType} ({school.gender})
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C9A55D]" />
                Established {school.established}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          QUICK STATS STRIP
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-[#E7E2DE] p-4 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="border-r border-[#F0EBE6] last:border-none">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center justify-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-[#C9A55D]" /> Annual Tuition
            </span>
            <div className="text-[16px] sm:text-[18px] font-bold text-[#111] mt-1 truncate">
              {school.feeRangeLabel.split('/')[0]}
            </div>
            <div className="text-[11px] text-[#777] mt-0.5">Academic Session 2026-27</div>
          </div>

          <div className="border-r border-[#F0EBE6] last:border-none">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#690B1B]" /> Student-Teacher
            </span>
            <div className="text-[16px] sm:text-[18px] font-bold text-[#111] mt-1">
              {school.studentTeacherRatio}
            </div>
            <div className="text-[11px] text-[#777] mt-0.5">Individual Attention Ratio</div>
          </div>

          <div className="border-r border-[#F0EBE6] last:border-none">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center justify-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#690B1B]" /> Campus Infrastructure
            </span>
            <div className="text-[16px] sm:text-[18px] font-bold text-[#111] mt-1 truncate">
              {school.campusSize.split(' ')[0]} {school.campusSize.split(' ')[1] || 'Acres'}
            </div>
            <div className="text-[11px] text-[#777] mt-0.5">{school.city} Landmark Campus</div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center justify-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#C9A55D]" /> Boards Offered
            </span>
            <div className="text-[16px] sm:text-[18px] font-bold text-[#690B1B] mt-1">
              {school.boards.join(' • ')}
            </div>
            <div className="text-[11px] text-[#777] mt-0.5">{school.gradeLevels}</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT & INTERACTIVE TABS
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Section: Tabs and Detailed Panes */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs Header */}
            <div className="flex items-center gap-1 sm:gap-2 border-b border-[#E7E2DE] pb-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'academics', label: 'Curriculum & Academics' },
                { id: 'admissions', label: 'Admissions & Fees' },
                { id: 'facilities', label: 'Facilities & Campus' },
                { id: 'placements', label: 'College Placements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-[14px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#690B1B] text-white shadow-xs'
                      : 'text-[#666] hover:bg-[#F6F4F2] hover:text-[#111]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-3">About {school.name}</h3>
                  <p className="text-[15px] text-[#555] leading-relaxed">
                    {school.description}
                  </p>
                </div>

                {/* Accolade Badges */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#888] uppercase tracking-wider mb-2.5">
                    Recognitions & Accreditations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {school.badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-[#FAF0F2] text-[#690B1B] border border-[#F0D5DA] text-[13px] font-semibold flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-[#C9A55D]" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#888] uppercase tracking-wider mb-3">
                    Campus Visual Tour
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {school.galleryImages.map((img, i) => (
                      <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-[#E7E2DE]">
                        <Image
                          src={img}
                          alt={`${school.name} gallery ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Academics */}
            {activeTab === 'academics' && (
              <div className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-2">Curriculum Pathways</h3>
                  <p className="text-[14.5px] text-[#555] mb-4">
                    Pedagogical structure across primary, middle, and senior secondary grades:
                  </p>
                  <div className="space-y-2.5">
                    {school.curriculumHighlights.map((curr, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EFE9E4]">
                        <CheckCircle2 className="w-4 h-4 text-[#690B1B] shrink-0 mt-0.5" />
                        <span className="text-[14px] text-[#333] font-medium">{curr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-3">Academic Milestones</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {school.academicAchievements.map((ach, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#E7E2DE] bg-white">
                        <div className="text-[15px] font-bold text-[#690B1B] mb-1">{ach.title}</div>
                        <div className="text-[13px] text-[#666] leading-relaxed">{ach.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Admissions */}
            {activeTab === 'admissions' && (
              <div className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-3">Admissions & Tuition Fee Schedule</h3>
                  <div className="bg-[#FAF8F5] border border-[#E8E1DA] rounded-xl p-4 sm:p-5 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[12px] uppercase tracking-wider text-[#888] font-bold">Annual Tuition Bracket</div>
                        <div className="text-[22px] font-extrabold text-[#690B1B] mt-0.5">{school.feeRangeLabel}</div>
                      </div>
                      <div>
                        <div className="text-[12px] uppercase tracking-wider text-[#888] font-bold">Current Cycle Status</div>
                        <div className="inline-block mt-1 px-3 py-1 rounded-md bg-emerald-600 text-white text-[12px] font-bold">
                          {school.admissionsStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Tuition fees cover academic instruction, laboratory subscriptions, library materials, and physical education. Additional fees may apply for uniform, transport (day scholars), meal plans, and international examination fees (IB/Cambridge).
                  </p>
                </div>

                <div>
                  <h4 className="text-[16px] font-bold text-[#111] mb-2.5">Admission Procedure Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-[14px] text-[#555]">
                    <li>Submit online registration form along with previous 2 years academic report cards.</li>
                    <li>Shortlisted candidates attend interactive assessment / aptitude interaction.</li>
                    <li>Parent interaction with Senior Leadership Team.</li>
                    <li>Offer letter dispatched with verification of birth certificate and transfer certificates.</li>
                  </ol>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[14px] font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official Prospectus & Tour</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: Facilities */}
            {activeTab === 'facilities' && (
              <div className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-2">Campus Infrastructure & Facilities</h3>
                  <p className="text-[14.5px] text-[#555] mb-4">
                    World-class amenities designed for holistic physical, scientific, and creative development:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {school.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9E4] text-[13.5px] text-[#333]">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A55D] shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Placements */}
            {activeTab === 'placements' && (
              <div className="bg-white rounded-2xl border border-[#E7E2DE] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111] mb-2">University Placements & Matriculation</h3>
                  <p className="text-[14.5px] text-[#555] mb-4">
                    Where graduates from {school.name} attend higher education:
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[13px] font-bold text-[#888] uppercase tracking-wider mb-2">
                      Premier Global Universities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {school.collegePlacements.topUniversities.map((uni, idx) => (
                        <span key={idx} className="px-3.5 py-1.5 rounded-full bg-[#FAF0F2] text-[#690B1B] border border-[#F0D5DA] font-bold text-[13px]">
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[#E7E2DE] bg-[#FAF8F5]">
                      <div className="text-[13px] font-bold uppercase tracking-wider text-[#888] mb-1">Domestic Track Record</div>
                      <div className="text-[14px] text-[#333] font-medium">{school.collegePlacements.domesticHighlights}</div>
                    </div>
                    <div className="p-4 rounded-xl border border-[#E7E2DE] bg-[#FAF8F5]">
                      <div className="text-[13px] font-bold uppercase tracking-wider text-[#888] mb-1">Scholarship Grants</div>
                      <div className="text-[14px] text-[#333] font-medium">{school.collegePlacements.internationalHighlights}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry Card & Official Contact */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl border border-[#E7E2DE] p-5 sm:p-6 shadow-sm">
              <div className="text-[13px] font-bold text-[#690B1B] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-[#C9A55D]" />
                Official Admissions Desk
              </div>
              <h3 className="text-[18px] font-bold text-[#111] mb-2">
                Inquire & Schedule Campus Tour
              </h3>
              <p className="text-[13px] text-[#666] mb-5 leading-relaxed">
                Connect with the official admissions office for prospectus packages, school visits, and assessment slots.
              </p>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[14px] font-bold shadow-[0_8px_20px_rgba(105,11,27,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2 mb-3"
              >
                <span>Book Campus Tour</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleCompare(school.slug)}
                className={`w-full py-3 rounded-full text-[13px] font-bold border transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  comparing
                    ? 'bg-[#F7F0F1] border-[#690B1B] text-[#690B1B]'
                    : 'border-[#E7E2DE] text-[#444] hover:border-[#690B1B]/40'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>{comparing ? 'Added to Comparison' : 'Compare with Other Schools'}</span>
              </button>
            </div>

            {/* Official Contact Info Card */}
            <div className="bg-white rounded-2xl border border-[#E7E2DE] p-5 sm:p-6 shadow-sm space-y-4">
              <h4 className="text-[15px] font-bold text-[#111]">School Details & Location</h4>
              
              <div className="flex items-start gap-3 text-[13px] text-[#555]">
                <MapPin className="w-4 h-4 text-[#690B1B] shrink-0 mt-0.5" />
                <span>{school.contact.address}</span>
              </div>

              <div className="flex items-center gap-3 text-[13px] text-[#555]">
                <Phone className="w-4 h-4 text-[#690B1B] shrink-0" />
                <a href={`tel:${school.contact.phone}`} className="hover:text-[#690B1B] font-medium">
                  {school.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-[13px] text-[#555]">
                <Mail className="w-4 h-4 text-[#690B1B] shrink-0" />
                <a href={`mailto:${school.contact.email}`} className="hover:text-[#690B1B] font-medium">
                  {school.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-[13px] text-[#555] pt-2 border-t border-[#F0EBE6]">
                <Globe className="w-4 h-4 text-[#690B1B] shrink-0" />
                <a
                  href={school.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#690B1B] font-bold hover:underline"
                >
                  Visit Official Website →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          INTERACTIVE INQUIRY MODAL
          ═══════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#E7E2DE] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F6F4F2] hover:bg-black/10 flex items-center justify-center text-[#666]"
            >
              <X className="w-4 h-4" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111]">Inquiry Received!</h3>
                <p className="text-[14px] text-[#666] max-w-sm mx-auto">
                  Thank you, {parentName || 'Parent'}. Your request for <strong>{school.name}</strong> ({inquiryType}) has been logged. The admissions desk will contact you via email ({email}).
                </p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#690B1B] text-white text-[13px] font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#690B1B]">
                    Admissions Form
                  </div>
                  <h3 className="text-[20px] font-bold text-[#111]">
                    Inquire for {school.name}
                  </h3>
                  <p className="text-[13px] text-[#666]">
                    Complete the details to schedule a campus walkthrough or receive the 2026-27 brochure.
                  </p>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#333] mb-1">Parent / Guardian Full Name</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-3.5 py-2.5 rounded-xl text-[13.5px] focus:outline-none focus:border-[#690B1B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-[#333] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-3.5 py-2.5 rounded-xl text-[13.5px] focus:outline-none focus:border-[#690B1B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#333] mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-3.5 py-2.5 rounded-xl text-[13.5px] focus:outline-none focus:border-[#690B1B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-[#333] mb-1">Child's Target Grade</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-3 py-2.5 rounded-xl text-[13.5px] focus:outline-none cursor-pointer"
                    >
                      <option>Nursery / Kindergarten</option>
                      <option>Grade 1 - 5 (Primary)</option>
                      <option>Grade 6 - 8 (Middle)</option>
                      <option>Grade 9 - 10 (IGCSE/ICSE/CBSE)</option>
                      <option>Grade 11 - 12 (IB DP / ISC)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#333] mb-1">Inquiry Purpose</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#F6F4F2] border border-[#E7E1DD] px-3 py-2.5 rounded-xl text-[13.5px] focus:outline-none cursor-pointer"
                    >
                      <option>Campus Tour & Visit</option>
                      <option>Fee Structure & Prospectus</option>
                      <option>Admission Assessment Dates</option>
                      <option>Boarding House Inquiries</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#690B1B] hover:bg-[#7A1022] text-white text-[14px] font-bold shadow-md transition-colors cursor-pointer mt-2"
                >
                  Confirm & Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
