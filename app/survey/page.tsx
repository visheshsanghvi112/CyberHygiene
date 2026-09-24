'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  User,
  KeyRound,
  ShieldAlert,
  Smartphone,
  Wifi,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import {
  AGE_GROUPS,
  ACADEMIC_AREAS,
  GENDERS,
  RESPONDENT_TYPES,
} from '@/lib/validation';

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [formData, setFormData] = useState({
    // Section A
    respondentType: '',
    ageGroup: '',
    academicArea: '',
    gender: 'Prefer not to say',

    // Section B
    passwordPractice: '',
    passwordChangeBehavior: '',
    passwordManager: '',

    // Section C
    mfaUsage: '',

    // Section D
    softwareUpdates: '',
    deviceLock: '',
    antivirusUsage: '',

    // Section E
    linkVerification: '',
    suspiciousMessageExperience: '',
    suspiciousMessageAction: '',
    phishingConfidence: '',

    // Section F
    publicWifiUsage: '',
    publicWifiSensitiveAccounts: '',
    backupFrequency: '',
    httpsVerification: '',

    // Section G
    cyberTraining: '',
    overallAwareness: '',
    learningInterest: 'Phishing',
  });

  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    responseId?: string;
    score?: number;
    category?: string;
  } | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  // Validate step before advancing
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.respondentType) {
        setValidationError('Please select whether you are a Student or Faculty/Staff member.');
        return false;
      }
      if (!formData.ageGroup) {
        setValidationError('Please select your age bracket.');
        return false;
      }
      if (!formData.academicArea) {
        setValidationError('Please select your academic or working discipline.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.passwordPractice) {
        setValidationError('Please indicate whether you use unique passwords for important accounts.');
        return false;
      }
      if (!formData.passwordChangeBehavior) {
        setValidationError('Please specify how quickly you update passwords when a breach is suspected.');
        return false;
      }
      if (!formData.passwordManager) {
        setValidationError('Please indicate your password manager usage.');
        return false;
      }
    }

    if (step === 3) {
      if (!formData.mfaUsage) {
        setValidationError('Please specify your multi-factor authentication (MFA/2FA) adoption.');
        return false;
      }
    }

    if (step === 4) {
      if (!formData.softwareUpdates) {
        setValidationError('Please answer the OS and application updates question.');
        return false;
      }
      if (!formData.deviceLock) {
        setValidationError('Please specify if you use a screen lock on your primary device.');
        return false;
      }
      if (!formData.antivirusUsage) {
        setValidationError('Please specify your antivirus or security software usage.');
        return false;
      }
    }

    if (step === 5) {
      if (!formData.linkVerification) {
        setValidationError('Please answer link source verification prior to clicking.');
        return false;
      }
      if (!formData.suspiciousMessageExperience) {
        setValidationError('Please specify if you have received suspicious emails or messages.');
        return false;
      }
      if (!formData.suspiciousMessageAction) {
        setValidationError('Please select your typical action upon receiving a suspicious communication.');
        return false;
      }
      if (!formData.phishingConfidence) {
        setValidationError('Please rate your confidence in identifying a phishing attempt.');
        return false;
      }
    }

    if (step === 6) {
      if (!formData.publicWifiUsage) {
        setValidationError('Please specify how often you connect to public Wi-Fi networks.');
        return false;
      }
      if (!formData.publicWifiSensitiveAccounts) {
        setValidationError('Please specify whether you avoid sensitive accounts on public Wi-Fi.');
        return false;
      }
      if (!formData.backupFrequency) {
        setValidationError('Please indicate your routine file backup frequency.');
        return false;
      }
      if (!formData.httpsVerification) {
        setValidationError('Please answer whether you verify HTTPS/security before entering sensitive info.');
        return false;
      }
    }

    if (step === 7) {
      if (!formData.cyberTraining) {
        setValidationError('Please specify whether you received formal cybersecurity training in the past 12 months.');
        return false;
      }
      if (!formData.overallAwareness) {
        setValidationError('Please rate your overall cybersecurity awareness.');
        return false;
      }
    }

    setValidationError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    setValidationError('');

    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit response');
      }

      setSubmissionResult({
        success: true,
        responseId: data.responseId,
        score: data.cyberHygieneScore,
        category: data.scoreCategory,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setValidationError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render question choice option
  const OptionButton = ({
    selected,
    onClick,
    label,
    description,
  }: {
    selected: boolean;
    onClick: () => void;
    label: string;
    description?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
        selected
          ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600 shadow-2xs'
          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
      }`}
    >
      <div>
        <div className="text-sm font-medium leading-snug">{label}</div>
        {description && (
          <div className="text-xs text-slate-500 mt-1 leading-normal">{description}</div>
        )}
      </div>
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
          selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );

  // If successfully submitted, show completion confirmation screen
  if (submissionResult?.success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="academic-card text-center p-8 sm:p-10">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Assessment Completed
          </h1>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Your Cyber Hygiene Assessment has been successfully recorded in the platform database.
          </p>

          {/* Anonymous Receipt */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left font-mono">
            <div>
              <span className="text-slate-400">Assessment ID: </span>
              <span className="font-semibold text-slate-800">{submissionResult.responseId}</span>
            </div>
            <div className="mt-1">
              <span className="text-slate-400">Privacy Status: </span>
              <span className="text-emerald-700 font-semibold">100% Anonymous • Non-identifiable</span>
            </div>
          </div>

          {/* Score feedback card */}
          {submissionResult.score !== undefined && (
            <div className="mt-6 p-6 rounded-xl border border-indigo-100 bg-indigo-50/50 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Cyber Hygiene Score
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-200 text-indigo-900">
                  {submissionResult.category}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-indigo-900">
                  {submissionResult.score}
                </span>
                <span className="text-sm font-medium text-slate-500">/ 100</span>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                This score reflects the positive digital hygiene practices reported in your assessment.
                It will be aggregated with peer responses for the academic study.
              </p>
              <div className="mt-3 pt-3 border-t border-indigo-100/80 text-[11px] text-slate-500 italic">
                Methodology Note: The score is an academic survey-derived measure created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark.
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
            >
              Return to Homepage
            </Link>
            <button
              onClick={() => {
                setSubmissionResult(null);
                setCurrentStep(1);
                setFormData({
                  respondentType: '',
                  ageGroup: '',
                  academicArea: '',
                  gender: 'Prefer not to say',
                  passwordPractice: '',
                  passwordChangeBehavior: '',
                  passwordManager: '',
                  mfaUsage: '',
                  softwareUpdates: '',
                  deviceLock: '',
                  antivirusUsage: '',
                  linkVerification: '',
                  suspiciousMessageExperience: '',
                  suspiciousMessageAction: '',
                  phishingConfidence: '',
                  publicWifiUsage: '',
                  publicWifiSensitiveAccounts: '',
                  backupFrequency: '',
                  httpsVerification: '',
                  cyberTraining: '',
                  overallAwareness: '',
                  learningInterest: 'Phishing',
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Assessment</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Questionnaire Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-semibold text-indigo-700">Section {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="academic-card">
        {/* Step 1: Profile & Demographics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Section A • Respondent Profile</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Background & Academic Discipline
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                This academic study compares habits between students and faculty/staff cohorts.
              </p>
            </div>

            {/* Q1: Respondent Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                1. What is your primary role at the institution? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESPONDENT_TYPES.map((type) => (
                  <OptionButton
                    key={type}
                    selected={formData.respondentType === type}
                    onClick={() => updateField('respondentType', type)}
                    label={type}
                    description={
                      type === 'Student'
                        ? 'Enrolled in an undergraduate or postgraduate program'
                        : 'Teaching faculty, professor, or administrative staff'
                    }
                  />
                ))}
              </div>
            </div>

            {/* Q2: Age Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                2. Which age group do you belong to? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AGE_GROUPS.map((age) => (
                  <OptionButton
                    key={age}
                    selected={formData.ageGroup === age}
                    onClick={() => updateField('ageGroup', age)}
                    label={age}
                  />
                ))}
              </div>
            </div>

            {/* Q3: Academic/Working Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                3. What is your primary academic stream or working discipline? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ACADEMIC_AREAS.map((area) => (
                  <OptionButton
                    key={area}
                    selected={formData.academicArea === area}
                    onClick={() => updateField('academicArea', area)}
                    label={area}
                  />
                ))}
              </div>
            </div>

            {/* Optional Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Gender <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GENDERS.map((g) => (
                  <OptionButton
                    key={g}
                    selected={formData.gender === g}
                    onClick={() => updateField('gender', g)}
                    label={g}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Password Security */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <KeyRound className="w-4 h-4" />
                <span>Section B • Password Security</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Password Creation & Lifecycle Management
              </h2>
            </div>

            {/* Q4: Different passwords */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                4. Do you use different, unique passwords for different important accounts? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.passwordPractice === opt}
                    onClick={() => updateField('passwordPractice', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q5: Password Change frequency on suspicion */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                5. How frequently do you change passwords when you suspect an account may be compromised? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Immediately',
                  'Within a few days',
                  'Rarely',
                  'Never',
                  'Not sure',
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.passwordChangeBehavior === opt}
                    onClick={() => updateField('passwordChangeBehavior', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q6: Password Manager */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                6. Do you use a dedicated password manager (e.g. Bitwarden, 1Password, Apple Keychain)? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Yes',
                  'No',
                  'Not sure what a password manager is',
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.passwordManager === opt}
                    onClick={() => updateField('passwordManager', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Multi-Factor Authentication */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Section C • Multi-Factor Authentication</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Two-Factor / Multi-Factor Authentication (MFA)
              </h2>
            </div>

            {/* Q7: MFA */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                7. Do you use two-factor or multi-factor authentication (OTP, authenticator app, hardware key) on your important accounts? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2.5">
                {[
                  {
                    label: 'Yes, on most important accounts',
                    desc: 'Enforced on email, college portals, and banking logins',
                  },
                  {
                    label: 'Yes, on some accounts',
                    desc: 'Enabled only when mandatory or on select services',
                  },
                  {
                    label: 'No',
                    desc: 'I rely exclusively on standard single-password login',
                  },
                  {
                    label: "I don't know what it is",
                    desc: 'Unfamiliar with two-step verification mechanisms',
                  },
                ].map((item) => (
                  <OptionButton
                    key={item.label}
                    selected={formData.mfaUsage === item.label}
                    onClick={() => updateField('mfaUsage', item.label)}
                    label={item.label}
                    description={item.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Device Security */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Section D • Device Security</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Hardware Protection & Software Maintenance
              </h2>
            </div>

            {/* Q8: Software Updates */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                8. Do you regularly install operating-system and application security updates? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.softwareUpdates === opt}
                    onClick={() => updateField('softwareUpdates', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q9: Device Lock */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                9. Do you use screen lock/PIN/password/biometric authentication on your primary phone or laptop? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Yes', 'No'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.deviceLock === opt}
                    onClick={() => updateField('deviceLock', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q10: Antivirus */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                10. Do you use an antivirus or active built-in security protection (e.g. Windows Defender, macOS Gatekeeper)? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.antivirusUsage === opt}
                    onClick={() => updateField('antivirusUsage', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Phishing & Threats */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Section E • Phishing & Online Threats</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Social Engineering & Deceptive Communications
              </h2>
            </div>

            {/* Q11: Link Verification */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                11. Before clicking an unknown link in an email or message, do you check its domain and source? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.linkVerification === opt}
                    onClick={() => updateField('linkVerification', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q12: Suspicious Message Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                12. Have you ever received a suspicious email/message asking for credentials, money, OTPs, or personal data? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.suspiciousMessageExperience === opt}
                    onClick={() => updateField('suspiciousMessageExperience', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q13: Suspicious Message Action */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                13. If you receive a suspicious message, what do you usually do? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Delete/report it',
                  'Verify the sender first',
                  'Ignore it',
                  'Click/check the link',
                  'Other',
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.suspiciousMessageAction === opt}
                    onClick={() => updateField('suspiciousMessageAction', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q14: Phishing Confidence */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                14. How confident are you in identifying a phishing attempt? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Very confident',
                  'Confident',
                  'Neutral',
                  'Not very confident',
                  'Not confident at all',
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.phishingConfidence === opt}
                    onClick={() => updateField('phishingConfidence', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Network & Data Safety */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Wifi className="w-4 h-4" />
                <span>Section F • Network & Data Safety</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Connectivity & Disaster Recovery
              </h2>
            </div>

            {/* Q15: Public Wi-Fi Usage */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                15. How often do you connect to public or open Wi-Fi networks (cafes, transit, open campus hotspots)? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Frequently', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.publicWifiUsage === opt}
                    onClick={() => updateField('publicWifiUsage', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q16: Sensitive accounts on public Wi-Fi */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                16. Do you avoid accessing sensitive accounts (banking, official portal) while using unknown public Wi-Fi? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Always', 'Often', 'Sometimes', 'Rarely', 'Never', 'Not applicable'].map(
                  (opt) => (
                    <OptionButton
                      key={opt}
                      selected={formData.publicWifiSensitiveAccounts === opt}
                      onClick={() => updateField('publicWifiSensitiveAccounts', opt)}
                      label={opt}
                    />
                  )
                )}
              </div>
            </div>

            {/* Q17: Backup frequency */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                17. Do you regularly back up important academic or personal files (cloud storage or external drive)? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {['Yes, regularly', 'Occasionally', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.backupFrequency === opt}
                    onClick={() => updateField('backupFrequency', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q18: HTTPS verification */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                18. Do you verify website security (HTTPS / lock symbol) before entering credentials or sensitive data? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.httpsVerification === opt}
                    onClick={() => updateField('httpsVerification', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Awareness & Training */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Section G • Awareness & Training</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Institutional Cybersecurity Culture
              </h2>
            </div>

            {/* Q19: Training */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                19. Have you received any formal cybersecurity awareness training in the past 12 months? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.cyberTraining === opt}
                    onClick={() => updateField('cyberTraining', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q20: Self-rated awareness */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                20. How would you rate your overall cybersecurity awareness? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {['Very High', 'High', 'Moderate', 'Low', 'Very Low'].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.overallAwareness === opt}
                    onClick={() => updateField('overallAwareness', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>

            {/* Q21: Learning interest */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                21. What cybersecurity topic would you like to learn more about?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Phishing & Social Engineering',
                  'Password Security & Managers',
                  'Two-Factor Authentication Setup',
                  'Online Privacy & Tracking',
                  'Safe Browsing Practices',
                  'Mobile & Smartphone Security',
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={formData.learningInterest === opt}
                    onClick={() => updateField('learningInterest', opt)}
                    label={opt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error message banner */}
        {validationError && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-xs transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Securely...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Anonymous Survey</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
