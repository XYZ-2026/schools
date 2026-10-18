export type SchoolBoard = 'IB' | 'IGCSE' | 'ICSE' | 'CBSE';

export type SchoolType = 'Day School' | 'Boarding School' | 'Day & Boarding';

export type GenderType = 'Co-educational' | 'All-Boys' | 'All-Girls';

export interface School {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  city: string;
  state: string;
  boards: SchoolBoard[];
  primaryBoard: SchoolBoard;
  schoolType: SchoolType;
  gender: GenderType;
  established: number;
  rank: number;
  rating: number;
  reviewCount: number;
  annualFeeMin: number; // in INR
  annualFeeMax: number; // in INR
  feeRangeLabel: string;
  studentTeacherRatio: string;
  campusSize: string;
  admissionsStatus: 'Admissions Open 2026-27' | 'Application Closing Soon' | 'Waitlist Open';
  heroImage: string;
  galleryImages: string[];
  badges: string[];
  description: string;
  curriculumHighlights: string[];
  academicAchievements: {
    title: string;
    description: string;
  }[];
  facilities: string[];
  collegePlacements: {
    topUniversities: string[];
    domesticHighlights: string;
    internationalHighlights: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  gradeLevels: string;
}

export interface BoardComparison {
  name: string;
  code: SchoolBoard;
  fullForm: string;
  governingBody: string;
  pedagogyFocus: string;
  examStructure: string;
  idealFor: string;
  pros: string[];
  cons: string[];
  globalRecognition: string;
  averageAnnualFee: string;
}
