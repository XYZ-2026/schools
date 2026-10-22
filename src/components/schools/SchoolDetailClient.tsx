'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { School } from '@/types/school';
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
  ArrowLeft, 
  ArrowLeftRight, 
  Bookmark, 
  Sparkles,
  ThumbsUp,
  AlertCircle,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';

interface SchoolDetailClientProps {
  school: School;
}

export default function SchoolDetailClient({ school }: SchoolDetailClientProps) {
  const { isInCompare, toggleCompare, isInShortlist, toggleShortlist } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Form states
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childGrade, setChildGrade] = useState('Grade 1');

  const comparing = isInCompare(school.slug);
  const shortlisted = isInShortlist(school.slug);

  const prosList = school.pros ? school.pros.split(';').map((p) => p.trim()).filter(Boolean) : [];
  const consList = school.cons ? school.cons.split(';').map((c) => c.trim()).filter(Boolean) : [];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="w-full pb-20">
      {/* Top Banner / Header */}
      <div className="relative min-h-[340px] sm:min-h-[400px] w-full bg-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0] overflow-hidden flex flex-col justify-between">
        <Image
          src={getSchoolImage(school)}
          alt={school.schoolName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/40" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <Link
              href="/schools"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold backdrop-blur-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCompare(school.slug)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold backdrop-blur-md transition-colors cursor-pointer ${
                  comparing ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>{comparing ? 'In Comparison' : 'Compare'}</span>
              </button>
              <button
                onClick={() => toggleShortlist(school.slug)}
                className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  shortlisted ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Save school"
              >
                <Bookmark className="w-4 h-4" fill={shortlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* School Name & Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="bg-[#2563EB] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {school.board}
            </span>
            <span className="bg-white/15 text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-[#93C5FD]" /> Grades: {school.grades}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {school.schoolName}
          </h1>

          <div className="flex items-center gap-2 text-[14px] text-white/90">
            <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0" />
            <span>{school.address || school.contactDetails.split('|')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Fees & Curriculum Snapshot */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-[14px] font-bold uppercase tracking-wider text-[#64748B] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" /> Key Academic &amp; Fee Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1 mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-[#2563EB]" /> Approx. Annual Tuition
                  </div>
                  <div className="text-[20px] font-extrabold text-[#2563EB]">
                    {school.approxAnnualFeesInr || 'Fees upon request'}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1 mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" /> Curriculum / Board
                  </div>
                  <div className="text-[18px] font-bold text-[#0F172A]">
                    {school.board}
                  </div>
                </div>
              </div>
            </div>

            {/* Pros & Key Strengths */}
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs">
              <h2 className="text-[16px] font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-emerald-600" />
                Key Strengths &amp; Pros
              </h2>
              {prosList.length > 0 ? (
                <ul className="space-y-2.5">
                  {prosList.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#334155]">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[14px] text-[#64748B] leading-relaxed">{school.pros || 'Not specified'}</p>
              )}
            </div>

            {/* Cons & Considerations */}
            <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-xs">
              <h2 className="text-[16px] font-bold text-rose-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                Considerations &amp; Limitations (Cons)
              </h2>
              {consList.length > 0 ? (
                <ul className="space-y-2.5">
                  {consList.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#334155]">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        !
                      </span>
                      <span className="leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[14px] text-[#64748B] leading-relaxed">{school.cons || 'Not specified'}</p>
              )}
            </div>

            {/* Notable Alumni & Achievements */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-[16px] font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563EB]" />
                Notable Alumni &amp; Academic Achievements
              </h2>
              <p className="text-[14.5px] text-[#334155] leading-relaxed bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                {school.notableAlumniAchievements || 'Alumni and achievements available directly through school admissions office.'}
              </p>
            </div>
          </div>

          {/* Sidebar: Contact Details & Inquiry CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs sticky top-28">
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563EB]" /> Verified Contact Details
              </h3>

              <div className="space-y-3.5 text-[13.5px]">
                {school.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Address</div>
                      <div className="text-[#0F172A] font-medium leading-relaxed">{school.address}</div>
                    </div>
                  </div>
                )}

                {school.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Phone</div>
                      <a href={`tel:${school.phone}`} className="text-[#2563EB] font-semibold hover:underline">
                        {school.phone}
                      </a>
                    </div>
                  </div>
                )}

                {school.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Email</div>
                      <a href={`mailto:${school.email}`} className="text-[#2563EB] font-semibold hover:underline break-all">
                        {school.email}
                      </a>
                    </div>
                  </div>
                )}

                {school.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Official Website</div>
                      <a 
                        href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#2563EB] font-semibold hover:underline break-all"
                      >
                        {school.website}
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-[12px] text-[#64748B] italic border-t border-[#F1F5F9]">
                  {school.contactDetails}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F1F5F9]">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[14px] shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Admissions Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-[20px] font-bold text-[#0F172A]">Inquiry Received</h3>
                <p className="text-[14px] text-[#64748B] mt-1">
                  Your request has been forwarded directly to {school.schoolName}.
                </p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[13px] shadow-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#0F172A]">
                  Inquire at {school.schoolName}
                </h3>
                <p className="text-[12.5px] text-[#64748B]">
                  Leave your details for verified admissions schedules and prospectus kit.
                </p>

                <div>
                  <label className="text-[12px] font-bold text-[#475569] block mb-1">Parent's Full Name</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full h-10 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold text-[#475569] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full h-10 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold text-[#475569] block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full h-10 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold text-[#475569] block mb-1">Applying for Grade</label>
                  <select
                    value={childGrade}
                    onChange={(e) => setChildGrade(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#CBD5E1] text-[13px] focus:outline-none focus:border-[#2563EB]"
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
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[14px] shadow-xs transition-colors mt-2 cursor-pointer"
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
