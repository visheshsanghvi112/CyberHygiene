// Data Analysis & Statistical Engine for Cyber Hygiene Survey

import {
  DescriptiveStats,
  FullAnalysisReport,
  GroupMetric,
  PracticeRanking,
  TTestResult,
} from './types';
import { generateRecommendations } from './recommendations';

interface RawSurveyRecord {
  id: string;
  isDemo: boolean;
  respondentType: string;
  ageGroup: string;
  academicArea: string;
  passwordPractice: string;
  passwordChangeBehavior: string;
  passwordManager: string;
  mfaUsage: string;
  softwareUpdates: string;
  deviceLock: string;
  antivirusUsage: string;
  linkVerification: string;
  suspiciousMessageExperience: string;
  suspiciousMessageAction: string;
  phishingConfidence: string;
  publicWifiUsage: string;
  publicWifiSensitiveAccounts: string;
  backupFrequency: string;
  httpsVerification: string;
  cyberTraining: string;
  overallAwareness: string;
  cyberHygieneScore: number;
  scoreCategory: string;
  createdAt: Date | string;
}

/**
 * Computes mean of numeric array
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return Number((sum / values.length).toFixed(2));
}

/**
 * Computes median of numeric array
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
}

/**
 * Computes sample standard deviation
 */
export function calculateStdDev(values: number[], mean: number): number {
  if (values.length <= 1) return 0;
  const sumSquares = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  return Number(Math.sqrt(sumSquares / (values.length - 1)).toFixed(2));
}

/**
 * Computes descriptive statistics for a list of scores
 */
export function computeDescriptiveStats(scores: number[]): DescriptiveStats {
  if (scores.length === 0) {
    return { count: 0, mean: 0, median: 0, min: 0, max: 0, stdDev: 0 };
  }
  const mean = calculateMean(scores);
  const median = calculateMedian(scores);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const stdDev = calculateStdDev(scores, mean);

  return {
    count: scores.length,
    mean,
    median,
    min,
    max,
    stdDev,
  };
}

/**
 * Computes percentage metrics for a specific group (Student or Faculty)
 */
export function computeGroupMetric(
  groupName: string,
  records: RawSurveyRecord[],
  totalDatasetCount: number
): GroupMetric {
  const count = records.length;
  if (count === 0) {
    return {
      groupName,
      count: 0,
      percentageOfTotal: 0,
      averageScore: 0,
      medianScore: 0,
      mfaAdoptionRate: 0,
      regularBackupRate: 0,
      highPhishingConfidenceRate: 0,
      formalTrainingRate: 0,
      strongPasswordRate: 0,
      regularUpdateRate: 0,
    };
  }

  const scores = records.map((r) => r.cyberHygieneScore);
  const averageScore = calculateMean(scores);
  const medianScore = calculateMedian(scores);

  // MFA: "Yes, on most important accounts" or "Yes, on some accounts"
  const mfaPositive = records.filter(
    (r) =>
      r.mfaUsage === 'Yes, on most important accounts' ||
      r.mfaUsage === 'Yes, on some accounts'
  ).length;

  // Regular backup: "Yes, regularly"
  const backupPositive = records.filter(
    (r) => r.backupFrequency === 'Yes, regularly'
  ).length;

  // High phishing confidence: "Very confident" or "Confident"
  const phishingPositive = records.filter(
    (r) =>
      r.phishingConfidence === 'Very confident' ||
      r.phishingConfidence === 'Confident'
  ).length;

  // Formal training: "Yes"
  const trainingPositive = records.filter(
    (r) => r.cyberTraining === 'Yes'
  ).length;

  // Strong password habit: "Always" or "Often"
  const strongPasswordPositive = records.filter(
    (r) => r.passwordPractice === 'Always' || r.passwordPractice === 'Often'
  ).length;

  // Regular OS/App updates: "Always" or "Often"
  const regularUpdatePositive = records.filter(
    (r) => r.softwareUpdates === 'Always' || r.softwareUpdates === 'Often'
  ).length;

  return {
    groupName,
    count,
    percentageOfTotal: Number(
      ((count / (totalDatasetCount || 1)) * 100).toFixed(1)
    ),
    averageScore,
    medianScore,
    mfaAdoptionRate: Number(((mfaPositive / count) * 100).toFixed(1)),
    regularBackupRate: Number(((backupPositive / count) * 100).toFixed(1)),
    highPhishingConfidenceRate: Number(
      ((phishingPositive / count) * 100).toFixed(1)
    ),
    formalTrainingRate: Number(((trainingPositive / count) * 100).toFixed(1)),
    strongPasswordRate: Number(
      ((strongPasswordPositive / count) * 100).toFixed(1)
    ),
    regularUpdateRate: Number(
      ((regularUpdatePositive / count) * 100).toFixed(1)
    ),
  };
}

/**
 * Evaluates ranking of practices across all respondents
 */
