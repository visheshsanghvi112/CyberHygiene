import { NextRequest, NextResponse } from 'next/server';
import { surveySubmissionSchema } from '@/lib/validation';
import { calculateCyberHygieneScore } from '@/lib/scoring';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate payload with Zod
    const validationResult = surveySubmissionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Calculate Survey-Based Cyber Hygiene Score (0-100)
    const scoreResult = calculateCyberHygieneScore(data);

    // Save to SQLite database
    const saved = await prisma.surveyResponse.create({
      data: {
        isDemo: false, // Public survey submissions are always authentic field responses
        respondentType: data.respondentType,
        ageGroup: data.ageGroup,
        academicArea: data.academicArea,
        gender: data.gender ?? null,
        passwordPractice: data.passwordPractice,
        passwordChangeBehavior: data.passwordChangeBehavior,
        passwordManager: data.passwordManager,
        mfaUsage: data.mfaUsage,
        softwareUpdates: data.softwareUpdates,
        deviceLock: data.deviceLock,
        antivirusUsage: data.antivirusUsage,
        linkVerification: data.linkVerification,
        suspiciousMessageExperience: data.suspiciousMessageExperience,
        suspiciousMessageAction: data.suspiciousMessageAction,
        phishingConfidence: data.phishingConfidence,
        publicWifiUsage: data.publicWifiUsage,
        publicWifiSensitiveAccounts: data.publicWifiSensitiveAccounts,
        backupFrequency: data.backupFrequency,
        httpsVerification: data.httpsVerification,
        cyberTraining: data.cyberTraining,
        overallAwareness: data.overallAwareness,
        learningInterest: data.learningInterest ?? null,
        cyberHygieneScore: scoreResult.score,
        scoreCategory: scoreResult.category,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your anonymous response has been recorded.',
      responseId: saved.id,
      cyberHygieneScore: scoreResult.score,
      scoreCategory: scoreResult.category,
    });
  } catch (error) {
    console.error('Error saving survey response:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record response. Please try again.',
      },
      { status: 500 }
    );
  }
}
