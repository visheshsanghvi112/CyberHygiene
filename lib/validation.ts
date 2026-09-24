// Zod Validation Schema for Survey Responses

import { z } from 'zod';

export const RESPONDENT_TYPES = ['Student', 'Faculty/Staff'] as const;

export const AGE_GROUPS = [
  'Below 18',
  '18–20',
  '21–25',
  '26–35',
  '36–45',
  '46+',
  'Prefer not to say',
] as const;

export const ACADEMIC_AREAS = [
  'IT/Computer',
  'Commerce/Management',
  'Science',
  'Arts/Humanities',
  'Other',
  'Prefer not to say',
] as const;

export const GENDERS = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
] as const;

export const surveySubmissionSchema = z.object({
  // Section A: Demographics
  respondentType: z.enum(RESPONDENT_TYPES),
  ageGroup: z.enum(AGE_GROUPS),
  academicArea: z.enum(ACADEMIC_AREAS),
  gender: z.enum(GENDERS).optional().nullable(),

  // Section B: Password Security
  passwordPractice: z.string().min(1, 'Password uniqueness response is required'),
  passwordChangeBehavior: z.string().min(1, 'Password change behavior response is required'),
  passwordManager: z.string().min(1, 'Password manager response is required'),

  // Section C: Multi-Factor Authentication
  mfaUsage: z.string().min(1, 'MFA usage response is required'),

  // Section D: Device Security
  softwareUpdates: z.string().min(1, 'Software update frequency response is required'),
  deviceLock: z.string().min(1, 'Device lock response is required'),
  antivirusUsage: z.string().min(1, 'Antivirus response is required'),

  // Section E: Phishing and Online Threats
  linkVerification: z.string().min(1, 'Link verification response is required'),
  suspiciousMessageExperience: z.string().min(1, 'Suspicious message experience response is required'),
  suspiciousMessageAction: z.string().min(1, 'Suspicious message action response is required'),
  phishingConfidence: z.string().min(1, 'Phishing confidence response is required'),

  // Section F: Network and Data Safety
  publicWifiUsage: z.string().min(1, 'Public Wi-Fi frequency response is required'),
  publicWifiSensitiveAccounts: z.string().min(1, 'Public Wi-Fi account handling response is required'),
  backupFrequency: z.string().min(1, 'Backup frequency response is required'),
  httpsVerification: z.string().min(1, 'HTTPS verification response is required'),

  // Section G: Awareness & Training
  cyberTraining: z.string().min(1, 'Cyber training response is required'),
  overallAwareness: z.string().min(1, 'Overall awareness response is required'),
  learningInterest: z.string().optional().nullable(),

  // Optional synthetic flag (only set by seed or test)
  isDemo: z.boolean().optional().default(false),
});

export type SurveySubmissionPayload = z.infer<typeof surveySubmissionSchema>;
