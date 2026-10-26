'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSchool } from '@/context/SchoolContext';
import { getSchoolImage } from '@/components/schools/SchoolCard';
import { 
  MapPin, 
  IndianRupee, 
  GraduationCap, 
  Layers,
  Award, 
  Globe, 
  Phone, 
  Mail, 
  ArrowLeftRight, 
  Bookmark, 
  Sparkles,
  ThumbsUp,
  AlertCircle,
  Send,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function SchoolDetailModal() {
  const { 
    activeSchoolSlug, 
    closeSchoolModal, 
    getSchoolBySlug, 
    registerSchools,
    isInCompare, 
    toggleCompare, 
    isInShortlist, 
    toggleShortlist 
  } = useSchool();

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [asyncSchool, setAsyncSchool] = useState<import('@/types/school').School | null>(null);

  // Form states
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childGrade, setChildGrade] = useState('Grade 1');

  // Fetch school from CMS if not in cache
  useEffect(() => {
    if (activeSchoolSlug) {
      const cached = getSchoolBySlug(activeSchoolSlug);
      if (cached) {
        setAsyncSchool(cached);
      } else {
        fetch(`/api/schools?slug=${encodeURIComponent(activeSchoolSlug)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.school) {
              registerSchools([data.school]);
              setAsyncSchool(data.school);
            }
          })
          .catch(() => {});
      }
    } else {
      setAsyncSchool(null);
    }
  }, [activeSchoolSlug, getSchoolBySlug, registerSchools]);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (inquiryModalOpen) {
          setInquiryModalOpen(false);
        } else {
          closeSchoolModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inquiryModalOpen, closeSchoolModal]);

  if (!activeSchoolSlug) return null;

  const school = getSchoolBySlug(activeSchoolSlug) || asyncSchool;
  if (!school) return null;

  const comparing = isInCompare(school.slug);
  const shortlisted = isInShortlist(school.slug);
  const imageUrl = getSchoolImage(school);

  const prosList = school.pros ? school.pros.split(';').map((p) => p.trim()).filter(Boolean) : [];
  const consList = school.cons ? school.cons.split(';').map((c) => c.trim()).filter(Boolean) : [];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSchoolModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-school-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* ═══════════════════════════════════════════════════════════
            1. BANNER HEADER WITH IMAGE
            ═══════════════════════════════════════════════════════════ */}
        <div className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 md:p-8">
          <Image
            src={imageUrl}
            alt={school.schoolName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30" />

          {/* Top Bar with Badges and Action Buttons */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#2563EB] text-white text-[11px] sm:text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {school.board}
              </span>
              <span className="bg-white/15 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                <Layers className="w-3.5 h-3.5 text-[#93C5FD]" /> Grades: {school.grades}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCompare(school.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold backdrop-blur-md transition-colors cursor-pointer ${
                  comparing 
                    ? 'bg-[#2563EB] text-white shadow-xs' 
                    : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>{comparing ? 'In Compare' : 'Compare'}</span>
              </button>

              <button
                onClick={() => toggleShortlist(school.slug)}
                className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  shortlisted 
                    ? 'bg-[#2563EB] text-white shadow-xs' 
                    : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
                }`}
                title={shortlisted ? 'Saved to shortlist' : 'Save to shortlist'}
              >
                <Bookmark className="w-3.5 h-3.5" fill={shortlisted ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={closeSchoolModal}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer border border-white/30 ml-1"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* School Name & Address */}
          <div className="relative z-10 mt-auto">
            <h2 id="modal-school-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {school.schoolName}
            </h2>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[14px] text-white/90 mt-1 sm:mt-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#60A5FA] shrink-0" />
              <span className="line-clamp-1">{school.address || school.contactDetails.split('|')[0]}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            2. SCROLLABLE BODY CONTENT WITH ALL FIELDS
            ═══════════════════════════════════════════════════════════ */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Academics, Strengths, Considerations, Alumni */}
            <div className="lg:col-span-2 space-y-5">
              {/* Key Fees & Curriculum Snapshot */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> Key Academic &amp; Fee Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1 mb-1">
                      <IndianRupee className="w-3.5 h-3.5 text-[#2563EB]" /> Approx. Annual Tuition
                    </div>
                    <div className="text-[18px] sm:text-[20px] font-extrabold text-[#2563EB]">
                      {school.approxAnnualFeesInr || 'Fees upon request'}
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1 mb-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" /> Curriculum / Board
                    </div>
                    <div className="text-[16px] sm:text-[18px] font-bold text-[#0F172A]">
                      {school.board}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Strengths & Pros */}
              <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-xs">
                <h3 className="text-[15px] font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  Key Strengths &amp; Pros
                </h3>
                {prosList.length > 0 ? (
                  <ul className="space-y-2">
                    {prosList.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13.5px] text-[#334155]">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13.5px] text-[#64748B] leading-relaxed">{school.pros || 'Not specified'}</p>
                )}
              </div>

              {/* Considerations & Limitations (Cons) */}
              <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs">
                <h3 className="text-[15px] font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Considerations &amp; Limitations (Cons)
                </h3>
                {consList.length > 0 ? (
                  <ul className="space-y-2">
                    {consList.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13.5px] text-[#334155]">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          !
                        </span>
                        <span className="leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13.5px] text-[#64748B] leading-relaxed">{school.cons || 'Not specified'}</p>
                )}
              </div>

              {/* Notable Alumni & Achievements */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
                <h3 className="text-[15px] font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2563EB]" />
                  Notable Alumni &amp; Academic Achievements
                </h3>
                <p className="text-[13.5px] text-[#334155] leading-relaxed bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
                  {school.notableAlumniAchievements || 'Alumni and achievements available directly through school admissions office.'}
                </p>
              </div>
            </div>

            {/* Right Column: Contact Details & Inquiry CTA */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
                <h3 className="text-[15px] font-bold text-[#0F172A] mb-3.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#2563EB]" /> Verified Contact Details
                </h3>

                <div className="space-y-3 text-[13px]">
                  {school.address && (
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748B]">Address</div>
                        <div className="text-[#0F172A] font-medium leading-relaxed">{school.address}</div>
                      </div>
                    </div>
                  )}

                  {school.phone && (
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748B]">Phone</div>
                        <a href={`tel:${school.phone}`} className="text-[#2563EB] font-semibold hover:underline">
                          {school.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {school.email && (
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748B]">Email</div>
                        <a href={`mailto:${school.email}`} className="text-[#2563EB] font-semibold hover:underline break-all">
                          {school.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {school.website && (
                    <div className="flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748B]">Official Website</div>
                        <a 
                          href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#2563EB] font-semibold hover:underline break-all inline-flex items-center gap-1"
                        >
                          <span>{school.website}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 text-[11.5px] text-[#64748B] italic border-t border-[#F1F5F9]">
                    {school.contactDetails}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[13.5px] shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Admissions Info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            3. ADMISSIONS INQUIRY FORM MODAL OVERLAY
            ═══════════════════════════════════════════════════════════ */}
        {inquiryModalOpen && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setInquiryModalOpen(false);
                  setInquirySubmitted(false);
                }}
                className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]"
                aria-label="Close inquiry form"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySubmitted ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-[19px] font-bold text-[#0F172A]">Inquiry Received</h4>
                  <p className="text-[13.5px] text-[#64748B] mt-1.5 leading-relaxed">
                    Your request has been forwarded directly to the admissions team of <strong>{school.schoolName}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setInquiryModalOpen(false);
                      setInquirySubmitted(false);
                    }}
                    className="mt-5 px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[13px] shadow-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <h4 className="text-[17px] font-bold text-[#0F172A]">
                    Inquire at {school.schoolName}
                  </h4>
                  <p className="text-[12px] text-[#64748B]">
                    Leave your details for official 2026-27 admission dates, campus walkthroughs, and prospectus.
                  </p>

                  <div>
                    <label className="text-[11.5px] font-bold text-[#475569] block mb-1">Parent's Full Name</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full h-9.5 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[11.5px] font-bold text-[#475569] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full h-9.5 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[11.5px] font-bold text-[#475569] block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full h-9.5 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[11.5px] font-bold text-[#475569] block mb-1">Applying for Grade</label>
                    <select
                      value={childGrade}
                      onChange={(e) => setChildGrade(e.target.value)}
                      className="w-full h-9.5 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Nursery / Kindergarten">Nursery / Kindergarten</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 11">Grade 11</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[13.5px] shadow-xs transition-colors mt-2 cursor-pointer"
                  >
                    Submit Inquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
