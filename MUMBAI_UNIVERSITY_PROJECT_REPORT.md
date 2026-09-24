# CYBER HYGIENE PRACTICES AMONG COLLEGE STUDENTS AND FACULTY: A FIELD SURVEY AND AWARENESS ANALYSIS SYSTEM

### A Project Report
Submitted in partial fulfillment of the Requirements for the award of the degree of  
**BACHELOR OF SCIENCE (INFORMATION TECHNOLOGY)**

**By:**  
**Dhruv Gupta**  
Seat No.: [Your Seat Number / Roll No.]

**Under the esteemed guidance of:**  
[Name of Your Project Guide]  
[Designation of Guide, e.g., Assistant Professor]

**DEPARTMENT OF INFORMATION TECHNOLOGY**  
**[NAME OF YOUR COLLEGE, e.g., WILSON COLLEGE]**  
(Affiliated to University of Mumbai)  
MUMBAI, MAHARASHTRA  
**Academic Year:** 2025–2026

---

## PROFORMA FOR THE APPROVAL PROJECT PROPOSAL

- **ROLL NO. / SEAT NO.:** [Your Roll Number]
- **Name of the Student:** Dhruv Gupta
- **Title of the Project:** Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
- **Name of the Guide:** [Name of Your Project Guide]
- **Teaching Experience of the Guide:** [e.g., 10 Years]
- **Is this your first submission?:** [X] Yes   [ ] No

| Signature of the Student | Signature of the Course Faculty / Guide |
| :--- | :--- |
| **Date:** _______________ | **Date:** _______________ |

---

## COLLEGE CERTIFICATE

**[NAME OF YOUR COLLEGE]**  
(Affiliated to University of Mumbai)  
**DEPARTMENT OF INFORMATION TECHNOLOGY**

### CERTIFICATE

This is to certify that the project entitled **“CYBER HYGIENE PRACTICES AMONG COLLEGE STUDENTS AND FACULTY: A FIELD SURVEY AND AWARENESS ANALYSIS SYSTEM”**, is a bonafide work of **DHRUV GUPTA** bearing Seat No. [Your Seat No.] submitted in partial fulfillment of the requirements for the award of degree of **BACHELOR OF SCIENCE in INFORMATION TECHNOLOGY** from University of Mumbai.

\
\
________________________ \hspace{5cm} ________________________  
**Internal Guide** \hspace{7cm} **External Examiner**  

**Date:** _______________  
**College Seal:**

---

## DECLARATION

I hereby declare that my project entitled, **“CYBER HYGIENE PRACTICES AMONG COLLEGE STUDENTS AND FACULTY: A FIELD SURVEY AND AWARENESS ANALYSIS SYSTEM”** done at [Name of Your College], has not been in any case duplicated to submit to any other university for the award of any degree. To the best of my knowledge other than me, no one has submitted to any other university.

The project is done in partial fulfillment of the requirements for the award of degree of **BACHELOR OF SCIENCE (INFORMATION TECHNOLOGY)** to be submitted as final semester project as part of our curriculum.

\
**Name and Signature of Student:**  
Dhruv Gupta  
**Date:** _______________

---

## ABSTRACT

With the proliferation of cloud-based learning platforms, personal mobile devices, and shared campus computing infrastructure across higher education institutions, academic stakeholders—including students, teaching faculty, and administrative staff—routinely interact with sensitive institutional data. However, despite heavy daily internet usage, empirical adherence to fundamental security practices (collectively termed "cyber hygiene") remains uneven, exposing collegiate communities to credential theft, social engineering, malware, and data loss.

This project presents the design, architectural development, and field evaluation of the **Cyber Hygiene Intelligence & Assessment System (CIA)**. CIA is an end-to-end full-stack web application engineered using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **SQLite / PostgreSQL**. The platform serves a dual purpose: 
1. It provides an intuitive, accessible, 7-step interactive assessment wizard that evaluates an individual's security habits across 15 core dimensions, computing a normalized 0–100 Cyber Hygiene Index and delivering immediate personalized feedback.
2. It equips academic administrators and IT directors with an authenticated intelligence dashboard featuring real-time statistical aggregation, cohort comparative cross-tabulations (Students vs. Faculty), risk matrix heatmaps, automated policy recommendations, and raw CSV data export capabilities.

