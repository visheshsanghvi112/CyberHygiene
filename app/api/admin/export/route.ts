import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { convertResponsesToCsv, convertSummaryStatsToCsv } from '@/lib/export';
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
    const exportType = searchParams.get('type') || 'responses';
    const filter = (searchParams.get('filter') || 'all') as 'all' | 'real' | 'demo';

    const whereClause: { isDemo?: boolean } = {};
    if (filter === 'real') whereClause.isDemo = false;
    else if (filter === 'demo') whereClause.isDemo = true;

    const records = await prisma.surveyResponse.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    const timestamp = new Date().toISOString().split('T')[0];

    if (exportType === 'summary') {
      const report = generateFullReport(records, filter);
      const csvData = convertSummaryStatsToCsv(report);
      const filename = `cyber_hygiene_summary_stats_${filter}_${timestamp}.csv`;

      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Default: Raw Anonymized Responses
    const csvData = convertResponsesToCsv(records);
    const filename = `cyber_hygiene_anonymized_responses_${filter}_${timestamp}.csv`;

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('CSV Export Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate CSV export' },
      { status: 500 }
    );
  }
}
