import { describe, it, expect } from 'vitest';
import { surveySubmissionSchema } from '../lib/validation';

describe('Validation Schema Unit Tests', () => {
  const validPayload = {
    respondentType: 'Student' as const,
    ageGroup: '18–20' as const,
    academicArea: 'IT/Computer' as const,
    gender: 'Male' as const,
    passwordPractice: 'Always',
    passwordChangeBehavior: 'Immediately',
    passwordManager: 'Yes',
    mfaUsage: 'Yes, on most important accounts',
    softwareUpdates: 'Always',
    deviceLock: 'Yes',
    antivirusUsage: 'Yes',
    linkVerification: 'Always',
    suspiciousMessageExperience: 'Yes',
    suspiciousMessageAction: 'Delete/report it',
    phishingConfidence: 'Confident',
    publicWifiUsage: 'Sometimes',
    publicWifiSensitiveAccounts: 'Always',
    backupFrequency: 'Yes, regularly',
    httpsVerification: 'Always',
    cyberTraining: 'Yes',
    overallAwareness: 'High',
    learningInterest: 'Phishing',
    isDemo: false,
  };

  it('should accept a completely filled valid questionnaire payload', () => {
    const result = surveySubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should reject a submission missing a required field (e.g. mfaUsage)', () => {
    const invalid = { ...validPayload, mfaUsage: '' };
    const result = surveySubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject invalid respondent types', () => {
    const invalid = { ...validPayload, respondentType: 'CorporateExecutive' };
    const result = surveySubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject invalid age groups', () => {
    const invalid = { ...validPayload, ageGroup: '100+' };
    const result = surveySubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