export function computePracticeRankings(
  records: RawSurveyRecord[]
): PracticeRanking[] {
  const n = records.length;
  if (n === 0) return [];

  const checks = [
    {
      practiceName: 'Primary Device Lock / PIN / Biometrics',
      category: 'Device Security',
      count: records.filter((r) => r.deviceLock === 'Yes').length,
    },
    {
      practiceName: 'HTTPS / Secure Website Verification',
      category: 'Network & Browsing',
      count: records.filter(
        (r) => r.httpsVerification === 'Always' || r.httpsVerification === 'Often'
      ).length,
    },
    {
      practiceName: 'Operating System & Application Updates',
      category: 'Device Security',
      count: records.filter(
        (r) => r.softwareUpdates === 'Always' || r.softwareUpdates === 'Often'
      ).length,
    },
    {
      practiceName: 'Unique Passwords on Important Accounts',
      category: 'Password Security',
      count: records.filter(
        (r) => r.passwordPractice === 'Always' || r.passwordPractice === 'Often'
      ).length,
    },
    {
      practiceName: 'Checking Link Sources Before Clicking',
      category: 'Phishing Awareness',
      count: records.filter(
        (r) => r.linkVerification === 'Always' || r.linkVerification === 'Often'
      ).length,
    },
    {
      practiceName: 'Multi-Factor Authentication Adoption',
      category: 'Authentication',
      count: records.filter(
        (r) =>
          r.mfaUsage === 'Yes, on most important accounts' ||
          r.mfaUsage === 'Yes, on some accounts'
      ).length,
    },
    {
      practiceName: 'Avoiding Sensitive Accounts on Public Wi-Fi',
      category: 'Network & Browsing',
      count: records.filter(
        (r) =>
          r.publicWifiSensitiveAccounts === 'Always' ||
          r.publicWifiSensitiveAccounts === 'Often' ||
          r.publicWifiSensitiveAccounts === 'Not applicable'
      ).length,
    },
    {
      practiceName: 'Antivirus or Built-in Security Usage',
      category: 'Device Security',
      count: records.filter((r) => r.antivirusUsage === 'Yes').length,
    },
    {
      practiceName: 'Regular Routine File Backups',
      category: 'Data Management',
      count: records.filter((r) => r.backupFrequency === 'Yes, regularly').length,
    },
    {
      practiceName: 'Dedicated Password Manager Utilization',
      category: 'Password Security',
      count: records.filter((r) => r.passwordManager === 'Yes').length,
    },
    {
      practiceName: 'Formal Cybersecurity Training in Past 12 Mo',
      category: 'Awareness & Training',
      count: records.filter((r) => r.cyberTraining === 'Yes').length,
    },
  ];

  return checks
    .map((c) => {
      const pct = Number(((c.count / n) * 100).toFixed(1));
      let status: 'Strong' | 'Moderate' | 'Needs Attention' = 'Moderate';
      if (pct >= 70) status = 'Strong';
      else if (pct < 45) status = 'Needs Attention';

      return {
        practiceName: c.practiceName,
        category: c.category,
        positiveResponsePercentage: pct,
        status,
      };
    })
    .sort(
      (a, b) => b.positiveResponsePercentage - a.positiveResponsePercentage
    );
}

/**
 * Standard numerical approximation for Student's / Welch's t-test p-value
 */
function approximateTTestPValue(t: number, df: number): number {
  if (df <= 0) return 1;
  const absT = Math.abs(t);
  let p = 0;
  if (df >= 30) {
    // Normal distribution approximation z = absT
    // Abramowitz & Stegun formula 26.2.17
    const b0 = 0.2316419;
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const tNorm = 1 / (1 + b0 * absT);
    const zPdf = Math.exp(-0.5 * absT * absT) / Math.sqrt(2 * Math.PI);
    const oneTail =
      zPdf *
      (b1 * tNorm +
        b2 * Math.pow(tNorm, 2) +
        b3 * Math.pow(tNorm, 3) +
        b4 * Math.pow(tNorm, 4) +
        b5 * Math.pow(tNorm, 5));
    p = 2 * oneTail;
  } else {
    // For smaller df: approximate Student-t via Cornish-Fisher or direct bounds
    const z =
      absT *
      (1 - 1 / (4 * df)) /
      Math.sqrt(1 + (absT * absT) / (2 * df));
    const tNorm = 1 / (1 + 0.2316419 * z);
    const zPdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const oneTail =
      zPdf *
      (0.31938153 * tNorm -
        0.356563782 * Math.pow(tNorm, 2) +
        1.781477937 * Math.pow(tNorm, 3) -
        1.821255978 * Math.pow(tNorm, 4) +
        1.330274429 * Math.pow(tNorm, 5));
    p = 2 * oneTail;
  }
  return Number(Math.max(0.0001, Math.min(1.0, p)).toFixed(4));
}

/**
 * Welch's Two-Sample t-test between Student scores and Faculty scores.
 * Does not assume equal variances.
 */
