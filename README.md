# CIA — Cyber Hygiene Intelligence & Assessment System
### Cybersecurity Awareness, Assessment & Analytics Platform

**B.Sc. Information Technology • Academic Software Project**  
**Project Topic:** Cyber Hygiene Practices Among College Students and Faculty  
**Student Candidate:** Dhruv Gupta  
**Repository:** [https://github.com/visheshsanghvi112/CyberHygiene](https://github.com/visheshsanghvi112/CyberHygiene)

---

## 1. System Overview

Digital connectivity has become integral to academic workflows for both students and faculty members. However, frequent daily usage does not automatically guarantee adherence to fundamental cybersecurity practices (**cyber hygiene**).

The **CIA (Cyber Hygiene Intelligence & Assessment System)** is a full-stack, enterprise-grade academic software platform designed to evaluate cybersecurity posture, identify behavioural vulnerabilities across academic cohorts, and deliver actionable security insights through an automated analytics engine.

### Key Capabilities
1. **Assessment Module (`/survey`):** Administer a structured, anonymous, 21-question assessment across 7 core security dimensions with real-time feedback.
2. **Scoring Engine:** Objectively computes a normalized **Cyber Hygiene Score (0–100)** across 15 weighted security habits.
3. **Intelligence Dashboard (`/admin/dashboard`):** Operational dashboard featuring 6 high-level KPI cards, an Overall Security Posture Matrix (0–100% adherence), 10 interactive Recharts visualizers, and automated rule-based recommendations.
4. **Assessment Records Management (`/admin/responses`):** Search, filter by role/score/MFA/training/origin, sort, paginate, and inspect complete questionnaire audits.
5. **Risk Insights Engine (`/admin/risk-insights`):** Domain-by-domain vulnerability analysis across Credentials, MFA, Device Security, Phishing, Wi-Fi, and Data Protection.
6. **Publication-Ready Reports (`/admin/reports`):** One-click executive report generator with print/PDF layout.
7. **Cohort Analytics (`/admin/analysis`):** Descriptive distribution metrics, Student vs. Faculty comparisons, and inferential hypothesis testing (**Welch's Two-Sample t-test**).
8. **Data Export Center (`/admin/export`):** RFC-4180 compliant CSV exports for both raw questionnaires and aggregated summary reports.
9. **Data Management Hub (`/admin/settings`):** Dataset provenance monitor (real vs. demo records) and safe one-click demo data purge.

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router, Server Components & Route Handlers)
- **Language:** TypeScript 5
- **Styling:** Vanilla Tailwind CSS 3 (Enterprise academic design system)
- **Database:** SQLite (Embedded `dev.db` via Prisma ORM 6; Vercel serverless-ready)
- **Data Visualizations:** Recharts (10 responsive analytical charts)
- **Validation:** Zod
- **Authentication:** Jose (Stateless signed JWTs in `HTTP-Only` cookies)
- **Testing:** Vitest (17 automated unit & integration tests)

---

## 3. Vercel Deployment Guide (Vercel-Ready)

This repository is pre-configured for instant zero-configuration deployment to **[Vercel](https://vercel.com/)**:

### Quick Deploy Steps
1. Push this repository to GitHub: `https://github.com/visheshsanghvi112/CyberHygiene`.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `visheshsanghvi112/CyberHygiene` repository.
4. Keep the default settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (automatically executes `prisma generate && next build`)
   - **Install Command:** `npm install` (automatically triggers `postinstall: prisma generate`)
5. (Optional) Configure Environment Variables in the Vercel Project Settings:
   - `ADMIN_EMAIL`: e.g. `admin@college.edu`
   - `ADMIN_PASSWORD`: e.g. `CyberHygiene2026!`
   - `ADMIN_JWT_SECRET`: A 32+ character random string
   *(If omitted, secure fallback defaults will be used automatically)*
6. Click **Deploy**.

> **Note on Database in Serverless:**
> The repository bundles the pre-seeded SQLite database containing 100 demo records. When running in Vercel's serverless environment, the system automatically replicates the database to the writable `/tmp/dev.db` directory on cold start. Both reads and writes (new assessments, demo purge) work seamlessly out of the box.

---

## 4. Local Development Quickstart

### Prerequisites
- Node.js 18.x or 20.x
- npm

### Installation & Setup
```bash
# 1. Clone the repository
git clone https://github.com/visheshsanghvi112/CyberHygiene.git
cd CyberHygiene

# 2. Install dependencies
npm install

# 3. Synchronize database schema (if setting up fresh)
npm run db:push

# 4. (Optional) Seed 100 demonstration records
npm run seed

# 5. Start the local development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 5. Automated Testing

Run the full automated test suite using Vitest:
```bash
npm test
```

All 17 tests validate:
- **Scoring Engine (`scoring.test.ts`):** Normalization to 0–100, category thresholds, academic disclaimers.
- **Analysis Engine (`analysis.test.ts`):** Descriptive statistics, zero-division safety, Welch's t-test calculation.
- **Validation (`validation.test.ts`):** Zod schema validation of questionnaires.
- **Export Utility (`export.test.ts`):** RFC-4180 CSV compliance and summary generation.
- **Data Provenance (`data-separation.test.ts`):** Demo vs. real record isolation and safe purge protection.

---

## 6. Access Credentials & Navigation URLs

- **Public Assessment:** `http://localhost:3000/survey`
- **Academic Project Brief:** `http://localhost:3000/about`
- **Admin Login:** `http://localhost:3000/admin/login`
  - **Email:** `admin@college.edu`
  - **Password:** `CyberHygiene2026!`
- **Intelligence Dashboard:** `http://localhost:3000/admin/dashboard`
- **Assessment Records:** `http://localhost:3000/admin/responses`
- **Analytics & T-Test:** `http://localhost:3000/admin/analysis`
- **Risk Insights:** `http://localhost:3000/admin/risk-insights`
- **Reports:** `http://localhost:3000/admin/reports`
- **Export CSV:** `http://localhost:3000/admin/export`
- **Settings & Data Management:** `http://localhost:3000/admin/settings`

---

## 7. Research Methodology & Ethics Note

- **Ethical Integrity:** Questionnaire participation is strictly voluntary and anonymous. No personal identifiers (passwords, usernames, phone numbers, or IP tracking) are ever collected.
- **Data Separation:** Synthetic records generated for prototype testing are tagged with `isDemo: true`. Authentic participants are tagged with `isDemo: false`. The system keeps both sets isolated to maintain complete research provenance.