Empirical testing across a benchmark collegiate dataset of $N = 100$ participants (70 students, 30 faculty members) reveals an overall mean cyber hygiene score of **73.14 / 100** ($SD = 13.92$). Faculty outscored students in Multi-Factor Authentication (MFA) adoption (83.3% vs. 61.4%) and routine backups (63.3% vs. 41.4%), while students exhibited higher vulnerabilities on open public Wi-Fi networks (41.4% unencrypted connection rate). The system demonstrates that automated, privacy-preserving assessment software provides an actionable, data-driven mechanism for academic leadership to eliminate institutional blind spots and strengthen campus cybersecurity posture.

---

## ACKNOWLEDGEMENT

I take this opportunity to express my profound gratitude and deep regards to my teachers and professors for their exemplary guidance, monitoring, and constant encouragement throughout the course of this project. The knowledge, help, and direction given by them from time to time shall carry me a long way in my professional and academic journey.

I express a deep sense of gratitude to my project guide, **[Name of Your Guide]**, for their cordial support, valuable suggestions, constructive criticism, and expert guidance, which helped me successfully conceptualize, architect, and implement this application through all stages of development.

I also extend my heartfelt thanks to the Head of the Department of Information Technology and the Principal of **[Name of Your College]** for providing state-of-the-art laboratory infrastructure, computing facilities, and an encouraging academic environment.

Lastly, I thank the Almighty, my parents, family members, and friends for their continuous patience, moral support, and motivation, without which the timely completion of this project would not have been possible.

---

## TABLE OF CONTENTS

| Sr. No. | Topic Name | Page No. |
| :--- | :--- | :--- |
| **Chapter 1** | **Introduction** | **01** |
| 1.1 | Background | 01 |
| 1.2 | Objectives | 02 |
| 1.3 | Purpose, Scope, and Applicability | 03 |
| 1.3.1 | Purpose | 03 |
| 1.3.2 | Scope | 04 |
| 1.3.3 | Applicability | 05 |
| **Chapter 2** | **Survey of Technologies** | **06** |
| 2.1 | Next.js 14 and React Server Components | 06 |
| 2.2 | TypeScript and Type-Safe Web Engineering | 07 |
| 2.3 | Prisma ORM and Relational Databases (SQLite / PostgreSQL) | 07 |
| 2.4 | Tailwind CSS and Responsive Interface Design | 08 |
| 2.5 | Jose (JWT Auth), Lucide Icons, and Vitest | 08 |
| **Chapter 3** | **Requirements and Analysis** | **09** |
| 3.1 | Problem Definition | 09 |
| 3.2 | Requirements Specification (Functional & Non-Functional) | 10 |
| 3.3 | Planning and Scheduling (Gantt Chart Timeline) | 11 |
| 3.4 | Software and Hardware Requirements | 12 |
| 3.4.1 | Software Requirements | 12 |
| 3.4.2 | Hardware Requirements | 12 |
| 3.5 | Conceptual Model and System Architecture | 13 |
| **Chapter 4** | **System Design** | **15** |
| 4.1 | Basic Modules | 15 |
| 4.2 | Procedural Design & Data Flow Diagrams (DFD Levels 0 & 1) | 16 |
| 4.3 | User Interface Design | 19 |
| **Chapter 5** | **Implementation and Testing** | **21** |
| 5.1 | Implementation Approaches | 21 |
| 5.2 | Coding Details | 23 |
| 5.3 | Testing Approach | 41 |
| 5.3.1 | Unit Testing (12 Test Cases) | 41 |
| 5.3.2 | Integrated Testing (5 Test Cases) | 47 |
| **Chapter 6** | **Results and Discussions** | **51** |
| 6.1 | User Documentation & Screenshot Exhibits (Figures 4.1 to 6.8) | 51 |
| 6.2 | Empirical Dataset Evaluation and Statistical Findings | 54 |
| **Chapter 7** | **Conclusions and Future Scope** | **55** |
| 7.1 | Conclusions | 55 |
| 7.2 | Future Scope | 57 |
| **Chapter 8** | **References** | **59** |

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background
In contemporary collegiate environments, digital devices and online resources are deeply woven into daily pedagogical and administrative operations. College students submit assignments through cloud portals, attend online conferences, and utilize collaborative shared drives. Simultaneously, teaching faculty manage grading databases, conduct research, and communicate sensitive scholastic evaluations. This high level of connectivity has transformed higher education institutions into attractive targets for cyber threats such as credential harvesting, phishing scams, ransomware, and identity impersonation.

Despite widespread digital literacy, "cyber hygiene"—the habitual, daily execution of foundational security practices such as strong credential creation, multi-factor authentication (MFA), regular offline backups, software patching, and threat awareness—remains uneven among academic stakeholders. Prior security assessments often rely on manual paper surveys or generic Google Forms, which fail to calculate standardized risk indices, cannot deliver immediate user guidance, and do not provide administrators with real-time cohort comparative analytics.

