export type PrimarySchoolBoard = 'IB' | 'IGCSE' | 'ICSE' | 'CBSE' | 'State Board';

/**
 * School Model mapped directly to Wix CMS Collection `Import9`.
 * Only contains fields that exist in the Wix CMS dataset:
 * - schoolName
 * - board
 * - grades
 * - approxAnnualFeesInr
 * - contactDetails (and structured helpers: address, phone, email, website, city)
 * - pros
 * - cons
 * - notableAlumniAchievements
 */
export interface School {
  id: string;
  slug: string;
  schoolName: string;
  board: string;
  primaryBoard: PrimarySchoolBoard;
  grades: string;
  approxAnnualFeesInr: string;
  feeMin: number;
  feeMax: number;
  contactDetails: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  pros: string;
  cons: string;
  notableAlumniAchievements: string;
  heroImage?: string;
}

export interface BoardComparison {
  name: string;
  code: 'IB' | 'IGCSE' | 'ICSE' | 'CBSE';
  fullForm: string;
  governingBody: string;
  pedagogyFocus: string;
  examStructure: string;
  idealFor: string;
  pros: string[];
  cons: string[];
  averageAnnualFee?: string;
  globalRecognition?: string;
}
