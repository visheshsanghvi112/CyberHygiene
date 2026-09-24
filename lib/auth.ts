// Admin Authentication & Session Management using Jose JWT & HTTP-Only Cookies

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'cyber-hygiene-academic-field-study-secret-key-2026'
);

const COOKIE_NAME = 'admin_session';

export interface AdminSession {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

/**
 * Creates and signs an admin session token
 */
export async function createAdminToken(email: string): Promise<string> {
  return await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

/**
 * Verifies an admin token
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Validates credentials against environment variables
 */
export function validateAdminCredentials(
  emailInput: string,
  passwordInput: string
): boolean {
  const envEmail = process.env.ADMIN_EMAIL || 'admin@college.edu';
  const envPassword = process.env.ADMIN_PASSWORD || 'CyberHygiene2026!';

  return emailInput.trim() === envEmail && passwordInput === envPassword;
}

/**
 * Sets session cookie on Next.js response context
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

/**
 * Removes session cookie on logout
 */
export async function clearAdminSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Server helper to check if current request has a valid admin session
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