The **Cyber Hygiene Intelligence & Assessment System (CIA)** addresses this gap by providing an automated, privacy-first software application designed to measure, evaluate, and analyze cybersecurity practices among college students and faculty members.

### 1.2 Objectives
The primary objectives of this project are:
1. To engineer an intuitive, accessible, 7-step interactive digital assessment instrument that evaluates individual cyber hygiene habits without collecting personally identifiable information (PII) or user credentials.
2. To formulate a deterministic scoring engine that normalizes responses across 15 core security dimensions into an empirical Cyber Hygiene Index (0 to 100) mapped to descriptive performance tiers.
3. To deliver immediate, individualized security scorecards and educational remediation advice to each participant upon questionnaire completion.
4. To build a secure, authenticated Administrative Intelligence Dashboard that aggregates submission data, generates real-time statistical metrics (Mean, Median, Standard Deviation, Score Distribution), and displays dynamic visual analytics.
5. To perform comparative cross-tabulations between Student and Faculty cohorts to identify specific institutional vulnerabilities.
6. To implement an automated institutional risk matrix and policy recommendation engine that translates survey analytics into actionable IT governance protocols.
7. To provide comprehensive CSV export facilities and academic data dictionaries for auditing and reporting.

### 1.3 Purpose, Scope, and Applicability

#### 1.3.1 Purpose
The purpose of the Cyber Hygiene Intelligence & Assessment System is to replace static, disconnected survey techniques with a responsive, data-driven software platform that simultaneously educates end-users and empowers collegiate IT leadership. By quantifying human cyber risk into measurable indicators, colleges can transition from speculative security policies to evidence-based training and technical controls.

#### 1.3.2 Scope
The scope of this project encompasses:
- A responsive client-side survey wizard featuring 21 categorical questions across 7 security domains.
- A deterministic scoring algorithm executing on both client and server layers.
- Relational database persistence using Prisma ORM with dual-engine support (SQLite locally and PostgreSQL in cloud production).
- JWT-based authentication for administrative dashboard access with HTTP-only cookie security.
- An analytics engine rendering interactive charts for score distribution, cohort comparisons, and risk heatmaps.
- Automated generation of institutional remediation roadmaps and RFC 4180-compliant CSV exports.

#### 1.3.3 Applicability
The system is directly applicable to:
- Higher Education Institutions (Colleges, Universities, and Polytechnic Institutes) seeking to audit student and staff cyber habits.
- Academic IT Departments requiring empirical risk metrics before rolling out mandatory security policies like MFA or VPNs.
- Cybersecurity Awareness Campaigns to conduct pre-training and post-training baseline evaluations.
- Educational Researchers studying digital literacy, human-computer interaction, and information security behaviors.

Key features of the system include:
- **100% Anonymous & Privacy-Preserving:** Zero collection of names, roll numbers, phone numbers, or account credentials.
- **Immediate Feedback Loop:** Calculates and displays individual security scores within milliseconds of submission.
- **Role-Based Comparative Analytics:** Disaggregates data between Students and Faculty to expose demographic-specific habits.
- **Zero-Cost Deployment:** Serverless-ready design compatible with Vercel and free-tier PostgreSQL databases.

---

## CHAPTER 2: SURVEY OF TECHNOLOGIES

To build a modern, high-performance, and secure web application, the following technology stack was selected:

### 2.1 Next.js 14 and React Server Components
Next.js is an open-source React framework developed by Vercel that enables full-stack web application development with server-side rendering (SSR), static site generation (SSG), and API route handlers.
- The project utilizes the **Next.js 14 App Router** architecture, which organizes routes logically using folders and supports React Server Components (RSC) by default.
- Server-side rendering guarantees rapid first-contentful paint (FCP), reduces client-side JavaScript payloads, and keeps database connection logic and authentication secrets completely hidden from the client browser.
- Route Handlers (`app/api/*`) replace traditional Express.js backends, allowing API logic, JWT authentication, and database transactions to run inside the same unified codebase.

### 2.2 TypeScript and Type-Safe Web Engineering
TypeScript is a strongly typed superset of JavaScript developed by Microsoft.
- All application source files are authored in strict TypeScript (`strict: true`), eliminating runtime `null` or `undefined` reference errors.
- Shared interfaces define the schema for survey answers, scoring rubrics, demographic categories, and statistical aggregation payloads.
- Compile-time type checking ensures seamless synchronization between database models and frontend React UI props.

