import { NextRequest, NextResponse } from 'next/server';
import {
  clearAdminSessionCookie,
  createAdminToken,
  getAdminSession,
  setAdminSessionCookie,
  validateAdminCredentials,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid administrator credentials' },
        { status: 401 }
      );
    }

    const token = await createAdminToken(email);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: { email, role: 'admin' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: { email: session.email, role: session.role },
  });
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
