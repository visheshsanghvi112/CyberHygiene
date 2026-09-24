import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

function getDatabaseUrl(): string {
  // If explicitly pointing to a remote database (e.g. Postgres / Turso / custom URL), use as is
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:.')) {
    return process.env.DATABASE_URL;
  }

  // When running on Vercel Serverless environment:
  // The deployment root filesystem is read-only in serverless functions.
  // We copy the bundled seed database (with 100 demo records) to /tmp/dev.db
  // so that both read and write operations (new survey responses, demo purge) work seamlessly.
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(tmpDbPath)) {
      const candidatePaths = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
      ];
      for (const candidate of candidatePaths) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            break;
          } catch (err) {
            console.error('Failed to copy seed database to /tmp/dev.db:', err);
          }
        }
      }
    }
    const vercelDbUrl = `file:${tmpDbPath}`;
    process.env.DATABASE_URL = vercelDbUrl;
    return vercelDbUrl;
  }

  return process.env.DATABASE_URL || 'file:./dev.db';
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