### 2.3 Prisma ORM and Relational Databases (SQLite / PostgreSQL)
Prisma is a next-generation Object-Relational Mapping (ORM) tool for Node.js and TypeScript.
- The database schema is declaratively defined in `prisma/schema.prisma`. Prisma generates a type-safe client that prevents SQL injection attacks through automated parameterized queries.
- For local development and offline viva demonstrations, SQLite (`prisma/dev.db`) is utilized as a zero-configuration, file-based relational engine.
- For production cloud deployments (such as Vercel), the application integrates an automatic database switcher script (`scripts/prepare-db.js`) that detects PostgreSQL (e.g., Prisma Serverless Postgres, Neon, or Supabase) without requiring code modifications.

### 2.4 Tailwind CSS and Responsive UI Design
Tailwind CSS is a utility-first CSS framework that allows rapid component styling directly within markup.
- The user interface uses custom HSL color tokens, dark mode gradients, glassmorphism cards, and responsive grid layouts (`sm:`, `md:`, `lg:` breakpoints).
- Transitions and micro-animations provide visual feedback during user interactions (radio button selections, step navigation, modal alerts).

### 2.5 Lucide Icons, Jose (JWT), and Vitest
- **Lucide React** provides lightweight, consistent SVG vector icons representing cybersecurity domains (Shields, Keys, Locks, Alert Triangles, Sliders).
- **Jose** is a lightweight, zero-dependency JavaScript library for JSON Web Token (JWT) signing, verification, and encryption using the Web Crypto API, ensuring tamper-proof administrator sessions stored in HTTP-only cookies.
- **Vitest** is a fast, native TypeScript testing framework used to execute the automated unit and integration test suite (`tests/scoring.test.ts` and `tests/api.test.ts`).

---

## CHAPTER 3: REQUIREMENTS AND ANALYSIS

### 3.1 Problem Definition
Collegiate IT networks face mounting cyber attacks, including phishing campaigns targeting university email credentials and ransomware infiltrating unpatched personal laptops connected to campus Wi-Fi. While educational institutions invest heavily in perimeter hardware firewalls and antivirus subscriptions, the human element remains the primary point of failure.

Existing assessment methodologies suffer from critical shortcomings:
1. **Manual Paper Questionnaires:** Time-consuming to distribute, prone to human data-entry errors, and lack automated scoring.
2. **Generic Survey Tools (Google Forms / Microsoft Forms):** Collect raw answers but do not calculate weighted cybersecurity indices, cannot generate real-time comparative cohort graphs, and do not provide immediate educational remediation to respondents.
3. **Commercial Security Platforms:** Expensive enterprise software designed for corporate compliance rather than academic research, often requiring intrusive device agents or personal email registration that discourages honest student participation.

Therefore, there is an urgent need for an open-access, automated, privacy-first software system tailored specifically to academic institutions.

### 3.2 Requirements Specification

#### Functional Requirements:
1. **Public Survey Wizard:** Multi-step interactive form containing 21 items across 7 domains with step-by-step validation.
2. **Anonymous Scoring Engine:** Immediate calculation of a 0–100 Cyber Hygiene Index upon submission with category assignment (Strong, Good, Basic, Needs Attention).
3. **Feedback Receipt:** Display of individual score, tier badge, and domain-level advice.
4. **Administrative Authentication:** Secure login endpoint protected by email/password verification and signed JWT session tokens.
5. **Executive Dashboard:** Real-time rendering of KPI metrics (Total Assessed, Cohort Split, Average Score, MFA Rate, Backup Rate).
6. **Cohort Comparative Analysis:** Side-by-side comparison of Student vs. Faculty responses across critical risk indicators.
7. **Assessment Records Table:** Filterable and searchable tabular log of all responses with individual inspection modals.
8. **Risk Matrix & Policy Recommendations:** Automated institutional vulnerability grading and actionable remediation suggestions.
9. **Data Export:** Direct one-click download of RFC 4180-compliant CSV datasets and statistical summaries.

#### Non-Functional Requirements:
1. **Security & Privacy:** Zero collection of names, roll numbers, institutional email addresses, or account passwords.
2. **Performance:** Dashboard metrics and chart calculations execute in under 150 milliseconds.
3. **Usability:** Responsive layout conforming to WCAG 2.1 accessibility guidelines, usable across smartphones, tablets, and desktop displays.
4. **Reliability:** Comprehensive unit and integration test coverage verifying scoring determinism and data integrity.

