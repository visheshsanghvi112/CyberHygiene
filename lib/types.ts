// Type definitions for the Cyber Hygiene Field Study System

export type RespondentType = 'Student' | 'Faculty/Staff';

export type AgeGroup =
  | 'Below 18'
  | '18–20'
  | '21–25'
  | '26–35'
  | '36–45'
  | '46+'
  | 'Prefer not to say';

export type AcademicArea =
  | 'IT/Computer'
  | 'Commerce/Management'
  | 'Science'
  | 'Arts/Humanities'
  | 'Other'
  | 'Prefer not to say';

export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export type ScoreCategory =
  | 'Needs Improvement'
  | 'Basic'
  | 'Good'
  | 'Strong';

export interface SurveyInput {
  // Section A: Demographics
  respondentType: RespondentType;
  ageGroup: AgeGroup;
  academicArea: AcademicArea;
  gender?: Gender | null;

  // Section B: Password Security
  passwordPractice: string;
  passwordChangeBehavior: string;
  passwordManager: string;

  // Section C: Multi-Factor Authentication
  mfaUsage: string;

  // Section D: Device Security
  softwareUpdates: string;
  deviceLock: string;
  antivirusUsage: string;

  // Section E: Phishing and Online Threats
  linkVerification: string;
  suspiciousMessageExperience: string;
  suspiciousMessageAction: string;
  phishingConfidence: string;

  // Section F: Network and Data Safety
  publicWifiUsage: string;
  publicWifiSensitiveAccounts: string;
  backupFrequency: string;
  httpsVerification: string;

  // Section G: Awareness & Training
  cyberTraining: string;
  overallAwareness: string;
  learningInterest?: string | null;

  // Optional flag for seed
  isDemo?: boolean;
}

export interface ScoreBreakdown {
  score: number; // 0 to 100
  rawPoints: number;
  maxPoints: number;
  category: ScoreCategory;
  disclaimer: string;
}

export interface DescriptiveStats {
  count: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  stdDev: number;
}

export interface GroupMetric {
  groupName: string;
  count: number;
  percentageOfTotal: number;
  averageScore: number;
  medianScore: number;
  mfaAdoptionRate: number; // percentage (0-100)
  regularBackupRate: number;
  highPhishingConfidenceRate: number;
  formalTrainingRate: number;
  strongPasswordRate: number;
  regularUpdateRate: number;
}

export interface PracticeRanking {
  practiceName: string;
  category: string;
  positiveResponsePercentage: number;
  status: 'Strong' | 'Moderate' | 'Needs Attention';
}

export interface TTestResult {
  tStatistic: number;
  degreesOfFreedom: number;
  pValue: number;
  significant: boolean; // p < 0.05
  interpretation: string;
  method: string;
}

export interface FullAnalysisReport {
  filterApplied: 'all' | 'real' | 'demo';
  totalCount: number;
  realCount: number;
  demoCount: number;
  overallStats: DescriptiveStats;
  scoreCategories: {
    needsImprovement: number;
    basic: number;
    good: number;
    strong: number;
  };
  studentMetrics: GroupMetric;
  facultyMetrics: GroupMetric;
  tTest: TTestResult | null;
  practiceRankings: PracticeRanking[];
  recommendations: string[];
  generatedAt: string;
}
