import { describe, it, expect } from 'vitest';
import {
  calculateCyberHygieneScore,
  getScoreCategory,
  MAX_RAW_POINTS,
  MIN_RAW_POINTS,
} from '../lib/scoring';
import { SurveyInput } from '../lib/types';

describe('Scoring Engine Unit Tests', () => {
  it('should calculate the maximum score of 100 for perfect responses', () => {
    const perfectInput: Partial<SurveyInput> = {
      passwordPractice: 'Always',
      passwordChangeBehavior: 'Immediately',
      passwordManager: 'Yes',
      mfaUsage: 'Yes, on most important accounts',
      softwareUpdates: 'Always',
      deviceLock: 'Yes',
      antivirusUsage: 'Yes',
      linkVerification: 'Always',
      suspiciousMessageAction: 'Delete/report it',
      phishingConfidence: 'Very confident',
      publicWifiSensitiveAccounts: 'Always',
      backupFrequency: 'Yes, regularly',
      httpsVerification: 'Always',
      cyberTraining: 'Yes',
      overallAwareness: 'Very High',
    };

    const result = calculateCyberHygieneScore(perfectInput);
    expect(result.score).toBe(100);
    expect(result.rawPoints).toBe(MAX_RAW_POINTS);
    expect(result.category).toBe('Strong');
  });

  it('should calculate the lowest score for lowest adherence responses', () => {
    const poorInput: Partial<SurveyInput> = {
      passwordPractice: 'Never',
      passwordChangeBehavior: 'Never',
      passwordManager: 'Not sure what a password manager is',
      mfaUsage: "I don't know what it is",
      softwareUpdates: 'Never',
      deviceLock: 'No',
      antivirusUsage: 'No',
      linkVerification: 'Never',
      suspiciousMessageAction: 'Click/check the link',
      phishingConfidence: 'Not confident at all',
      publicWifiSensitiveAccounts: 'Never',
      backupFrequency: 'Never',
      httpsVerification: 'Never',
      cyberTraining: 'No',
      overallAwareness: 'Very Low',
    };

    const result = calculateCyberHygieneScore(poorInput);
    expect(result.score).toBeLessThan(25);
    expect(result.category).toBe('Needs Improvement');
  });

  it('should categorize scores correctly according to benchmark thresholds', () => {
    expect(getScoreCategory(95)).toBe('Strong');
    expect(getScoreCategory(80)).toBe('Strong');
    expect(getScoreCategory(79)).toBe('Good');
    expect(getScoreCategory(60)).toBe('Good');
    expect(getScoreCategory(59)).toBe('Basic');
    expect(getScoreCategory(40)).toBe('Basic');
    expect(getScoreCategory(39)).toBe('Needs Improvement');
    expect(getScoreCategory(10)).toBe('Needs Improvement');
  });

  it('should attach the descriptive academic disclaimer to results', () => {
    const result = calculateCyberHygieneScore({});
    expect(result.disclaimer).toContain('Survey-Based Cyber Hygiene Score');
    expect(result.disclaimer).toContain('academic survey-derived measure');
  });
});