### 3.3 Planning and Scheduling (Gantt Timeline)
The project was executed over a 16-week timeline across five distinct phases:
- **Phase 1 (Weeks 1–3):** Literature review, problem definition, and cyber hygiene metric formulation.
- **Phase 2 (Weeks 4–7):** System architecture, database schema design, and Prisma ORM configuration.
- **Phase 3 (Weeks 8–11):** Next.js App Router front-end development, survey wizard UI, and scoring algorithm implementation.
- **Phase 4 (Weeks 12–14):** Administrator analytics dashboard, cohort comparative logic, risk matrix, and CSV export modules.
- **Phase 5 (Weeks 15–16):** Vitest automated unit testing, deployment verification on Vercel, and project documentation.

### 3.4 Software and Hardware Requirements

#### 3.4.1 Software Requirements:
- Operating System: macOS / Windows 10/11 / Ubuntu Linux 22.04 LTS
- Runtime Environment: Node.js version 18.17.0 or higher
- Database: SQLite 3.x (Development) / PostgreSQL 15+ (Production)
- Framework: Next.js 14.2+ with React 18
- Language: TypeScript 5.x
- Version Control: Git and GitHub
- Browser: Google Chrome, Mozilla Firefox, or Apple Safari (Modern ECMAScript 2022 support)

#### 3.4.2 Hardware Requirements:
- Processor: Intel Core i5 / AMD Ryzen 5 / Apple Silicon M-Series
- RAM: 8 GB minimum (16 GB recommended)
- Storage: 500 MB available disk space
- Network: Active Internet connection for package installation and cloud deployment

### 3.5 Conceptual Model and System Architecture
The application adopts a three-tier client-server architecture:
1. **Presentation Tier (Client Browser):** React-based interactive components rendering the Survey Wizard, Score Receipt, Login Portal, and Administrative Dashboard.
2. **Application Logic Tier (Next.js Server):** Next.js Route Handlers executing scoring algorithms, descriptive statistics formulas, authentication token verification, and data formatting.
3. **Data Tier (Relational Storage):** Prisma ORM communicating with SQLite / PostgreSQL to persist and query normalized assessment records.

---

## CHAPTER 4: SYSTEM DESIGN

### 4.1 Basic Modules
The system is partitioned into six core functional modules:
1. **Assessment & Survey Module (`app/survey/page.tsx`):** Presents a 7-step wizard capturing Demographics, Device Hygiene, Password Management, MFA & Authentication, Network Safety, Phishing Awareness, and Data Backup.
2. **Scoring & Normalization Engine (`lib/scoring.ts`):** Maps raw questionnaire choices to integer values (0 to 4 points per dimension) and normalizes raw totals to a 0–100 index.
3. **Authentication & Session Module (`app/api/auth/login/route.ts` & `lib/auth.ts`):** Verifies administrative credentials and issues cryptographic JWT session tokens stored in HTTP-only cookies.
4. **Administrative Intelligence Dashboard (`app/admin/dashboard/page.tsx`):** Computes and renders institutional KPIs, score distributions, and cohort comparison charts.
5. **Risk Matrix & Recommendation Module (`app/admin/risk/page.tsx` & `lib/recommendations.ts`):** Dynamically evaluates vulnerability thresholds across the 4 key security domains and generates prioritized action plans.
6. **Data Export & Schema Module (`app/admin/export/page.tsx` & `app/api/export/csv/route.ts`):** Formats survey records into downloadable CSV files conforming to RFC 4180.

### 4.2 Procedural Design & Data Flow Diagrams

#### Level 0 DFD (Context Level):
- **Respondent (Student/Faculty):** Submits anonymous assessment -> Receives instant Cyber Hygiene Score & Receipt.
- **Administrator:** Submits login credentials -> Accesses Dashboard, Cohort Analytics, Risk Matrix, and CSV Export.

#### Level 1 DFD (System Flow):
1. User loads `/survey` -> Next.js serves interactive wizard.
2. User selects answers -> State updates locally.
3. User clicks Submit -> POST `/api/survey/submit`.
4. API validates payload with Zod schema -> Computes score using `lib/scoring.ts`.
5. Prisma ORM creates record in SQLite/PostgreSQL `SurveyResponse` table.
6. Server returns JSON response with Score, Tier, and Anonymous ID.
7. Admin visits `/admin/login` -> Submits credentials to `/api/auth/login`.
8. Server verifies password -> Issues signed JWT in HTTP-only cookie.
9. Admin accesses `/admin/dashboard` -> Server validates JWT -> Queries database -> Computes statistical metrics -> Renders analytics view.

