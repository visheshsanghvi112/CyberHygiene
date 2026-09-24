import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateFullReport } from '@/lib/analysis';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin session required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const filter = (searchParams.get('filter') || 'all') as 'all' | 'real' | 'demo';

    // Build database query filter
    const whereClause: { isDemo?: boolean } = {};
    if (filter === 'real') {
      whereClause.isDemo = false;
    } else if (filter === 'demo') {
      whereClause.isDemo = true;
    }

    const records = await prisma.surveyResponse.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    const report = generateFullReport(records, filter);

    // Helper to count occurrences of a field
    const countField = (field: keyof typeof records[0], allowedValues?: string[]) => {
      const counts: Record<string, number> = {};
      if (allowedValues) {
        allowedValues.forEach((v) => (counts[v] = 0));
      }
      records.forEach((r) => {
        const val = String(r[field] ?? '');
        counts[val] = (counts[val] || 0) + 1;
      });
      return Object.entries(counts).map(([name, count]) => ({
        name,
        count,
        percentage: Number(((count / (records.length || 1)) * 100).toFixed(1)),
      }));
    };

    // Format specific chart datasets for Recharts
    const charts = {
      // 1. Respondent Type Distribution
      respondentTypeDistribution: [
        {
          name: 'Students',
          value: report.studentMetrics.count,
          fill: '#3b82f6',
        },
        {
          name: 'Faculty/Staff',
          value: report.facultyMetrics.count,
          fill: '#10b981',
        },
      ],

      // 2. Score Categories Distribution
      scoreDistribution: [
        {
          category: 'Needs Improvement (0–39)',
          count: report.scoreCategories.needsImprovement,
          fill: '#ef4444',
        },
        {
          category: 'Basic (40–59)',
          count: report.scoreCategories.basic,
          fill: '#f59e0b',
        },
        {
          category: 'Good (60–79)',
          count: report.scoreCategories.good,
          fill: '#3b82f6',
        },
        {
          category: 'Strong (80–100)',
          count: report.scoreCategories.strong,
          fill: '#10b981',
        },
      ],

      // 3. Average Score: Students vs Faculty
      groupScoreComparison: [
        {
          group: 'Overall Sample',
          score: report.overallStats.mean,
          median: report.overallStats.median,
        },
        {
          group: 'Students',
          score: report.studentMetrics.averageScore,
          median: report.studentMetrics.medianScore,
        },
        {
          group: 'Faculty/Staff',
          score: report.facultyMetrics.averageScore,
          median: report.facultyMetrics.medianScore,
        },
      ],

      // 4. MFA Adoption
      mfaAdoption: [
        {
          name: 'Most Important Accounts',
          count: records.filter((r) => r.mfaUsage === 'Yes, on most important accounts').length,
          fill: '#10b981',
        },
        {
          name: 'Some Accounts',
          count: records.filter((r) => r.mfaUsage === 'Yes, on some accounts').length,
          fill: '#3b82f6',
        },
        {
          name: 'No MFA',
          count: records.filter((r) => r.mfaUsage === 'No').length,
          fill: '#f59e0b',
        },
        {
          name: 'Unaware of MFA',
          count: records.filter((r) => r.mfaUsage === "I don't know what it is").length,
          fill: '#ef4444',
        },
      ],

      // 5. Password Practice Distribution
      passwordPractice: countField('passwordPractice', [
        'Always',
        'Often',
        'Sometimes',
        'Rarely',
        'Never',
      ]),

      // 6. Software Update Frequency
      softwareUpdates: countField('softwareUpdates', [
        'Always',
        'Often',
        'Sometimes',
        'Rarely',
        'Never',
      ]),

      // 7. Phishing Identification Confidence
      phishingConfidence: countField('phishingConfidence', [
        'Very confident',
        'Confident',
        'Neutral',
        'Not very confident',
        'Not confident at all',
      ]),

      // 8. Public Wi-Fi Usage
      publicWifiUsage: countField('publicWifiUsage', [
        'Frequently',
        'Sometimes',
        'Rarely',
        'Never',
      ]),

      // 9. Backup Habits
      backupHabits: countField('backupFrequency', [
        'Yes, regularly',
        'Occasionally',
        'Rarely',
        'Never',
      ]),

      // 10. Cybersecurity Training Experience
      cyberTraining: countField('cyberTraining', ['Yes', 'No', 'Not sure']),

      // Comparative Radar / Bar metrics
      comparativeIndicators: [
        {
          indicator: 'MFA Adoption',
          Students: report.studentMetrics.mfaAdoptionRate,
          Faculty: report.facultyMetrics.mfaAdoptionRate,
        },
        {
          indicator: 'Routine Backup',
          Students: report.studentMetrics.regularBackupRate,
          Faculty: report.facultyMetrics.regularBackupRate,
        },
        {
          indicator: 'High Phishing Conf.',
          Students: report.studentMetrics.highPhishingConfidenceRate,
          Faculty: report.facultyMetrics.highPhishingConfidenceRate,
        },
        {
          indicator: 'Formal Training',
          Students: report.studentMetrics.formalTrainingRate,
          Faculty: report.facultyMetrics.formalTrainingRate,
        },
        {
          indicator: 'Strong Passwords',
          Students: report.studentMetrics.strongPasswordRate,
          Faculty: report.facultyMetrics.strongPasswordRate,
        },
        {
          indicator: 'Regular Updates',
          Students: report.studentMetrics.regularUpdateRate,
          Faculty: report.facultyMetrics.regularUpdateRate,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      report,
      charts,
    });
  } catch (error) {
    console.error('Error computing survey stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error computing statistics' },
      { status: 500 }
    );
  }
}
