import { School, BoardComparison } from '@/types/school';

export const BOARD_COMPARISONS: BoardComparison[] = [
  {
    name: 'International Baccalaureate',
    code: 'IB',
    fullForm: 'International Baccalaureate Diploma Programme (IB DP / MYP / PYP)',
    governingBody: 'International Baccalaureate Organization (Geneva, Switzerland)',
    pedagogyFocus: 'Inquiry-based learning, critical thinking, Theory of Knowledge (TOK), and holistic CAS (Creativity, Activity, Service).',
    examStructure: 'Internal assessments, extended essays (4,000 words), criterion-referenced external exams.',
    idealFor: 'Students targeting global Ivy League, Oxbridge, and top European/US universities, or progressive multi-disciplinary careers.',
    pros: [
      'Unsurpassed worldwide recognition across US, UK, Canada & Europe',
      'Encourages self-directed research & essay writing skills early on',
      'No rote learning; emphasizes conceptual understanding and analysis',
      'Balanced profile development through CAS requirements'
    ],
    cons: [
      'Higher annual tuition and specialized learning materials',
      'Demanding workload requiring strong independent time management',
      'Less direct alignment with Indian engineering (JEE) or medical (NEET) syllabus'
    ],
    globalRecognition: 'Tier 1 Global Standard (Accepted worldwide with university credit grants)',
    averageAnnualFee: '₹4.5L – ₹14.0L'
  },
  {
    name: 'Cambridge IGCSE & A-Levels',
    code: 'IGCSE',
    fullForm: 'International General Certificate of Secondary Education (Cambridge Assessment International Education)',
    governingBody: 'University of Cambridge, United Kingdom',
    pedagogyFocus: 'Deep subject specialization, structured analytical coursework, and practical scientific experimentation.',
    examStructure: 'Tiered examination papers (Core vs Extended), practical lab exams, structured mark-scheme grading.',
    idealFor: 'Students who know their preferred subject strengths early and want rigorous, internationally respected qualifications.',
    pros: [
      'Flexible subject combinations (choose 5-14 subjects based on passion)',
      'Rigorous practicals for Sciences and Commerce streams',
      'A-Levels offer direct sophomore credits in US/Canadian colleges',
      'Standardized international benchmarking'
    ],
    cons: [
      'Substantial examination fees per registered paper',
      'Requires experienced Cambridge-certified educators'
    ],
    globalRecognition: 'Global Benchmark across 160+ countries and all Indian universities via AIU equivalence',
    averageAnnualFee: '₹3.0L – ₹9.5L'
  },
  {
    name: 'ICSE & ISC',
    code: 'ICSE',
    fullForm: 'Indian Certificate of Secondary Education & Indian School Certificate (CISCE)',
    governingBody: 'Council for the Indian School Certificate Examinations, New Delhi',
    pedagogyFocus: 'Comprehensive, exhaustive curriculum with strong emphasis on English literature, language mastery, and detailed sciences.',
    examStructure: 'Exhaustive syllabus papers, mandatory internal lab & project assessments (20%), descriptive examinations.',
    idealFor: 'Students desiring deep linguistic flair, humanities depth, management, civil services, or overseas university transitions.',
    pros: [
      'World-renowned English language & literature proficiency',
      'Extensive syllabus provides solid foundation for SAT, GRE, IELTS and humanities',
      'High internal project assessment weightage (20%)',
      'Recognized by UK NARIC as equivalent to GCSE standard'
    ],
    cons: [
      'Dense syllabus with heavy memory load across 10-12 mandatory subjects in Class 10',
      'Requires sustained study discipline from primary years'
    ],
    globalRecognition: 'Widely respected across UK, Commonwealth nations, and all premier Indian universities',
    averageAnnualFee: '₹1.5L – ₹5.0L'
  },
  {
    name: 'CBSE',
    code: 'CBSE',
    fullForm: 'Central Board of Secondary Education',
    governingBody: 'Ministry of Education, Government of India',
    pedagogyFocus: 'Standardized national curriculum aligned with NCERT textbooks, emphasizing STEM, national entrance competitive test readiness.',
    examStructure: 'Objective + descriptive competency-based board exams in Class 10 & 12, continuous school assessments.',
    idealFor: 'Aspirants preparing for competitive Indian national exams (JEE Main/Advanced, NEET, CUET, NDA) and pan-India relocations.',
    pros: [
      'Exact 1-to-1 syllabus alignment with JEE, NEET, and CUET entrance exams',
      'Widest pan-India network (28,000+ schools); seamless transferability across cities',
      'Cost-effective textbooks and standardized evaluation criteria',
      'Increasing integration of skill courses and AI/Coding from grade 6'
    ],
    cons: [
      'Historically lower emphasis on creative writing, debate & qualitative analysis',
      'Large classroom batches in many tier-1/tier-2 private schools'
    ],
    globalRecognition: 'Universal across India; recognized by international universities with high percentage cutoffs',
    averageAnnualFee: '₹80K – ₹3.5L'
  }
];