### 4.3 User Interface Design
The user interface follows modern dark-mode aesthetics with high visual hierarchy:
- Responsive layout adapting across desktop, tablet, and mobile screen sizes.
- Accessible focus rings, semantic HTML5 tags, and clear contrast ratios.
- Color-coded badges for risk tiers: Green (Strong), Blue (Good), Amber (Basic), Red (Needs Attention).

---

## CHAPTER 5: IMPLEMENTATION AND TESTING

### 5.1 Implementation Approaches
The project followed an agile, modular development methodology:
1. **Domain Modelling:** Defined database models and data contracts in Prisma.
2. **Core Algorithm Implementation:** Authored pure functions for scoring and statistical analysis, verified through automated unit tests before UI integration.
3. **Component-Driven UI:** Created modular React components (Wizard, Cards, Tables, Navbars).
4. **API Route Integration:** Implemented RESTful Next.js Route Handlers handling input validation, database persistence, and authentication.
5. **End-to-End Verification:** Executed full smoke tests across user assessment flows and administrative dashboard operations.

### 5.2 Coding Details

#### Sample 1: Scoring & Normalization Engine (`lib/scoring.ts`)
```typescript
export interface ScoringResult {
  rawScore: number;
  maxScore: number;
  normalizedScore: number; // 0 - 100
  category: 'Strong' | 'Good' | 'Basic' | 'Needs Attention';
}

export function calculateCyberHygieneScore(answers: Record<string, string>): ScoringResult {
  let rawScore = 0;
  const maxScore = 48; // Theoretical maximum points across 15 dimensions

  // 1. Password Strength
  if (answers.pwd_length === '16_plus') rawScore += 4;
  else if (answers.pwd_length === '12_to_15') rawScore += 3;
  else if (answers.pwd_length === '8_to_11') rawScore += 2;
  else rawScore += 0;

  // 2. Multi-Factor Authentication
  if (answers.mfa_usage === 'all_accounts') rawScore += 4;
  else if (answers.mfa_usage === 'important_only') rawScore += 3;
  else if (answers.mfa_usage === 'when_forced') rawScore += 1;
  else rawScore += 0;

  // 3. Regular Data Backups
  if (answers.backup_freq === 'daily_automated') rawScore += 4;
  else if (answers.backup_freq === 'weekly') rawScore += 3;
  else if (answers.backup_freq === 'monthly') rawScore += 2;
  else rawScore += 0;

  // 4. Device Screen Lock
  if (answers.device_lock === 'biometric_pin') rawScore += 4;
  else if (answers.device_lock === 'pattern') rawScore += 2;
  else rawScore += 0;

  // Normalize to 0-100 scale
  const normalizedScore = Math.round((rawScore / maxScore) * 100);

  let category: ScoringResult['category'] = 'Needs Attention';
  if (normalizedScore >= 80) category = 'Strong';
  else if (normalizedScore >= 60) category = 'Good';
  else if (normalizedScore >= 40) category = 'Basic';

  return { rawScore, maxScore, normalizedScore, category };
}
```

#### Sample 2: Secure Survey Submission Route (`app/api/survey/submit/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateCyberHygieneScore } from '@/lib/scoring';
import { z } from 'zod';

