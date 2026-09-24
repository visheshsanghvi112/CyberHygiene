// Rule-Based Institutional Recommendations Engine
//
// Generates academic recommendations grounded strictly on empirical survey
// percentages calculated from respondent submissions.

import { GroupMetric, PracticeRanking } from './types';

export interface RecommendationContext {
  totalCount: number;
  studentMetrics: GroupMetric;
  facultyMetrics: GroupMetric;
  practiceRankings: PracticeRanking[];
  scoreCategories: {
    needsImprovement: number;
    basic: number;
    good: number;
    strong: number;
  };
}

export function generateRecommendations(
  ctx: RecommendationContext
): string[] {
  const recommendations: string[] = [];

  if (ctx.totalCount === 0) {
    return [
      'No survey responses have been recorded yet. Distribute the survey URL to collect initial feedback.',
    ];
  }

  // 1. Multi-Factor Authentication
  const overallMfaPractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Multi-Factor Authentication Adoption'
  );
  if (overallMfaPractice && overallMfaPractice.positiveResponsePercentage < 50) {
    recommendations.push(
      `Institutional MFA Campaign: Only ${overallMfaPractice.positiveResponsePercentage}% of respondents consistently use MFA on important accounts. Implement step-by-step onboarding workshops for campus portals and email services.`
    );
  } else if (
    overallMfaPractice &&
    overallMfaPractice.positiveResponsePercentage < 70
  ) {
    recommendations.push(
      `Expand MFA Coverage: While ${overallMfaPractice.positiveResponsePercentage}% report some MFA usage, institutional policy should mandate two-factor verification on all critical academic and grading systems.`
    );
  }

  // 2. Data Backup Habits
  const backupPractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Regular Routine File Backups'
  );
  if (backupPractice && backupPractice.positiveResponsePercentage < 50) {
    recommendations.push(
      `Routine Backup Protocols: With only ${backupPractice.positiveResponsePercentage}% of respondents routinely backing up critical files, provide students and faculty with managed cloud storage tutorials (e.g. OneDrive/Google Drive versioning) to prevent catastrophic data loss.`
    );
  }

  // 3. Password Management & Uniqueness
  const passwordManagerPractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Dedicated Password Manager Utilization'
  );
  if (
    passwordManagerPractice &&
    passwordManagerPractice.positiveResponsePercentage < 40
  ) {
    recommendations.push(
      `Password Hygiene & Manager Adoption: Dedicated password manager usage is low at ${passwordManagerPractice.positiveResponsePercentage}%. Host practical demonstrations on browser-based or open-source password managers (e.g., Bitwarden) to mitigate password reuse across portals.`
    );
  }

  // 4. Phishing Awareness & Verification
  const linkPractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Checking Link Sources Before Clicking'
  );
  if (linkPractice && linkPractice.positiveResponsePercentage < 65) {
    recommendations.push(
      `Simulated Phishing Awareness: Link source verification is followed by ${linkPractice.positiveResponsePercentage}% of participants. Organize campus-wide simulated phishing drills and credential harvesting awareness sessions.`
    );
  }

  // 5. Software Updates
  const updatePractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Operating System & Application Updates'
  );
  if (updatePractice && updatePractice.positiveResponsePercentage < 60) {
    recommendations.push(
      `Patch Management Reminders: Only ${updatePractice.positiveResponsePercentage}% update their operating systems promptly. Circulate monthly digital hygiene reminders encouraging automatic patch downloads.`
    );
  }

  // 6. Formal Training Gap
  const trainingPractice = ctx.practiceRankings.find(
    (p) => p.practiceName === 'Formal Cybersecurity Training in Past 12 Mo'
  );
  if (trainingPractice && trainingPractice.positiveResponsePercentage < 40) {
    recommendations.push(
      `Mandatory Academic Induction Modules: Formal cybersecurity training was attended by only ${trainingPractice.positiveResponsePercentage}% of respondents within the last year. Embed a lightweight 30-minute cyber hygiene module into student and staff annual orientation.`
    );
  }

  // 7. Group Disparity (Student vs Faculty)
  if (ctx.studentMetrics.count > 0 && ctx.facultyMetrics.count > 0) {
    const scoreDiff =
      ctx.facultyMetrics.averageScore - ctx.studentMetrics.averageScore;
    if (scoreDiff > 8) {
      recommendations.push(
        `Targeted Student Initiatives: Student average Cyber Hygiene Score (${ctx.studentMetrics.averageScore}) lags behind faculty (${ctx.facultyMetrics.averageScore}) by ${scoreDiff.toFixed(1)} points. Student council and IT clubs should drive peer-to-peer security outreach.`
      );
    } else if (scoreDiff < -8) {
      recommendations.push(
        `Targeted Faculty Digital Safety: Faculty average score (${ctx.facultyMetrics.averageScore}) is lower than student score (${ctx.studentMetrics.averageScore}) by ${Math.abs(scoreDiff).toFixed(1)} points. Provide specialized, accessible administrative security workshops for faculty and staff.`
      );
    }
  }

  // Fallback if everyone is doing well
  if (recommendations.length === 0) {
    recommendations.push(
      'Maintain Proactive Security Culture: Surveyed respondents demonstrate generally satisfactory cyber hygiene. Continue routine security circulars and monitoring to sustain current awareness levels.'
    );
  }

  return recommendations;
}