export const SCHOOLS_DATA: School[] = [
  {
    id: 'school-1',
    slug: 'dhirubhai-ambani-international-school',
    name: 'Dhirubhai Ambani International School',
    tagline: 'World Leader in IB Diploma Results & Global Ivy League Admissions',
    city: 'Mumbai',
    state: 'Maharashtra',
    boards: ['IB', 'IGCSE', 'ICSE'],
    primaryBoard: 'IB',
    schoolType: 'Day School',
    gender: 'Co-educational',
    established: 2003,
    rank: 1,
    rating: 4.95,
    reviewCount: 284,
    annualFeeMin: 480000,
    annualFeeMax: 1250000,
    feeRangeLabel: '₹4.8L – ₹12.5L / year',
    studentTeacherRatio: '8:1',
    campusSize: '130,000 sq ft Modern Tech Complex',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['#1 IB School in India', 'Global Top 10 IB DP Average', 'Reliance Foundation'],
    description: 'Dhirubhai Ambani International School (DAIS) is a premier K-12 co-educational school situated in Bandra-Kurla Complex, Mumbai. Established in 2003 by Nita Ambani, DAIS has consistently achieved an average IB Diploma score exceeding 39.5 points, placing it among the top 10 IB schools globally. The school blends Indian values with a forward-looking international curriculum.',
    curriculumHighlights: [
      'LKG to Class 7: Broad-based holistic integrated curriculum',
      'Class 8 to 10: ICSE and Cambridge IGCSE options with 25+ subject offerings',
      'Class 11 & 12: International Baccalaureate Diploma Programme (IB DP)',
      'Dedicated College Counselling Centre with 1:1 Ivy League and Oxbridge mentorship'
    ],
    academicAchievements: [
      {
        title: 'Average IB DP Score of 39.8 / 45',
        description: 'World-leading cohort average with multiple perfect 45/45 scorers annually.'
      },
      {
        title: '100% International College Placement',
        description: 'Over 85% of graduates admitted to Stanford, Harvard, MIT, Oxford, Cambridge, and Columbia.'
      }
    ],
    facilities: [
      'Smart Digital Classrooms with interactive 4K panels',
      'Specialized Robotics & Maker Space Lab',
      'Acoustically engineered Performing Arts Auditorium',
      'Indoor Multi-purpose Sports Hall & Synthetic Turf',
      'Biotech and Advanced Physics Research Laboratories',
      'World-class Medical Infirmary with full-time pediatric doctors'
    ],
    collegePlacements: {
      topUniversities: ['Stanford University', 'Harvard University', 'MIT', 'Oxford', 'Cambridge', 'Penn Wharton', 'UC Berkeley'],
      domesticHighlights: 'Consistent selections in Ashoka University, IITs, and NLSIU Bengaluru.',
      internationalHighlights: 'Over $3.5M in merit scholarship grants offered to graduating cohorts.'
    },
    contact: {
      address: 'Bandra-Kurla Complex, Bandra East, Mumbai, Maharashtra 400098',
      phone: '+91 22 3563 7000',
      email: 'admissions@da-is.org',
      website: 'https://da-is.org'
    },
    gradeLevels: 'LKG to Grade 12'
  },
  {
    id: 'school-2',
    slug: 'the-doon-school-dehradun',
    name: 'The Doon School',
    tagline: "India's Most Prestigious All-Boys Residential Academy at Chandbagh",
    city: 'Dehradun',
    state: 'Uttarakhand',
    boards: ['IB', 'ICSE'],
    primaryBoard: 'IB',
    schoolType: 'Boarding School',
    gender: 'All-Boys',
    established: 1935,
    rank: 2,
    rating: 4.92,
    reviewCount: 312,
    annualFeeMin: 1150000,
    annualFeeMax: 1550000,
    feeRangeLabel: '₹11.5L – ₹15.5L / year',
    studentTeacherRatio: '7:1',
    campusSize: '70-Acre Lush Botanical Estate',
    admissionsStatus: 'Application Closing Soon',
    heroImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Eton of India', '#1 All-Boys Boarding School', 'Historic Chandbagh'],
    description: 'Founded in 1935 by Satish Ranjan Das, The Doon School is often called the "Eton of India". Located in the foothills of the Himalayas, this premier all-boys residential institution emphasizes character development, independent leadership, outdoor mountaineering expeditions, and democratic citizenship.',
    curriculumHighlights: [
      'Classes 7 to 10: ICSE Curriculum with broad humanities & sciences exposure',
      'Classes 11 & 12: Dual pathways — International Baccalaureate Diploma (IB DP) or ISC',
      'Mandatory Social Service (SUPW) in rural Garhwal villages',
      'Mid-term Himalayan Trekking & Wilderness Survival expedites'
    ],
    academicAchievements: [
      {
        title: 'Outstanding ISC & IB Diplomas',
        description: 'Cohort IB average of 37.4 points; ISC science toppers across northern India.'
      },
      {
        title: 'Illustrious Alumni Network',
        description: 'Produced Prime Ministers, diplomats, authors, Olympic sportsmen, and Supreme Court justices.'
      }
    ],
    facilities: [
      'Kilachand Library with 30,000+ volumes and rare archives',
      'Olympic-standard 25m Heated Swimming Pool',
      'Four Cricket & Football Fields with historic pavilions',
      'Shooting Range, Squash Courts & 6 Synthetic Tennis Courts',
      'State-of-the-art Design & Technology Workshop',
      '24/7 Multi-bed Hospital with resident physicians'
    ],
    collegePlacements: {
      topUniversities: ['Oxford', 'Cambridge', 'Princeton', 'Yale', 'Imperial College London', 'Cornell', 'Dartmouth'],
      domesticHighlights: 'St. Stephen’s College, SRCC, National Law School, and NDA (National Defence Academy).',
      internationalHighlights: 'Unmatched legacy alumni network across global banking, diplomacy, and tech.'
    },
    contact: {
      address: 'Mall Road, Chandbagh, Dehradun, Uttarakhand 248001',
      phone: '+91 135 252 6400',
      email: 'admissions@doonschool.com',
      website: 'https://doonschool.com'
    },
    gradeLevels: 'Class 7 to Class 12'
  },
  {
    id: 'school-3',
    slug: 'the-international-school-bangalore',
    name: 'The International School Bangalore (TISB)',
    tagline: '140-Acre World-Class Academic Sanctuary in India’s Silicon Capital',
    city: 'Bengaluru',
    state: 'Karnataka',
    boards: ['IB', 'IGCSE'],
    primaryBoard: 'IB',
    schoolType: 'Day & Boarding',
    gender: 'Co-educational',
    established: 2000,
    rank: 3,
    rating: 4.88,
    reviewCount: 198,
    annualFeeMin: 750000,
    annualFeeMax: 1450000,
    feeRangeLabel: '₹7.5L – ₹14.5L / year',
    studentTeacherRatio: '9:1',
    campusSize: '140-Acre Expansive Green Campus',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Top 3 IB School Asia', '140-Acre Campus', 'Tech Innovation Hub'],
    description: 'Set on a serene 140-acre campus in Whitefield-Sarjapur, TISB provides world-class holistic education for international and domestic students. Founded by Dr. K.P. Gopalkrishna, the school pairs academic rigor in IGCSE and IB Diploma with rich arts, sports academies, and coding hackathons.',
    curriculumHighlights: [
      'Kindergarten to Grade 5: International Primary Curriculum (IPC)',
      'Grades 6 to 8: Cambridge Lower Secondary Program',
      'Grades 9 & 10: Cambridge IGCSE Examinations',
      'Grades 11 & 12: Prestigious International Baccalaureate Diploma (IB DP)'
    ],
    academicAchievements: [
      {
        title: '38.2 IB Average Cohort Score',
        description: 'Regularly ranked among top international schools across South Asia.'
      },
      {
        title: 'Global STEM Olympiad Winners',
        description: 'First prize winners at Intel ISEF, Harvard MUN, and FIRST Robotics India.'
      }
    ],
    facilities: [
      'Professional Cricket Academy and ICC-standard pitch',
      '25m Competition Swimming Pool with certified coaches',
      'Fully equipped Music School with individual soundproof practice suites',
      'Hostels with air-conditioned en-suite rooms and pastoral care',
      'Specialized Aeronautics and AI computing labs'
    ],
    collegePlacements: {
      topUniversities: ['MIT', 'Stanford', 'Carnegie Mellon', 'University of Pennsylvania', 'Imperial College', 'NUS Singapore'],
      domesticHighlights: 'Ashoka, Plaksha University, BITS Pilani.',
      internationalHighlights: '90%+ students placed in top 50 QS World Ranked universities.'
    },
    contact: {
      address: 'NAFL Valley, Whitefield - Sarjapur Road, Circle, Bengaluru, Karnataka 562125',
      phone: '+91 80 6723 5900',
      email: 'admissions@tisb.ac.in',
      website: 'https://tisb.org'
    },
    gradeLevels: 'Pre-KG to Grade 12'
  },
  {
    id: 'school-4',
    slug: 'cathedral-and-john-connon-school',
    name: 'The Cathedral & John Connon School',
    tagline: '164 Years of Academic Eminence & Cultural Leadership in South Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    boards: ['ICSE', 'IB'],
    primaryBoard: 'ICSE',
    schoolType: 'Day School',
    gender: 'Co-educational',
    established: 1860,
    rank: 4,
    rating: 4.89,
    reviewCount: 260,
    annualFeeMin: 280000,
    annualFeeMax: 720000,
    feeRangeLabel: '₹2.8L – ₹7.2L / year',
    studentTeacherRatio: '11:1',
    campusSize: 'Heritage Colonial Campus in Fort',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Founded 1860', '#1 Co-ed Day School Mumbai', 'Legendary MUN & Debate'],
    description: 'The Cathedral & John Connon School is an iconic 164-year-old educational pillar located in Fort, Mumbai. Renowned for its unparalleled debate culture, literary magazines, and exceptional board results, Cathedral alumni comprise legendary captains of industry, legal luminaries, and renowned authors.',
    curriculumHighlights: [
      'Pre-Primary to Grade 10: ICSE Curriculum with heavy focus on literature and sciences',
      'Grades 11 & 12: Dual track — ISC (Indian School Certificate) and IB Diploma',
      'Cathedral Model United Nations (CMUN) — premier high school diplomacy forum',
      'Advanced Placement (AP) examination test center'
    ],
    academicAchievements: [
      {
        title: '98%+ Distinction Rates in ISC and ICSE',
        description: 'Consistently ranks among the highest scoring ICSE schools nationally.'
      },
      {
        title: 'Global Debate & Literary Laureates',
        description: 'World Individual Debating and Public Speaking Champions.'
      }
    ],
    facilities: [
      'Historic 19th-century Neo-Gothic architecture and auditorium',
      'Contemporary STEM Innovation Labs',
      'Gymnasium, Badminton Courts and Rooftop Sports Turf',
      'Music Academy with classical choir and orchestra training',
      'Extensive Digital Archive Library'
    ],
    collegePlacements: {
      topUniversities: ['Harvard', 'Columbia', 'Yale', 'London School of Economics', 'Brown University', 'UCL'],
      domesticHighlights: 'St. Xavier’s College Mumbai, Government Law College, IIT Bombay.',
      internationalHighlights: 'Unrivalled placement in prestigious Ivy League liberal arts programs.'
    },
    contact: {
      address: '6, Purshottamdas Thakurdas Marg, Fort, Mumbai, Maharashtra 400001',
      phone: '+91 22 4322 1100',
      email: 'principal@cathedral-school.com',
      website: 'https://cathedral-school.com'
    },
    gradeLevels: 'Infant to Grade 12'
  },
  {
    id: 'school-5',
    slug: 'heritage-xperiential-learning-school',
    name: 'Heritage Xperiential Learning School (HXLS)',
    tagline: 'India’s Flagship Pioneer in Experiential Project-Based Pedagogy',
    city: 'Gurugram',
    state: 'Haryana',
    boards: ['CBSE', 'IB', 'IGCSE'],
    primaryBoard: 'CBSE',
    schoolType: 'Day School',
    gender: 'Co-educational',
    established: 2003,
    rank: 5,
    rating: 4.85,
    reviewCount: 220,
    annualFeeMin: 350000,
    annualFeeMax: 680000,
    feeRangeLabel: '₹3.5L – ₹6.8L / year',
    studentTeacherRatio: '10:1',
    campusSize: '12-Acre Sustainable Green Campus',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['#1 Co-ed Day School NCR', 'Experiential Learning Leader', 'Design Thinking Focus'],
    description: 'Heritage Xperiential Learning School (HXLS) in Gurugram has redefined education by replacing rote memorization with deep authentic expeditions, social-emotional learning, and interdisciplinary problem solving. Ranked #1 Co-ed Day School in India by EducationWorld.',
    curriculumHighlights: [
      'Expeditionary Learning model inspired by Harvard Graduate School of Education',
      'CBSE, Cambridge IGCSE, and International Baccalaureate (IB DP) choices in senior years',
      'Authentic community service and sustainable design projects embedded in grades',
      'Zero-textbook progressive primary methodology'
    ],
    academicAchievements: [
      {
        title: '#1 Ranked Co-ed Day School in NCR',
        description: 'Ranked top school in India for Individual Attention and Life Skills Education.'
      },
      {
        title: 'Outstanding CBSE & IB Board Merit',
        description: 'Over 94% average in CBSE Class 12 and 37.5 average in IB DP.'
      }
    ],
    facilities: [
      'Architectural Maker Space and Woodworking Design Labs',
      'Olympic-length Swimming Pool and Heated Toddler Pool',
      'Full-size Football Pitch, Tennis Courts, and Squash Arena',
      'Amphitheatre for dramatic arts and community assemblies',
      'Zero-waste Solar-powered Eco Campus'
    ],
    collegePlacements: {
      topUniversities: ['Brown', 'Cornell', 'Tufts', 'University of Toronto', 'King\'s College London', 'UBC'],
      domesticHighlights: 'Ashoka University, O.P. Jindal Global, NID, Srishti Institute of Art.',
      internationalHighlights: 'Celebrated for graduates excelling in design, sustainability, and entrepreneurship.'
    },
    contact: {
      address: 'Sector 62, Gurugram, Delhi NCR, Haryana 122011',
      phone: '+91 124 285 5124',
      email: 'admissions@heritagexperiential.org',
      website: 'https://heritagexperiential.org'
    },
    gradeLevels: 'Nursery to Grade 12'
  },
  {
    id: 'school-6',
    slug: 'woodstock-school-mussoorie',
    name: 'Woodstock School',
    tagline: 'Himalayan Global Residential Campus at 7,000 Feet Altitude',
    city: 'Mussoorie',
    state: 'Uttarakhand',
    boards: ['IB'],
    primaryBoard: 'IB',
    schoolType: 'Boarding School',
    gender: 'Co-educational',
    established: 1854,
    rank: 6,
    rating: 4.90,
    reviewCount: 175,
    annualFeeMin: 1600000,
    annualFeeMax: 2150000,
    feeRangeLabel: '₹16.0L – ₹21.5L / year',
    studentTeacherRatio: '6:1',
    campusSize: '250-Acre Himalayan Forest Sanctuary',
    admissionsStatus: 'Waitlist Open',
    heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Founded 1854', 'Full IB Continuum World School', 'International Body from 30+ Nations'],
    description: 'Perched in the foothills of the Himalayas in Landour, Mussoorie, Woodstock School is an internationally accredited co-educational boarding school. With students from over 30 countries, Woodstock provides a full IB Continuum curriculum alongside the Woodstock American High School Diploma.',
    curriculumHighlights: [
      'Full IB Continuum: IB PYP, IB MYP, and IB DP',
      'Centre for Imagination (CFI) fostering multidisciplinary innovation',
      'Outdoor Learning expeditions across Garhwal Himalayas and glaciers',
      'High school students earn US High School Diploma accredited by Middle States Association'
    ],
    academicAchievements: [
      {
        title: 'Global IB & US Diploma Excellence',
        description: 'Cohort IB average consistently in the 36-38 point range.'
      },
      {
        title: 'World Leadership & Environmental Honors',
        description: 'Global environmental citizenship awards from WWF and UN Youth.'
      }
    ],
    facilities: [
      'Himalayan Hiking and Rock-climbing Training Facilities',
      'Parker Hall Performing Arts Theatre',
      'Quad Sports Complex with indoor heated courts',
      'Music School with pipe organ and classical ensembles',
      'Fully catered international residential dorms with central heating'
    ],
    collegePlacements: {
      topUniversities: ['Harvard', 'Williams College', 'Amherst', 'McGill', 'University of Edinburgh', 'Dartmouth'],
      domesticHighlights: 'Krea University, Ashoka University.',
      internationalHighlights: 'Over 92% of alumni attend universities in the US, UK, Canada, and Europe.'
    },
    contact: {
      address: 'Landour, Mussoorie, Uttarakhand 248179',
      phone: '+91 135 617 0100',
      email: 'admissions@woodstock.ac.in',
      website: 'https://woodstock.ac.in'
    },
    gradeLevels: 'Grade 5 to Grade 12'
  },
  {
    id: 'school-7',
    slug: 'dps-rk-puram',
    name: 'Delhi Public School (DPS), R.K. Puram',
    tagline: 'India’s Unrivaled Powerhouse for Competitive STEM & Board Toppers',
    city: 'New Delhi',
    state: 'Delhi',
    boards: ['CBSE'],
    primaryBoard: 'CBSE',
    schoolType: 'Day & Boarding',
    gender: 'Co-educational',
    established: 1972,
    rank: 7,
    rating: 4.82,
    reviewCount: 380,
    annualFeeMin: 180000,
    annualFeeMax: 320000,
    feeRangeLabel: '₹1.8L – ₹3.2L / year',
    studentTeacherRatio: '18:1',
    campusSize: '12-Acre Prime South Delhi Campus',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['National STEM Powerhouse', 'IIT-JEE & NEET Toppers', 'Top CBSE School'],
    description: 'DPS R.K. Puram in New Delhi is widely considered India’s foremost academic powerhouse for the CBSE curriculum. Its alumni consistently sweep all-India top ranks in IIT-JEE, NEET, and Olympiads, alongside stellar Ivy League selections and civil services representation.',
    curriculumHighlights: [
      'Classes 6 to 12: Rigorous CBSE Board Curriculum',
      'Specialized streams in Medical, Non-Medical (Engineering), Commerce, and Humanities',
      'Delhi Public School Society Olympiad Training Program',
      'Over 40 active student-run clubs including Exun (Tech/Coding) and Expressions (Literary)'
    ],
    academicAchievements: [
      {
        title: 'Over 150+ IIT-JEE & AIIMS Selections Annually',
        description: 'Unmatched competitive entrance exam pedigree in India.'
      },
      {
        title: 'Exun Clan Tech Dominance',
        description: 'World champions at international hackathons and algorithmic competitions.'
      }
    ],
    facilities: [
      'Four Computer Science Labs with dedicated servers',
      'Biotech, Physics, and Chemistry research facilities',
      'Air-conditioned Audio-Visual Halls and Seminar Rooms',
      'Synthetic Basketball and Lawn Tennis Courts',
      'Hostels for senior students with in-house faculty tutoring'
    ],
    collegePlacements: {
      topUniversities: ['IIT Delhi', 'IIT Bombay', 'AIIMS New Delhi', 'MIT', 'Stanford', 'Cornell', 'BITS Pilani'],
      domesticHighlights: 'Highest single-school intake in IITs and AIIMS across northern India.',
      internationalHighlights: 'Regular admissions with full financial aid to MIT, Caltech, and Princeton.'
    },
    contact: {
      address: 'Sector 12, R.K. Puram, New Delhi 110022',
      phone: '+91 11 4911 5555',
      email: 'principal@dpsrkp.net',
      website: 'https://dpsrkp.net'
    },
    gradeLevels: 'Grade 6 to Grade 12'
  },
  {
    id: 'school-8',
    slug: 'mayo-college-ajmer',
    name: 'Mayo College',
    tagline: '187-Acre Regal Heritage Residential School for Boys',
    city: 'Ajmer',
    state: 'Rajasthan',
    boards: ['CBSE'],
    primaryBoard: 'CBSE',
    schoolType: 'Boarding School',
    gender: 'All-Boys',
    established: 1875,
    rank: 8,
    rating: 4.86,
    reviewCount: 205,
    annualFeeMin: 850000,
    annualFeeMax: 1150000,
    feeRangeLabel: '₹8.5L – ₹11.5L / year',
    studentTeacherRatio: '10:1',
    campusSize: '187-Acre Historic Royal Palace Estate',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Founded 1875', '18-Hole Golf & Equestrian', 'Regal Indo-Saracenic Architecture'],
    description: 'Founded in 1875 by the 6th Earl of Mayo, Mayo College is one of India\'s grandest historic public boarding schools. Located on 187 acres in Ajmer, Rajasthan, Mayo combines royal Indian architecture with equestrian polo, an 18-hole golf course, and holistic CBSE academics.',
    curriculumHighlights: [
      'Classes 4 to 12: CBSE Curriculum with intensive cultural & physical conditioning',
      'Mandatory sports participation in Polo, Horse Riding, Golf, or Squash',
      'Mayo College Museum — one of the largest school museum collections worldwide',
      'International round-square exchange programs with 25+ partner schools'
    ],
    academicAchievements: [
      {
        title: 'Cent Percent Board Pass Rate',
        description: 'Outstanding scores in CBSE board examinations with high distinction rates.'
      },
      {
        title: 'National Horse Polo & Shooting Champions',
        description: 'Produces national equestrian champions and Olympic sports aspirants.'
      }
    ],
    facilities: [
      'Equestrian Academy with 50+ thoroughbred horses and polo grounds',
      '18-Hole Championship Golf Course',
      'Air-conditioned indoor shooting range',
      'Mayo College Museum housed in historic Dan Pao Pavilion',
      '12 Traditional residential boarding houses with housemasters'
    ],
    collegePlacements: {
      topUniversities: ['Oxford', 'LSE', 'King\'s College London', 'University of Virginia', 'NYU Stern'],
      domesticHighlights: 'St. Stephen\'s College, Hindu College Delhi, NDA Pune, Ashoka.',
      internationalHighlights: 'Global alumni network in governance, hospitality, business, and military.'
    },
    contact: {
      address: 'Srinagar Road, Alwar Gate, Ajmer, Rajasthan 305001',
      phone: '+91 145 266 1154',
      email: 'admission@mayocollege.com',
      website: 'https://mayocollege.com'
    },
    gradeLevels: 'Class 4 to Class 12'
  },
  {
    id: 'school-9',
    slug: 'step-by-step-school-noida',
    name: 'Step by Step School',
    tagline: 'Exemplary Inclusive Pedagogy & Modern Multidisciplinary Learning',
    city: 'Noida',
    state: 'Uttar Pradesh',
    boards: ['CBSE', 'IB', 'IGCSE'],
    primaryBoard: 'IB',
    schoolType: 'Day School',
    gender: 'Co-educational',
    established: 2008,
    rank: 9,
    rating: 4.87,
    reviewCount: 165,
    annualFeeMin: 380000,
    annualFeeMax: 750000,
    feeRangeLabel: '₹3.8L – ₹7.5L / year',
    studentTeacherRatio: '8:1',
    campusSize: '10-Acre Purpose-Built Architectural Campus',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Top Inclusive School', 'IB Continuum & CBSE', 'Excellence in Special Needs Support'],
    description: 'Step by Step School in Noida is celebrated for its warm, inclusive ethos and high academic standards. Providing tailored learning pathways for every child, the school offers both CBSE and Cambridge IGCSE / IB Diploma options in senior grades with cutting-edge visual and performing arts.',
    curriculumHighlights: [
      'Nursery to Grade 5: In-house child-centric development curriculum',
      'Grades 6 to 10: CBSE and Cambridge IGCSE choices',
      'Grades 11 & 12: CBSE or IB Diploma Programme (IB DP)',
      'Dedicated Special Educational Needs (SEN) Centre with full inclusion'
    ],
    academicAchievements: [
      {
        title: 'IB Average of 37.6 Points',
        description: 'Exceptional IB DP performance and top CBSE percentile in NCR.'
      },
      {
        title: 'National Inclusive School of the Year',
        description: 'Pioneering mainstream inclusion of neurodivergent students.'
      }
    ],
    facilities: [
      'Olympic-standard all-weather swimming pool',
      'Sculpture, pottery, and contemporary visual arts studios',
      'Full-size FIFA-standard synthetic football turf',
      'Robotics, AI, and environmental research labs',
      'Counseling and mental wellness center'
    ],
    collegePlacements: {
      topUniversities: ['Brown', 'Columbia', 'Johns Hopkins', 'UCLA', 'University of Manchester', 'NUS'],
      domesticHighlights: 'Ashoka, Krea, Flame University, Delhi University colleges.',
      internationalHighlights: 'Over $2.8M in international undergraduate merit scholarships.'
    },
    contact: {
      address: 'Plot A-10, Sector 132, Expressway, Noida, Uttar Pradesh 201304',
      phone: '+91 120 500 7500',
      email: 'admissions@stepbystep.school',
      website: 'https://stepbystep.school'
    },
    gradeLevels: 'Nursery to Grade 12'
  },
  {
    id: 'school-10',
    slug: 'oakridge-international-school-hyderabad',
    name: 'Oakridge International School, Gachibowli',
    tagline: 'Nord Anglia Education Network & Global STEM/Juilliard Alliances',
    city: 'Hyderabad',
    state: 'Telangana',
    boards: ['IB', 'CBSE'],
    primaryBoard: 'IB',
    schoolType: 'Day School',
    gender: 'Co-educational',
    established: 2002,
    rank: 10,
    rating: 4.81,
    reviewCount: 210,
    annualFeeMin: 360000,
    annualFeeMax: 800000,
    feeRangeLabel: '₹3.6L – ₹8.0L / year',
    studentTeacherRatio: '10:1',
    campusSize: '11-Acre High-Tech Gachibowli Campus',
    admissionsStatus: 'Admissions Open 2026-27',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Nord Anglia Education', 'MIT & Juilliard Collaborations', '#1 IB School Telangana'],
    description: 'Located in Hyderabad’s tech corridor, Oakridge Gachibowli is part of the premier Nord Anglia Education family of 80+ international schools. Offering the full IB Continuum alongside CBSE, Oakridge connects students directly with MIT challenges, Juilliard performing arts curricula, and UNICEF humanitarian initiatives.',
    curriculumHighlights: [
      'Full IB Continuum: IB PYP, IB MYP, and IB Diploma Programme',
      'Optional CBSE Stream for senior secondary students',
      'Global Campus platform linking students with 70,000 peers worldwide',
      'Exclusive STEAM projects designed in collaboration with MIT faculty'
    ],
    academicAchievements: [
      {
        title: '36.8 Cohort IB DP Average',
        description: 'Leading international school in Telangana and Andhra Pradesh.'
      },
      {
        title: 'Global Youth Ambassador Honors',
        description: 'Student delegates invited annually to the UN High-Level Political Forum in New York.'
      }
    ],
    facilities: [
      'Nord Anglia Innovation Lab with 3D printers and laser cutters',
      'Juilliard-designed dance and performing arts studios',
      'Indoor temperature-regulated pool and basketball arena',
      'Skating rink, rock-climbing wall, and cricket nets',
      'Health & nutrition cafeteria curated by certified clinical dieticians'
    ],
    collegePlacements: {
      topUniversities: ['Stanford', 'Cornell', 'Georgia Tech', 'Purdue', 'University of Waterloo', 'Imperial College'],
      domesticHighlights: 'IIIT Hyderabad, BITS Hyderabad, Ashoka University.',
      internationalHighlights: 'Strong acceptance rates in top-tier US & Canadian Computer Science and Engineering schools.'
    },
    contact: {
      address: 'Khajaguda, Bowrampet Road, Gachibowli, Hyderabad, Telangana 500008',
      phone: '+91 40 6815 5555',
      email: 'admissions.gachibowli@oakridge.in',
      website: 'https://oakridge.in/gachibowli'
    },
    gradeLevels: 'EYP to Grade 12'
  }
];
