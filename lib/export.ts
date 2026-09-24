// CSV Export Utility for Anonymized Survey Responses and Statistical Summaries

import { FullAnalysisReport } from './types';

function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function convertResponsesToCsv(records: Array<Record<string, unknown>>): string {
  const headers = [
    'Response ID',
    'Respondent Type',
    'Age Group',
    'Academic Area',
    'Gender',
    'Password Uniqueness',
    'Password Change Behavior',
    'Password Manager',
    'MFA Usage',
    'Software Updates',
    'Device Lock',
    'Antivirus Usage',
    'Link Verification',
    'Suspicious Message Experience',
    'Suspicious Message Action',
    'Phishing Identification Confidence',
    'Public Wi-Fi Usage Frequency',
    'Public Wi-Fi Sensitive Avoidance',
    'Routine File Backup Frequency',
    'HTTPS Verification',
    'Formal Cyber Training',
    'Self-Rated Awareness',
    'Learning Interest',
    'Cyber Hygiene Score (0-100)',
    'Score Category',
    'Data Origin (Demo/Real)',
    'Submission Timestamp',
  ];

  if (records.length === 0) {
    return headers.join(',') + '\n';
  }

  const rows = records.map((r) => [
    escapeCsvCell(r.id),
    escapeCsvCell(r.respondentType),
    escapeCsvCell(r.ageGroup),
    escapeCsvCell(r.academicArea),
    escapeCsvCell(r.gender || 'Not specified'),
    escapeCsvCell(r.passwordPractice),
    escapeCsvCell(r.passwordChangeBehavior),
    escapeCsvCell(r.passwordManager),
    escapeCsvCell(r.mfaUsage),
    escapeCsvCell(r.softwareUpdates),
    escapeCsvCell(r.deviceLock),
    escapeCsvCell(r.antivirusUsage),
    escapeCsvCell(r.linkVerification),
    escapeCsvCell(r.suspiciousMessageExperience),
    escapeCsvCell(r.suspiciousMessageAction),
    escapeCsvCell(r.phishingConfidence),
    escapeCsvCell(r.publicWifiUsage),
    escapeCsvCell(r.publicWifiSensitiveAccounts),
    escapeCsvCell(r.backupFrequency),
    escapeCsvCell(r.httpsVerification),
    escapeCsvCell(r.cyberTraining),
    escapeCsvCell(r.overallAwareness),
    escapeCsvCell(r.learningInterest || 'None'),
    escapeCsvCell(r.cyberHygieneScore),
    escapeCsvCell(r.scoreCategory),
    escapeCsvCell(r.isDemo ? 'Synthetic Demo Data' : 'Real Respondent Field Data'),
    escapeCsvCell(r.createdAt ? new Date(r.createdAt as string).toISOString() : ''),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export function convertSummaryStatsToCsv(report: FullAnalysisReport): string {
  const lines: string[] = [];

  lines.push('ACADEMIC FIELD STUDY SUMMARY STATISTICS');
  lines.push(`Topic,"Cyber Hygiene Practices Among College Students and Faculty"`);
  lines.push(`Researcher,"Dhruv Gupta (B.Sc. Information Technology)"`);
  lines.push(`Exported At,"${report.generatedAt}"`);
  lines.push(`Dataset Filter,"${report.filterApplied}"`);
  lines.push('');

  lines.push('OVERALL SAMPLE METRICS');
  lines.push('Metric,Value');
  lines.push(`Total Survey Responses,${report.totalCount}`);
  lines.push(`Real Field Responses,${report.realCount}`);
  lines.push(`Synthetic Demo Responses,${report.demoCount}`);
  lines.push(`Mean Cyber Hygiene Score,${report.overallStats.mean}`);
  lines.push(`Median Score,${report.overallStats.median}`);
  lines.push(`Minimum Score,${report.overallStats.min}`);
  lines.push(`Maximum Score,${report.overallStats.max}`);
  lines.push(`Standard Deviation,${report.overallStats.stdDev}`);
  lines.push('');

  lines.push('SCORE CATEGORY DISTRIBUTION');
  lines.push('Category,Count,Percentage');
  const total = report.totalCount || 1;
  lines.push(
    `Needs Improvement (0-39),${report.scoreCategories.needsImprovement},${(
      (report.scoreCategories.needsImprovement / total) *
      100
    ).toFixed(1)}%`
  );
  lines.push(
    `Basic (40-59),${report.scoreCategories.basic},${(
      (report.scoreCategories.basic / total) *
      100
    ).toFixed(1)}%`
  );
  lines.push(
    `Good (60-79),${report.scoreCategories.good},${(
      (report.scoreCategories.good / total) *
      100
    ).toFixed(1)}%`
  );
  lines.push(
    `Strong (80-100),${report.scoreCategories.strong},${(
      (report.scoreCategories.strong / total) *
      100
    ).toFixed(1)}%`
  );
  lines.push('');

  lines.push('STUDENT VS FACULTY COMPARATIVE METRICS');
  lines.push(
    'Variable,Students (N=' +
      report.studentMetrics.count +
      '),Faculty/Staff (N=' +
      report.facultyMetrics.count +
      '),Absolute Difference'
  );
  lines.push(
    `Average Score,${report.studentMetrics.averageScore},${
      report.facultyMetrics.averageScore
    },${(
      report.facultyMetrics.averageScore - report.studentMetrics.averageScore
    ).toFixed(1)}`
  );
  lines.push(
    `MFA Adoption Rate,${report.studentMetrics.mfaAdoptionRate}%,${
      report.facultyMetrics.mfaAdoptionRate
    }%,${(
      report.facultyMetrics.mfaAdoptionRate - report.studentMetrics.mfaAdoptionRate
    ).toFixed(1)}%`
  );
  lines.push(
    `Routine Backup Rate,${report.studentMetrics.regularBackupRate}%,${
      report.facultyMetrics.regularBackupRate
    }%,${(
      report.facultyMetrics.regularBackupRate -
      report.studentMetrics.regularBackupRate
    ).toFixed(1)}%`
  );
  lines.push(
    `High Phishing Confidence,${report.studentMetrics.highPhishingConfidenceRate}%,${
      report.facultyMetrics.highPhishingConfidenceRate
    }%,${(
      report.facultyMetrics.highPhishingConfidenceRate -
      report.studentMetrics.highPhishingConfidenceRate
    ).toFixed(1)}%`
  );
  lines.push(
    `Formal Security Training,${report.studentMetrics.formalTrainingRate}%,${
      report.facultyMetrics.formalTrainingRate
    }%,${(
      report.facultyMetrics.formalTrainingRate -
      report.studentMetrics.formalTrainingRate
    ).toFixed(1)}%`
  );
  lines.push('');

  if (report.tTest) {
    lines.push('INFERENTIAL STATISTICAL TEST');
    lines.push('Test Method,t-Statistic,Degrees of Freedom,p-Value,Statistically Significant (alpha=0.05)');
    lines.push(
      `"${report.tTest.method}",${report.tTest.tStatistic},${report.tTest.degreesOfFreedom},${report.tTest.pValue},${report.tTest.significant ? 'Yes' : 'No'}`
    );
    lines.push(`"Academic Note","${report.tTest.interpretation.replace(/"/g, '""')}"`);
    lines.push('');
  }

  lines.push('CYBER HYGIENE PRACTICE RANKINGS');
  lines.push('Rank,Practice Name,Domain,Positive Adoption Rate,Classification');
  report.practiceRankings.forEach((p, idx) => {
    lines.push(
      `${idx + 1},"${p.practiceName}","${p.category}",${p.positiveResponsePercentage}%,${p.status}`
    );
  });

  return lines.join('\n');
}
