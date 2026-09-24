import { describe, it, expect } from 'vitest';
import {
  calculateMean,
  calculateMedian,
  calculateStdDev,
  computeDescriptiveStats,
  computeGroupMetric,
  computeWelchTTest,
  generateFullReport,
} from '../lib/analysis';

describe('Analysis Engine Unit Tests', () => {
  it('should accurately calculate mean, median, and standard deviation', () => {
    const scores = [60, 70, 80, 90, 100];
    expect(calculateMean(scores)).toBe(80);
    expect(calculateMedian(scores)).toBe(80);

    const evenScores = [60, 70, 80, 90];
    expect(calculateMedian(evenScores)).toBe(75);

    const stdDev = calculateStdDev(scores, 80);
    expect(stdDev).toBeCloseTo(15.81, 1);
  });

  it('should gracefully handle empty arrays without division by zero', () => {
    const emptyStats = computeDescriptiveStats([]);
    expect(emptyStats.count).toBe(0);
    expect(emptyStats.mean).toBe(0);
    expect(emptyStats.median).toBe(0);
    expect(emptyStats.stdDev).toBe(0);
  });

  it('should calculate group metrics and percentages correctly', () => {
    const mockStudentRecords: any[] = [
      {
        id: '1',
        isDemo: true,
        respondentType: 'Student',
        cyberHygieneScore: 70,
        mfaUsage: 'Yes, on most important accounts',
        backupFrequency: 'Yes, regularly',
        phishingConfidence: 'Confident',
        cyberTraining: 'Yes',
        passwordPractice: 'Always',
        softwareUpdates: 'Always',
      },
      {
        id: '2',
        isDemo: true,
        respondentType: 'Student',
        cyberHygieneScore: 50,
        mfaUsage: 'No',
        backupFrequency: 'Never',
        phishingConfidence: 'Neutral',
        cyberTraining: 'No',
        passwordPractice: 'Sometimes',
        softwareUpdates: 'Sometimes',
      },
    ];

    const metric = computeGroupMetric('Student', mockStudentRecords, 2);
    expect(metric.count).toBe(2);
    expect(metric.averageScore).toBe(60);
    expect(metric.mfaAdoptionRate).toBe(50);
    expect(metric.regularBackupRate).toBe(50);
    expect(metric.formalTrainingRate).toBe(50);
    expect(metric.strongPasswordRate).toBe(50);
  });

  it('should perform Welch t-test between student and faculty cohorts', () => {
    const mockStudents: any[] = [
      { cyberHygieneScore: 60 },
      { cyberHygieneScore: 65 },
      { cyberHygieneScore: 70 },
      { cyberHygieneScore: 62 },
    ];

    const mockFaculty: any[] = [
      { cyberHygieneScore: 75 },
      { cyberHygieneScore: 80 },
      { cyberHygieneScore: 85 },
      { cyberHygieneScore: 82 },
    ];

    const tResult = computeWelchTTest(mockStudents, mockFaculty);
    expect(tResult).not.toBeNull();
    if (tResult) {
      expect(tResult.degreesOfFreedom).toBeGreaterThan(0);
      expect(tResult.tStatistic).toBeLessThan(0); // Faculty score is higher
      expect(tResult.pValue).toBeGreaterThanOrEqual(0);
      expect(tResult.pValue).toBeLessThanOrEqual(1);
      expect(tResult.interpretation).toContain('Welch');
    }
  });

  it('should return null for t-test when sample size is insufficient (N < 3)', () => {
    const smallCohort: any[] = [{ cyberHygieneScore: 60 }];
    const tResult = computeWelchTTest(smallCohort, smallCohort);
    expect(tResult).toBeNull();
  });
});
