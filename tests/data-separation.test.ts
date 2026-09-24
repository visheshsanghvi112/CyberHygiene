import { describe, it, expect, afterAll } from 'vitest';
import { prisma } from '../lib/prisma';

describe('Data Separation & Purge Protection Integration Test', () => {
  const testDemoId = `test-demo-${Date.now()}`;
  const testRealId = `test-real-${Date.now()}`;

  afterAll(async () => {
    // Ensure clean state by removing any remaining test records
    await prisma.surveyResponse.deleteMany({
      where: { id: { in: [testDemoId, testRealId] } },
    });
  });

  it('should isolate demo from real records and ensure purge only deletes demo records', async () => {
    // 1. Insert synthetic demo record (isDemo = true)
    const demoRecord = await prisma.surveyResponse.create({
      data: {
        id: testDemoId,
        isDemo: true,
        respondentType: 'Student',
        ageGroup: '18–20',
        academicArea: 'IT/Computer',
        gender: 'Prefer not to say',
        passwordPractice: 'Always',
        passwordChangeBehavior: 'Immediately',
        passwordManager: 'Yes',
        mfaUsage: 'Yes, on most important accounts',
        softwareUpdates: 'Always',
        deviceLock: 'Yes',
        antivirusUsage: 'Yes',
        linkVerification: 'Always',
        suspiciousMessageExperience: 'Yes, frequently',
        suspiciousMessageAction: 'Verify the sender first',
        phishingConfidence: 'Very confident',
        publicWifiUsage: 'Rarely',
        publicWifiSensitiveAccounts: 'Always',
        backupFrequency: 'Yes, regularly',
        httpsVerification: 'Always',
        cyberTraining: 'Yes',
        overallAwareness: 'Very High',
        learningInterest: 'Yes',
        cyberHygieneScore: 92,
        scoreCategory: 'Strong',
      },
    });

    expect(demoRecord.isDemo).toBe(true);

    // 2. Insert authentic real survey response (isDemo = false)
    const realRecord = await prisma.surveyResponse.create({
      data: {
        id: testRealId,
        isDemo: false,
        respondentType: 'Faculty/Staff',
        ageGroup: '36–45',
        academicArea: 'Science',
        gender: 'Female',
        passwordPractice: 'Often',
        passwordChangeBehavior: 'Within a few days',
        passwordManager: 'No',
        mfaUsage: 'Yes, on some accounts',
        softwareUpdates: 'Often',
        deviceLock: 'Yes',
        antivirusUsage: 'Yes',
        linkVerification: 'Often',
        suspiciousMessageExperience: 'Occasionally',
        suspiciousMessageAction: 'Delete/report it',
        phishingConfidence: 'Confident',
        publicWifiUsage: 'Rarely',
        publicWifiSensitiveAccounts: 'Often',
        backupFrequency: 'Occasionally',
        httpsVerification: 'Often',
        cyberTraining: 'No',
        overallAwareness: 'Moderate',
        learningInterest: 'Yes',
        cyberHygieneScore: 75,
        scoreCategory: 'Good',
      },
    });

    expect(realRecord.isDemo).toBe(false);

    // Verify both records exist prior to purge operation
    const preCheckDemo = await prisma.surveyResponse.findUnique({
      where: { id: testDemoId },
    });
    const preCheckReal = await prisma.surveyResponse.findUnique({
      where: { id: testRealId },
    });

    expect(preCheckDemo).not.toBeNull();
    expect(preCheckDemo?.isDemo).toBe(true);
    expect(preCheckReal).not.toBeNull();
    expect(preCheckReal?.isDemo).toBe(false);

    // 3. Execute purge operation targeting isDemo = true
    const deleteResult = await prisma.surveyResponse.deleteMany({
      where: {
        isDemo: true,
        id: { in: [testDemoId, testRealId] },
      },
    });

    expect(deleteResult.count).toBe(1);

    // 4. Verify demo record has disappeared
    const postCheckDemo = await prisma.surveyResponse.findUnique({
      where: { id: testDemoId },
    });
    expect(postCheckDemo).toBeNull();

    // 5. Verify genuine real survey response remains completely intact
    const postCheckReal = await prisma.surveyResponse.findUnique({
      where: { id: testRealId },
    });
    expect(postCheckReal).not.toBeNull();
    expect(postCheckReal?.id).toBe(testRealId);
    expect(postCheckReal?.isDemo).toBe(false);
    expect(postCheckReal?.respondentType).toBe('Faculty/Staff');
  });
});