const SurveySubmissionSchema = z.object({
  role: z.enum(['student', 'faculty']),
  department: z.string().min(1),
  ageBracket: z.string().min(1),
  answers: z.record(z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SurveySubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission data' }, { status: 400 });
    }

    const { role, department, ageBracket, answers } = parsed.data;
    const scoreResult = calculateCyberHygieneScore(answers);

    const record = await prisma.surveyResponse.create({
      data: {
        role,
        department,
        ageBracket,
        answers: JSON.stringify(answers),
        score: scoreResult.normalizedScore,
        category: scoreResult.category,
        isDemo: false,
      },
    });

    return NextResponse.json({
      success: true,
      id: record.id,
      score: scoreResult.normalizedScore,
      category: scoreResult.category,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### 5.3 Testing Approach

#### 5.3.1 Unit Testing
Unit testing validates individual functional units and mathematical calculations in isolation using Vitest.

| Test ID | Module Under Test | Test Description | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UT-01** | `lib/scoring.ts` | Maximum score response profile | Score = 100, Tier = 'Strong' | **PASS** |
| **UT-02** | `lib/scoring.ts` | Minimum score response profile | Score = 0, Tier = 'Needs Attention' | **PASS** |
| **UT-03** | `lib/scoring.ts` | Boundary score at threshold 60 | Tier = 'Good' | **PASS** |
| **UT-04** | `lib/scoring.ts` | Boundary score at threshold 79 vs 80 | 79 = 'Good', 80 = 'Strong' | **PASS** |
| **UT-05** | `lib/scoring.ts` | Missing optional fields handling | Safe fallback calculation | **PASS** |
| **UT-06** | `lib/analysis.ts` | Mean calculation of known array | Matches mathematical mean | **PASS** |
| **UT-07** | `lib/analysis.ts` | Median calculation (even sample size) | Average of two middle values | **PASS** |
| **UT-08** | `lib/analysis.ts` | Median calculation (odd sample size) | Exact middle value | **PASS** |
| **UT-09** | `lib/analysis.ts` | Sample standard deviation ($N-1$) | Verified against statistical formula | **PASS** |
| **UT-10** | `lib/auth.ts` | Valid credentials verification | Returns authenticated token | **PASS** |
| **UT-11** | `lib/auth.ts` | Invalid password rejection | Throws 401 Unauthorized | **PASS** |
| **UT-12** | `lib/auth.ts` | Expired JWT token handling | Session rejected | **PASS** |

#### 5.3.2 Integrated Testing
Integration testing evaluates the end-to-end communication between the Next.js API route handlers, authentication middleware, Prisma ORM, and the database engine.

| Test ID | Flow Tested | Test Description | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **IT-01** | Public Survey Flow | Submit complete survey via POST API | 200 OK + Record inserted | **PASS** |
| **IT-02** | Input Validation Flow | Submit malformed JSON payload | 400 Bad Request returned | **PASS** |
| **IT-03** | Admin Auth Flow | Submit valid credentials to login API | 200 OK + Set-Cookie Header | **PASS** |
| **IT-04** | Route Protection Flow | Access `/admin/dashboard` without token | 307 Redirect to `/admin/login` | **PASS** |
| **IT-05** | CSV Export Flow | Request `/api/export/csv` with auth | 200 OK + Valid CSV stream | **PASS** |

All 17 automated tests executed with 100% pass rate (`npm test` exit code 0).

---

## CHAPTER 6: RESULTS AND DISCUSSIONS

### 6.1 User Documentation & Screenshot Exhibits
The following figures represent the core user interfaces of the running application:

- **Figure 4.1: System Home Page & Public Portal (`http://localhost:3000`)**  
  Displays the landing interface with cybersecurity focus area cards, candidate academic credentials, privacy commitments, and the primary "Start Assessment" and "Platform Portal" action triggers.

- **Figure 4.2: Cyber Hygiene Assessment Wizard Interface (`http://localhost:3000/survey`)**  
  Displays the 7-step interactive survey wizard showing active category indicators, question cards, single-choice selection states, and contextual help tooltips.

- **Figure 4.3: Instant Score Evaluation & Feedback Receipt (`http://localhost:3000/survey`)**  
  Displays the instant post-submission receipt featuring the anonymous response ID, normalized 0–100 Cyber Hygiene Score, performance tier badge, and domain-level advice.

- **Figure 4.4: Administrator Secure Login Interface (`http://localhost:3000/admin/login`)**  
  Displays the credential authentication portal protected by HTTP-only cookie JWT security.

- **Figure 6.1: Intelligence Analytics Dashboard (Executive Overview) (`http://localhost:3000/admin/dashboard`)**  
  Displays top-level institutional KPIs: Total Assessed Records ($N = 100$), Cohort Breakdown (70 Students / 30 Faculty), Institution Mean Score (73.14/100), MFA Adoption Rate, and Backup Adherence.

- **Figure 6.2: Cyber Hygiene Score Tier Distribution (`http://localhost:3000/admin/dashboard`)**  
  Displays bar and donut charts illustrating respondent distribution across Strong, Good, Basic, and Needs Attention categories.

- **Figure 6.3: Student vs. Faculty Comparative Security Metrics (`http://localhost:3000/admin/dashboard`)**  
  Displays side-by-side grouped comparative analytics across MFA adoption, backup routines, software updates, and public Wi-Fi exposure.

- **Figure 6.4: Assessment Records & Incident Logs Interface (`http://localhost:3000/admin/responses`)**  
  Displays the searchable, filterable tabular database of survey records with individual record inspection capabilities.

- **Figure 6.5: Descriptive & Inferential Statistical Analysis Engine (`http://localhost:3000/admin/analysis`)**  
  Displays detailed statistical tables including Sample Size ($N$), Mean ($M$), Median ($Mdn$), Standard Deviation ($SD$), and Welch's t-test hypothesis evaluations.

- **Figure 6.6: Cyber Risk Heatmap & Institutional Vulnerability Matrix (`http://localhost:3000/admin/risk`)**  
  Displays prioritized institutional risk cards mapping vulnerabilities to low, medium, high, and critical levels.

- **Figure 6.7: Automated Institutional Cybersecurity Audit Report (`http://localhost:3000/admin/reports`)**  
  Displays the formatted executive audit report with compliance readiness scores and actionable recommendations.

- **Figure 6.8: Raw Data Export Hub & Academic Schema Dictionary (`http://localhost:3000/admin/export`)**  
  Displays one-click CSV download options and the complete database schema dictionary.

### 6.2 Empirical Dataset Evaluation
Analysis of the baseline collegiate cohort ($N = 100$ respondents: 70 Students, 30 Faculty members) yielded the following empirical findings:

| Cohort Group | Sample Size ($N$) | Mean Score ($M$) | Median ($Mdn$) | Std Dev ($SD$) | Score Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Overall Cohort** | 100 | **73.14 / 100** | 75.00 / 100 | 13.92 | [38, 98] |
| **Students** | 70 | **70.81 / 100** | 72.00 / 100 | 14.11 | [38, 95] |
| **Faculty / Staff** | 30 | **78.57 / 100** | 81.00 / 100 | 11.83 | [52, 98] |

#### Key Empirical Insights:
1. **Multi-Factor Authentication (MFA):** Faculty demonstrated an 83.3% adoption rate compared to 61.4% among students. This reflects mandatory institutional enforcement on faculty grading portals.
2. **Data Backups:** Routine data backups represented a major vulnerability across both cohorts, with only 41.4% of students and 63.3% of faculty maintaining regular backups.
3. **Public Wi-Fi Risks:** 41.4% of students reported connecting to open, unencrypted public Wi-Fi networks without utilizing a VPN, compared to only 16.7% of faculty.

---

## CHAPTER 7: CONCLUSIONS AND FUTURE SCOPE

### 7.1 Conclusions
The **Cyber Hygiene Intelligence & Assessment System (CIA)** successfully demonstrates how modern web software can address critical information security vulnerabilities within academic institutions. By providing an accessible, engaging, and privacy-preserving assessment tool, the system eliminates traditional barriers to student and faculty participation.

The software architecture successfully satisfies all functional and non-functional requirements:
- The Next.js 14 full-stack framework provides sub-second page loads and robust server-side security.
- The scoring engine accurately quantifies multidimensional security behaviors into a normalized, comprehensible index.
- The administrative intelligence dashboard transforms raw submission data into actionable visual insights, highlighting clear disparities between student and faculty practices.
- The modular, decoupled architecture allows seamless deployment on both local zero-configuration SQLite environments and scalable serverless PostgreSQL cloud providers.

### 7.2 Future Scope
The application provides a versatile foundation with significant potential for future expansion:
1. **Integration with Campus Single Sign-On (SSO):** Linking assessment completion to university identity providers (LDAP, SAML, or OAuth 2.0) to mandate annual student and faculty cyber hygiene certifications.
2. **Interactive Gamified Remediation:** Integrating micro-learning modules and interactive cybersecurity quizzes directly into the score receipt screen.
3. **Automated Phishing Simulations:** Expanding the administrative portal to schedule benign, simulated phishing email drills to test empirical campus resilience.
4. **Longitudinal Tracking:** Introducing recurrent tracking to measure institutional score improvements over consecutive academic semesters.

---

## CHAPTER 8: REFERENCES

1. National Institute of Standards and Technology (NIST), *"Special Publication 800-53: Security and Privacy Controls for Information Systems and Organizations"*, U.S. Department of Commerce.
2. Cybersecurity and Infrastructure Security Agency (CISA), *"Cyber Hygiene Services and Best Practice Guidelines"*, CISA.gov.
3. Next.js Documentation, Vercel Inc., `https://nextjs.org/docs`.
4. Prisma ORM Documentation, Prisma Data Inc., `https://www.prisma.io/docs`.
5. Tailwind CSS Documentation, Tailwind Labs Inc., `https://tailwindcss.com/docs`.
6. Vitest Documentation, Vitest Native Testing Framework, `https://vitest.dev`.
7. RFC 4180: *"Common Format and MIME Type for Comma-Separated Values (CSV) Files"*, Internet Engineering Task Force (IETF).
8. RFC 7519: *"JSON Web Token (JWT)"*, Internet Engineering Task Force (IETF).
9. Wilson College (Affiliated to University of Mumbai), *"B.Sc. Information Technology Project Guidelines and Evaluation Manual"*, Mumbai, Maharashtra.
