// Scoring Engine for Survey-Based Cyber Hygiene Score
// 
// IMPORTANT ACADEMIC NOTICE:
// This score is a descriptive academic metric formulated specifically for this
// research field study. It is NOT an officially certified or scientifically
// validated commercial cybersecurity standard.

import { ScoreBreakdown, ScoreCategory, SurveyInput } from './types';

export interface QuestionWeightMap {
  [key: string]: { [option: string]: number };
}

export const SCORING_RULES: QuestionWeightMap = {
  // Q4: Password uniqueness
  passwordPractice: {
    'Always': 5,
    'Often': 4,
    'Sometimes': 3,
    'Rarely': 2,
    'Never': 1,
  },

  // Q5: Password change on compromise
  passwordChangeBehavior: {
    'Immediately': 5,
    'Within a few days': 4,
    'Rarely': 2,
    'Never': 1,
    'Not sure': 1,
  },

  // Q6: Password manager usage
  passwordManager: {
    'Yes': 5,
    'No': 2,
    'Not sure what a password manager is': 1,
  },

  // Q7: Multi-factor authentication
  mfaUsage: {
    'Yes, on most important accounts': 5,
    'Yes, on some accounts': 3,
    'No': 1,
    "I don't know what it is": 0,
  },

  // Q8: Software & OS updates
  softwareUpdates: {
    'Always': 5,
    'Often': 4,
    'Sometimes': 3,
    'Rarely': 2,
    'Never': 1,
  },

  // Q9: Device lock
  deviceLock: {
    'Yes': 5,
    'No': 1,
  },

  // Q10: Antivirus or built-in security
  antivirusUsage: {
    'Yes': 5,
    'No': 1,
    'Not sure': 2,
  },

  // Q11: Link verification
  linkVerification: {
    'Always': 5,
    'Often': 4,
    'Sometimes': 3,
    'Rarely': 2,
    'Never': 1,
  },

  // Q13: Suspicious message action
  suspiciousMessageAction: {
    'Delete/report it': 5,
    'Verify the sender first': 5,
    'Ignore it': 3,
    'Click/check the link': 0,
    'Other': 2,
  },

  // Q14: Phishing confidence
  phishingConfidence: {
    'Very confident': 5,
    'Confident': 4,
    'Neutral': 3,
    'Not very confident': 2,
    'Not confident at all': 1,
  },

  // Q16: Avoid sensitive accounts on public Wi-Fi
  publicWifiSensitiveAccounts: {
    'Always': 5,
    'Often': 4,
    'Sometimes': 3,
    'Rarely': 2,
    'Never': 1,
    'Not applicable': 4,
  },

  // Q17: Regular backups
  backupFrequency: {
    'Yes, regularly': 5,
    'Occasionally': 3,
    'Rarely': 2,
    'Never': 1,
  },

  // Q18: HTTPS / URL verification
  httpsVerification: {
    'Always': 5,
    'Often': 4,
    'Sometimes': 3,
    'Rarely': 2,
    'Never': 1,
  },

  // Q19: Formal training in past 12 months
  cyberTraining: {
    'Yes': 5,
    'No': 2,
    'Not sure': 2,
  },

  // Q20: Self-rated awareness
  overallAwareness: {
    'Very High': 5,
    'High': 4,
    'Moderate': 3,
    'Low': 2,
    'Very Low': 1,
  },
};

// Maximum possible raw points across all 15 scored dimensions
export const MAX_RAW_POINTS = Object.values(SCORING_RULES).reduce(
  (sum, rule) => sum + Math.max(...Object.values(rule)),
  0
); // 15 * 5 = 75

export const MIN_RAW_POINTS = Object.values(SCORING_RULES).reduce(
  (sum, rule) => sum + Math.min(...Object.values(rule)),
  0
); // 12

export const SCORE_DISCLAIMER =
  'The Survey-Based Cyber Hygiene Score (0–100) is an academic survey-derived measure ' +
  'created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark.';

/**
 * Calculates normalized Cyber Hygiene Score (0-100) and assigns category.
 */
export function calculateCyberHygieneScore(
  input: Partial<SurveyInput>
): ScoreBreakdown {
  let earnedPoints = 0;

  for (const [field, rule] of Object.entries(SCORING_RULES)) {
    const responseValue = (input as Record<string, string | undefined>)[field];
    if (responseValue && rule[responseValue] !== undefined) {
      earnedPoints += rule[responseValue];
    } else {
      // Default to median or 1 if omitted
      earnedPoints += 1;
    }
  }

  // Normalize to 0–100 percentage
  const normalized = Math.round((earnedPoints / MAX_RAW_POINTS) * 100);
  const score = Math.max(0, Math.min(100, normalized));

  const category = getScoreCategory(score);

  return {
    score,
    rawPoints: earnedPoints,
    maxPoints: MAX_RAW_POINTS,
    category,
    disclaimer: SCORE_DISCLAIMER,
  };
}

/**
 * Returns categorical description based on normalized score.
 * 0–39: Needs Improvement
 * 40–59: Basic
 * 60–79: Good
 * 80–100: Strong
 */
export function getScoreCategory(score: number): ScoreCategory {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Basic';
  return 'Needs Improvement';
}
