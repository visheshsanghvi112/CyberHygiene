import { describe, it, expect } from 'vitest';
import { convertResponsesToCsv, convertSummaryStatsToCsv } from '../lib/export';
import { FullAnalysisReport } from '../lib/types';

describe('Export Utility Unit Tests', () => {
  it('should generate valid RFC-compliant CSV headers for responses', () => {
    const csv = convertResponsesToCsv([]);
    expect(csv).toContain('Response ID');
    expect(csv).toContain('Respondent Type');
    expect(csv).toContain('Score Category');
  });

  it('should escape cells containing commas or quotes', () => {
    const mockData = [
      {
        id: 'test-1',
        respondentType: 'Student',
        ageGroup: '18–20',
        academicArea: 'Arts, Humanities & Design',
        passwordPractice: 'Always',
        cyberHygieneScore: 85,
        scoreCategory: 'Strong',
        isDemo: false,
        createdAt: new Date().toISOString(),
      },
    ];

    const csv = convertResponsesToCsv(mockData);
    expect(csv).toContain('"Arts, Humanities & Design"');
  });

  it('should generate multi-section summary report CSV with descriptive metrics', () => {
    const mockReport: FullAnalysisReport = {
      filterApplied: 'all',
      totalCount: 50,
      realCount: 10,
      demoCount: 40,
      overallStats: {
        count: 50,
        mean: 72.5,
        median: 74,
        min: 35,
        max: 95,
        stdDev: 12.3,
      },
      scoreCategories: {
        needsImprovement: 2,
        basic: 10,
        good: 25,
        strong: 13,
      },
      studentMetrics: {
        groupName: 'Student',
        count: 35,
        percentageOfTotal: 70,
        averageScore: 70.2,
        medianScore: 72,
        mfaAdoptionRate: 60,
        regularBackupRate: 45,
        highPhishingConfidenceRate: 50,
        formalTrainingRate: 30,
        strongPasswordRate: 65,
        regularUpdateRate: 75,
      },
      facultyMetrics: {
        groupName: 'Faculty/Staff',
        count: 15,
        percentageOfTotal: 30,
        averageScore: 77.8,
        medianScore: 78,
        mfaAdoptionRate: 85,
        regularBackupRate: 60,
        highPhishingConfidenceRate: 65,
        formalTrainingRate: 40,
        strongPasswordRate: 80,
        regularUpdateRate: 85,
      },
      tTest: {
        tStatistic: -2.15,
        degreesOfFreedom: 24.2,
        pValue: 0.0412,
        significant: true,
        interpretation: 'Statistically significant difference observed.',
        method: "Welch's Two-Sample t-test",
      },
      practiceRankings: [
        {
          practiceName: 'Primary Device Lock',
          category: 'Device Security',
          positiveResponsePercentage: 92,
          status: 'Strong',
        },
      ],
      recommendations: ['Enforce institutional MFA policy.'],
      generatedAt: new Date().toISOString(),
    };

    const csv = convertSummaryStatsToCsv(mockReport);
    expect(csv).toContain('ACADEMIC FIELD STUDY SUMMARY STATISTICS');
    expect(csv).toContain('Total Survey Responses,50');
    expect(csv).toContain('Mean Cyber Hygiene Score,72.5');
    expect(csv).toContain('Welch\'s Two-Sample t-test');
  });
});
