# Executive One-Page Project Summary
### B.Sc. Information Technology • Academic Year 2025–2026

---

### Project Title
**Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System**

### Student Researcher
**Dhruv Gupta** • Candidate for Bachelor of Science in Information Technology (B.Sc. IT)

---

### 1. Problem Statement
Higher education institutions are prime targets for cyber threats due to distributed campus networks and the widespread use of unmanaged personal laptops and smartphones. While colleges implement network firewalls, the human element remains vulnerable. Students and faculty frequently demonstrate inconsistent security behaviors—such as password reuse, delayed patching, unverified link clicking, and risky habits on public Wi-Fi—creating severe institutional vulnerabilities that lack localized empirical measurement.

### 2. Project Objectives
1. **Instrument Design:** Design and deploy a secure, mobile-friendly 21-question anonymous questionnaire across 6 cyber hygiene domains.
2. **Behavioral Scoring:** Formulate an objective, normalized Survey-Based Cyber Hygiene Score (0–100 scale) to quantify individual digital security posture.
3. **Comparative Analysis:** Empirically compare adherence patterns between Student and Faculty/Staff cohorts to pinpoint specific demographic vulnerabilities.
4. **Actionable Insights:** Programmatically generate evidence-based policy recommendations to assist college IT administrators in hardening campus security.

### 3. Research Questions
- **RQ1:** What is the baseline level of cyber hygiene among college students and faculty?
- **RQ2:** Are there statistically observable variations in specific practices (MFA, password management, routine backups) between student and faculty cohorts?
- **RQ3:** Which cyber hygiene practices exhibit the lowest institutional compliance and require immediate intervention?

### 4. Research Methodology
- **Research Design:** Empirical, quantitative cross-sectional survey.
- **Sampling Strategy:** Non-probability convenience sampling across university departments.
- **Ethics & Privacy:** Complete respondent anonymity (no names, emails, student IDs, or IP addresses).
- **Analytical Methods:** Descriptive statistics (Mean, Median, Standard Deviation, Score Range) and Welch's two-sample $t$-test for cohort comparison.

### 5. Technology Stack
- **Frontend & Full-Stack Framework:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React icons.
- **Data Visualizations:** Recharts (10 interactive charts including Pie, Bar, Grouped, and Comparative indicators).
- **Backend & Database:** Node.js, Prisma ORM 6, embedded portable SQLite database (`dev.db`).
- **Authentication & Security:** Jose (JWT in HTTP-only cookies), Zod schema validation, parameterized SQL queries.
- **Testing Engine:** Vitest automated unit and integration test runner.

### 6. Main System Modules
1. **Public Survey Wizard (`/survey`):** 7-step wizard with real-time validation and instant score receipt feedback.
2. **Admin Authentication (`/admin/login`):** Secure token-based gateway protected against unauthorized access.
3. **Analytics Dashboard (`/admin/dashboard`):** Real-time KPI summaries, 10 dynamic charts, and cohort toggle filters.
4. **Statistical Analysis Engine (`/admin/analysis`):** Descriptive metrics, practice rankings, and Welch's $t$-test calculation.
5. **Responses Management (`/admin/responses`):** Paginated, searchable questionnaire table with complete response modal inspection and demo purge control.
6. **Export System (`/admin/export`):** RFC-4180 compliant CSV export for raw questionnaires and summary reports.

### 7. Scoring & Analytical Framework
- **Score Scale:** 0 to 100 points normalized from 15 scored behavioral items (maximum raw points: 75).
- **Categories:** Strong (80–100), Good (60–79), Basic (40–59), Needs Improvement (0–39).
- **Institutional Recommendations:** Dynamic rule engine triggering targeted campus interventions (e.g. cloud backup workshops, phishing simulation drills) based on dataset compliance thresholds.

### 8. Testing & Verification Summary
- **Automated Tests:** 17/17 tests passing (`npm test`), validating scoring logic, input sanitization, descriptive statistics, RFC-4180 CSV generation, and real vs. demo database isolation.
- **Production Build:** Next.js build passes cleanly (`exit code 0`), with 16 routes compiled and zero type or lint errors.

### 9. Current Demo Status & Academic Integrity
- **Current Data State:** Populated with 100 neutral, unforced synthetic demonstration records (70 students, 30 faculty) generated via deterministic Mulberry32 PRNG.
- **Data Labeling:** All synthetic records are explicitly tagged (`isDemo = true`) and flagged with prominent **DEMO DATASET** banners across all analytical views and CSV exports.
- **Zero Fabrication:** The system clearly demarcates prototype demo baselines from real field findings. A single click on **Purge Synthetic Demo Data** resets the system for authentic survey collection.

### 10. Future Scope
- Expansion to multi-college cross-institutional studies.
- Automated email delivery of personalized PDF cyber hygiene audit cards.
- Pre- and post-training longitudinal assessment modules.