export function computeWelchTTest(
  students: RawSurveyRecord[],
  faculty: RawSurveyRecord[]
): TTestResult | null {
  const n1 = students.length;
  const n2 = faculty.length;

  if (n1 < 3 || n2 < 3) {
    return null; // Insufficient sample size for inferential statistics
  }

  const s1Scores = students.map((r) => r.cyberHygieneScore);
  const s2Scores = faculty.map((r) => r.cyberHygieneScore);

  const m1 = calculateMean(s1Scores);
  const m2 = calculateMean(s2Scores);

  const v1 = Math.pow(calculateStdDev(s1Scores, m1), 2);
  const v2 = Math.pow(calculateStdDev(s2Scores, m2), 2);

  const se1 = v1 / n1;
  const se2 = v2 / n2;
  const seTotal = Math.sqrt(se1 + se2);

  if (seTotal === 0) return null;

  const tStat = Number(((m1 - m2) / seTotal).toFixed(3));

  // Welch-Satterthwaite degrees of freedom
  const dfNumerator = Math.pow(se1 + se2, 2);
  const dfDenominator =
    Math.pow(se1, 2) / (n1 - 1) + Math.pow(se2, 2) / (n2 - 1);
  const df = Number((dfNumerator / (dfDenominator || 1)).toFixed(1));

  const pValue = approximateTTestPValue(tStat, df);
  const significant = pValue < 0.05;

  let interpretation = '';
  const isDemoDataset =
    students.some((r) => r.isDemo) || faculty.some((r) => r.isDemo);

  if (isDemoDataset) {
    interpretation =
      `[DEMONSTRATION CALCULATION ONLY]: An independent Welch's two-sample t-test was computed across the synthetic demonstration records ` +
      `(Student simulated M=${m1}, Faculty simulated M=${m2}); t(${df}) = ${tStat}, p = ${pValue}. ` +
      `Because this dataset consists of synthetic demonstration records, this statistical output is for software demonstration only ` +
      `and must not be interpreted as empirical evidence about the wider student or faculty population.`;
  } else if (significant) {
    interpretation =
      `A Welch's two-sample t-test indicated a statistically significant difference ` +
      `in Cyber Hygiene Scores between Student respondents (M=${m1}, SD=${Math.sqrt(v1).toFixed(1)}, N=${n1}) ` +
      `and Faculty respondents (M=${m2}, SD=${Math.sqrt(v2).toFixed(1)}, N=${n2}); ` +
      `t(${df}) = ${tStat}, p = ${pValue}. However, as sampling was voluntary and localized, ` +
      `this difference applies strictly to the surveyed cohort and cannot be generalized across institutions.`;
  } else {
    interpretation =
      `A Welch's two-sample t-test found no statistically significant difference ` +
      `in Cyber Hygiene Scores between Student respondents (M=${m1}, SD=${Math.sqrt(v1).toFixed(1)}, N=${n1}) ` +
      `and Faculty respondents (M=${m2}, SD=${Math.sqrt(v2).toFixed(1)}, N=${n2}); ` +
      `t(${df}) = ${tStat}, p = ${pValue} (p >= 0.05). Any observable variation in mean scores ` +
      `may be attributable to sample variance within this surveyed group.`;
  }

  return {
    tStatistic: tStat,
    degreesOfFreedom: df,
    pValue,
    significant,
    interpretation,
    method: "Welch's Two-Sample t-test (Unequal Variances)",
  };
}

/**
 * Builds the complete analysis report for a given set of records
 */
export function generateFullReport(
  records: RawSurveyRecord[],
  filterApplied: 'all' | 'real' | 'demo' = 'all'
): FullAnalysisReport {
  const totalCount = records.length;
  const realCount = records.filter((r) => !r.isDemo).length;
  const demoCount = records.filter((r) => r.isDemo).length;

  const scores = records.map((r) => r.cyberHygieneScore);
  const overallStats = computeDescriptiveStats(scores);

  const scoreCategories = {
    needsImprovement: records.filter(
      (r) => r.scoreCategory === 'Needs Improvement'
    ).length,
    basic: records.filter((r) => r.scoreCategory === 'Basic').length,
    good: records.filter((r) => r.scoreCategory === 'Good').length,
    strong: records.filter((r) => r.scoreCategory === 'Strong').length,
  };

  const students = records.filter((r) => r.respondentType === 'Student');
  const faculty = records.filter((r) => r.respondentType === 'Faculty/Staff');

  const studentMetrics = computeGroupMetric('Student', students, totalCount);
  const facultyMetrics = computeGroupMetric('Faculty/Staff', faculty, totalCount);

  const tTest = computeWelchTTest(students, faculty);
  const practiceRankings = computePracticeRankings(records);

  const recommendations = generateRecommendations({
    totalCount,
    studentMetrics,
    facultyMetrics,
    practiceRankings,
    scoreCategories,
  });

  return {
    filterApplied,
    totalCount,
    realCount,
    demoCount,
    overallStats,
    scoreCategories,
    studentMetrics,
    facultyMetrics,
    tTest,
    practiceRankings,
    recommendations,
    generatedAt: new Date().toISOString(),
  };
}
