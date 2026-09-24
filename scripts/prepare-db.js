const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dbUrl = process.env.DATABASE_URL || '';
const isPostgres =
  dbUrl.startsWith('postgres://') ||
  dbUrl.startsWith('postgresql://') ||
  dbUrl.startsWith('prisma+postgres://');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

if (isPostgres) {
  console.log('[prepare-db] Detected PostgreSQL DATABASE_URL.');
  if (schema.includes('provider = "sqlite"')) {
    console.log('[prepare-db] Adapting schema provider to "postgresql"...');
    schema = schema.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
    fs.writeFileSync(schemaPath, schema, 'utf8');
  }

  // If in CI/Vercel build with remote Postgres, push schema and seed demo records if needed
  if (process.env.VERCEL || process.env.CI) {
    try {
      console.log('[prepare-db] Syncing schema with remote PostgreSQL database...');
      execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

      console.log('[prepare-db] Seeding initial baseline demo records if needed...');
      execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
    } catch (err) {
      console.warn('[prepare-db] Remote database push/seed note:', err.message);
    }
  }
} else {
  if (schema.includes('provider = "postgresql"')) {
    console.log('[prepare-db] Reverting schema provider to "sqlite"...');
    schema = schema.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
    fs.writeFileSync(schemaPath, schema, 'utf8');
  }
  console.log('[prepare-db] Using SQLite datasource.');
}
