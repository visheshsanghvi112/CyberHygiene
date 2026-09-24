import { PrismaClient } from '@prisma/client';
import { calculateCyberHygieneScore } from '../lib/scoring';
import { SurveyInput, AcademicArea, AgeGroup, Gender } from '../lib/types';

const prisma = new PrismaClient();

// Deterministic Pseudo-Random Number Generator (Mulberry32)
// Seeded with a constant to guarantee 100% reproducible results on every run
function createPRNG(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = createPRNG(20250923);

// Helper for weighted random selection using deterministic RNG
function weightedPick<T>(items: [T, number][]): T {
  const total = items.reduce((acc, [, w]) => acc + w, 0);
  let r = rng() * total;
  for (const [item, weight] of items) {
    if (r < weight) return item;
    r -= weight;
  }
  return items[items.length - 1][0];
}

const academicAreas: AcademicArea[] = [
  'IT/Computer',
  'Commerce/Management',
  'Science',
  'Arts/Humanities',
  'Other',
  'Prefer not to say',
];

const genders: Gender[] = ['Male', 'Female', 'Other', 'Prefer not to say'];

// Generates 100 realistic, unbiased, overlapping synthetic survey responses
// (70 Students, 30 Faculty/Staff) with genuine individual variability
function generateSyntheticDataset(): SurveyInput[] {
  const dataset: SurveyInput[] = [];

  // Generate 70 Student Records
  for (let i = 0; i < 70; i++) {
    const studentAge = weightedPick<AgeGroup>([
      ['18–20', 60],
      ['21–25', 35],
      ['Below 18', 5],
    ]);

    const area = weightedPick<AcademicArea>([
      ['IT/Computer', 28],
      ['Commerce/Management', 24],
      ['Science', 22],
      ['Arts/Humanities', 18],
      ['Other', 6],
      ['Prefer not to say', 2],
    ]);

    const gender = weightedPick<Gender>([
      ['Male', 46],
      ['Female', 46],
      ['Other', 4],
      ['Prefer not to say', 4],
    ]);

    const rec: SurveyInput = {
      isDemo: true,
      respondentType: 'Student',
      ageGroup: studentAge,
      academicArea: area,
      gender,

      // Section B: Passwords
      passwordPractice: weightedPick([
        ['Always', 22],
        ['Often', 36],
        ['Sometimes', 24],
        ['Rarely', 14],
        ['Never', 4],
      ]),
      passwordChangeBehavior: weightedPick([
        ['Immediately', 30],
        ['Within a few days', 42],
        ['Rarely', 18],
        ['Never', 4],
        ['Not sure', 6],
      ]),
      passwordManager: weightedPick([
        ['Yes', 26],
        ['No', 60],
        ['Not sure what a password manager is', 14],
      ]),

      // Section C: MFA
      mfaUsage: weightedPick([
        ['Yes, on most important accounts', 38],
        ['Yes, on some accounts', 38],
        ['No', 18],
        ["I don't know what it is", 6],
      ]),

      // Section D: Device
      softwareUpdates: weightedPick([
        ['Always', 28],
        ['Often', 36],
        ['Sometimes', 22],
        ['Rarely', 12],
        ['Never', 2],
      ]),
      deviceLock: weightedPick([
        ['Yes', 90],
        ['No', 10],
      ]),
      antivirusUsage: weightedPick([
        ['Yes', 62],
        ['No', 20],
        ['Not sure', 18],
      ]),

      // Section E: Phishing
      linkVerification: weightedPick([
        ['Always', 26],
        ['Often', 36],
        ['Sometimes', 24],
        ['Rarely', 11],
        ['Never', 3],
      ]),
      suspiciousMessageExperience: weightedPick([
        ['Yes', 76],
        ['No', 16],
        ['Not sure', 8],
      ]),
      suspiciousMessageAction: weightedPick([
        ['Verify the sender first', 36],
        ['Delete/report it', 34],
        ['Ignore it', 22],
        ['Other', 5],
        ['Click/check the link', 3],
      ]),
      phishingConfidence: weightedPick([
        ['Very confident', 16],
        ['Confident', 38],
        ['Neutral', 30],
        ['Not very confident', 12],
        ['Not confident at all', 4],
      ]),

      // Section F: Network & Data
      publicWifiUsage: weightedPick([
        ['Frequently', 38],
        ['Sometimes', 34],
        ['Rarely', 20],
        ['Never', 8],
      ]),
      publicWifiSensitiveAccounts: weightedPick([
        ['Always', 24],
        ['Often', 30],
        ['Sometimes', 24],
        ['Rarely', 14],
        ['Never', 5],
        ['Not applicable', 3],
      ]),
      backupFrequency: weightedPick([
        ['Yes, regularly', 30],
        ['Occasionally', 38],
        ['Rarely', 20],
        ['Never', 12],
      ]),
      httpsVerification: weightedPick([
        ['Always', 42],
        ['Often', 34],
        ['Sometimes', 16],
        ['Rarely', 6],
        ['Never', 2],
      ]),

      // Section G: Awareness
      cyberTraining: weightedPick([
        ['Yes', 28],
        ['No', 56],
        ['Not sure', 16],
      ]),
      overallAwareness: weightedPick([
        ['Very High', 14],
        ['High', 38],
        ['Moderate', 36],
        ['Low', 10],
        ['Very Low', 2],
      ]),
      learningInterest: weightedPick([
        ['Phishing & Social Engineering', 28],
        ['Password Security & Managers', 20],
        ['Two-Factor Authentication Setup', 18],
        ['Online Privacy & Tracking', 14],
        ['Safe Browsing Practices', 12],
        ['Mobile & Smartphone Security', 8],
      ]),
    };
    dataset.push(rec);
  }

  // Generate 30 Faculty & Staff Records
  // Note: Drawn from overlapping natural distributions, without artificial stereotyping
  for (let i = 0; i < 30; i++) {
    const facultyAge = weightedPick<AgeGroup>([
      ['26–35', 38],
      ['36–45', 38],
      ['46+', 24],
    ]);

    const area = weightedPick<AcademicArea>([
      ['IT/Computer', 26],
      ['Science', 26],
      ['Commerce/Management', 24],
      ['Arts/Humanities', 18],
      ['Other', 4],
      ['Prefer not to say', 2],
    ]);

    const gender = weightedPick<Gender>([
      ['Male', 48],
      ['Female', 46],
      ['Other', 2],
      ['Prefer not to say', 4],
    ]);

    const rec: SurveyInput = {
      isDemo: true,
      respondentType: 'Faculty/Staff',
      ageGroup: facultyAge,
      academicArea: area,
      gender,

      // Section B: Passwords
      passwordPractice: weightedPick([
        ['Always', 26],
        ['Often', 38],
        ['Sometimes', 22],
        ['Rarely', 10],
        ['Never', 4],
      ]),
      passwordChangeBehavior: weightedPick([
        ['Immediately', 34],
        ['Within a few days', 44],
        ['Rarely', 14],
        ['Never', 4],
        ['Not sure', 4],
      ]),
      passwordManager: weightedPick([
        ['Yes', 30],
        ['No', 56],
        ['Not sure what a password manager is', 14],
      ]),

      // Section C: MFA
      mfaUsage: weightedPick([
        ['Yes, on most important accounts', 46],
        ['Yes, on some accounts', 34],
        ['No', 16],
        ["I don't know what it is", 4],
      ]),

      // Section D: Device
      softwareUpdates: weightedPick([
        ['Always', 32],
        ['Often', 38],
        ['Sometimes', 18],
        ['Rarely', 10],
        ['Never', 2],
      ]),
      deviceLock: weightedPick([
        ['Yes', 92],
        ['No', 8],
      ]),
      antivirusUsage: weightedPick([
        ['Yes', 70],
        ['No', 14],
        ['Not sure', 16],
      ]),

      // Section E: Phishing
      linkVerification: weightedPick([
        ['Always', 30],
        ['Often', 38],
        ['Sometimes', 20],
        ['Rarely', 9],
        ['Never', 3],
      ]),
      suspiciousMessageExperience: weightedPick([
        ['Yes', 80],
        ['No', 14],
        ['Not sure', 6],
      ]),
      suspiciousMessageAction: weightedPick([
        ['Verify the sender first', 42],
        ['Delete/report it', 36],
        ['Ignore it', 16],
        ['Other', 4],
        ['Click/check the link', 2],
      ]),
      phishingConfidence: weightedPick([
        ['Very confident', 20],
        ['Confident', 40],
        ['Neutral', 26],
        ['Not very confident', 10],
        ['Not confident at all', 4],
      ]),

      // Section F: Network & Data
      publicWifiUsage: weightedPick([
        ['Frequently', 20],
        ['Sometimes', 34],
        ['Rarely', 30],
        ['Never', 16],
      ]),
      publicWifiSensitiveAccounts: weightedPick([
        ['Always', 30],
        ['Often', 34],
        ['Sometimes', 18],
        ['Rarely', 10],
        ['Never', 3],
        ['Not applicable', 5],
      ]),
      backupFrequency: weightedPick([
        ['Yes, regularly', 38],
        ['Occasionally', 36],
        ['Rarely', 16],
        ['Never', 10],
      ]),
      httpsVerification: weightedPick([
        ['Always', 46],
        ['Often', 34],
        ['Sometimes', 14],
        ['Rarely', 4],
        ['Never', 2],
      ]),

      // Section G: Awareness
      cyberTraining: weightedPick([
        ['Yes', 36],
        ['No', 48],
        ['Not sure', 16],
      ]),
      overallAwareness: weightedPick([
        ['Very High', 18],
        ['High', 40],
        ['Moderate', 32],
        ['Low', 8],
        ['Very Low', 2],
      ]),
      learningInterest: weightedPick([
        ['Online Privacy & Tracking', 24],
        ['Phishing & Social Engineering', 24],
        ['Password Security & Managers', 18],
        ['Two-Factor Authentication Setup', 16],
        ['Safe Browsing Practices', 10],
        ['Mobile & Smartphone Security', 8],
      ]),
    };
    dataset.push(rec);
  }

  return dataset;
}

async function main() {
  console.log('Seeding development database with reproducible synthetic demo responses...');

  // 1. Idempotent cleanup: Delete existing synthetic demo records
  const deleted = await prisma.surveyResponse.deleteMany({
    where: { isDemo: true },
  });
  console.log(`Cleared ${deleted.count} previous synthetic demo records.`);

  // 2. Generate exactly 100 neutral, realistic synthetic responses
  const seedData = generateSyntheticDataset();

  for (const item of seedData) {
    // Score is strictly calculated via the scoring engine (never hard-coded)
    const scoreResult = calculateCyberHygieneScore(item);

    await prisma.surveyResponse.create({
      data: {
        isDemo: true,
        respondentType: item.respondentType,
        ageGroup: item.ageGroup,
        academicArea: item.academicArea,
        gender: item.gender ?? null,
        passwordPractice: item.passwordPractice,
        passwordChangeBehavior: item.passwordChangeBehavior,
        passwordManager: item.passwordManager,
        mfaUsage: item.mfaUsage,
        softwareUpdates: item.softwareUpdates,
        deviceLock: item.deviceLock,
        antivirusUsage: item.antivirusUsage,
        linkVerification: item.linkVerification,
        suspiciousMessageExperience: item.suspiciousMessageExperience,
        suspiciousMessageAction: item.suspiciousMessageAction,
        phishingConfidence: item.phishingConfidence,
        publicWifiUsage: item.publicWifiUsage,
        publicWifiSensitiveAccounts: item.publicWifiSensitiveAccounts,
        backupFrequency: item.backupFrequency,
        httpsVerification: item.httpsVerification,
        cyberTraining: item.cyberTraining,
        overallAwareness: item.overallAwareness,
        learningInterest: item.learningInterest ?? null,
        cyberHygieneScore: scoreResult.score,
        scoreCategory: scoreResult.category,
      },
    });
  }

  const total = await prisma.surveyResponse.count();
  const demoCount = await prisma.surveyResponse.count({ where: { isDemo: true } });
  const realCount = await prisma.surveyResponse.count({ where: { isDemo: false } });

  console.log(`\n==================================================`);
  console.log(`SEEDING COMPLETE: ${seedData.length} SYNTHETIC RECORDS CREATED`);
  console.log(`Total Database Records: ${total}`);
  console.log(`- Synthetic Demo Records: ${demoCount} (70 Students, 30 Faculty)`);
  console.log(`- Real Participant Records: ${realCount}`);
  console.log(`==================================================`);
  console.log(`NOTICE: All seeded records are explicitly flagged with isDemo: true.`);
  console.log(`They are labelled as 'DEMO / SYNTHETIC DATA' across all dashboards.`);
}

main()
  .catch((e) => {
    console.error('Seed script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
