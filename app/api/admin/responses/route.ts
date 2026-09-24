import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const respondentType = searchParams.get('respondentType') || '';
    const scoreCategory = searchParams.get('scoreCategory') || '';
    const filter = (searchParams.get('filter') || 'all') as 'all' | 'real' | 'demo';
    const sortBy = searchParams.get('sortBy') === 'cyberHygieneScore' ? 'cyberHygieneScore' : 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    // Construct Prisma where query
    const where: Prisma.SurveyResponseWhereInput = {};

    if (filter === 'real') {
      where.isDemo = false;
    } else if (filter === 'demo') {
      where.isDemo = true;
    }

    if (respondentType) {
      where.respondentType = respondentType;
    }

    const mfaFilter = searchParams.get('mfa') || '';
    const trainingFilter = searchParams.get('training') || '';

    if (scoreCategory) {
      where.scoreCategory = scoreCategory;
    }

    if (mfaFilter === 'enabled') {
      where.mfaUsage = { contains: 'Yes' };
    } else if (mfaFilter === 'disabled') {
      where.mfaUsage = { not: { contains: 'Yes' } };
    }

    if (trainingFilter === 'yes') {
      where.cyberTraining = 'Yes';
    } else if (trainingFilter === 'no') {
      where.cyberTraining = { in: ['No', 'Not sure'] };
    }

    if (search) {
      where.OR = [
        { id: { contains: search } },
        { academicArea: { contains: search } },
        { ageGroup: { contains: search } },
      ];
    }

    const [totalCount, records] = await Promise.all([
      prisma.surveyResponse.count({ where }),
      prisma.surveyResponse.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: records,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching responses' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin session required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');

    if (action === 'clear_demo') {
      const deleted = await prisma.surveyResponse.deleteMany({
        where: { isDemo: true },
      });
      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${deleted.count} synthetic demo records.`,
        deletedCount: deleted.count,
      });
    }

    if (id) {
      await prisma.surveyResponse.delete({
        where: { id },
      });
      return NextResponse.json({
        success: true,
        message: `Response ${id} successfully removed.`,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Missing action or id parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error deleting survey responses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete record(s)' },
      { status: 500 }
    );
  }
}
