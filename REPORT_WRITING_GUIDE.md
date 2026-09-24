# Academic Report Writing Guide & Phrase Bank
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  

This guide provides structured academic phrase templates and chapter outlines designed to help Dhruv compose his formal B.Sc. IT project report once real field data collection is completed.

---

## 1. Academic Phrasing Templates (Data Grounding)

Use these rigorous academic sentence structures when presenting survey statistics in Chapters 5, 6, and 7.

### 1.1 Sample Description & Demographics
- *"The survey was administered anonymously to a collegiate cohort of $N = \underline{\hspace{1cm}}$ respondents, comprising $\underline{\hspace{1cm}}$ students ($\underline{\hspace{1cm}}\%$) and $\underline{\hspace{1cm}}$ faculty and administrative staff members ($\underline{\hspace{1cm}}\%$)."*
- *"Among the participating students, the predominant discipline of study was $\underline{\hspace{2cm}}$, accounting for $\underline{\hspace{1cm}}\%$ of student responses."*
- *"Because voluntary convenience sampling was utilized, the findings describe behavioral tendencies within the surveyed institution and are not purported to represent universal collegiate trends."*

### 1.2 Cyber Hygiene Score Findings
- *"The overall mean Survey-Based Cyber Hygiene Score achieved by respondents was $\underline{\hspace{1cm}}$ out of 100 ($SD = \underline{\hspace{1cm}}$, $Mdn = \underline{\hspace{1cm}}$)."*
- *"Scores ranged from a minimum of $\underline{\hspace{1cm}}$ to a maximum of $\underline{\hspace{1cm}}$, indicating noticeable variation in personal security habits."*
- *"Categorical classification revealed that $\underline{\hspace{1cm}}\%$ of participants fell into the 'Strong' tier (80–100), $\underline{\hspace{1cm}}\%$ into 'Good' (60–79), $\underline{\hspace{1cm}}\%$ into 'Basic' (40–59), and $\underline{\hspace{1cm}}\%$ into the 'Needs Improvement' category (0–39)."*

### 1.3 Specific Practice Adoption
- *"Multi-factor authentication (MFA) was actively utilized on important accounts by $\underline{\hspace{1cm}}\%$ of surveyed respondents, while $\underline{\hspace{1cm}}\%$ reported relying strictly on single-password mechanisms."*
- *"Routine file backup protocols demonstrated comparatively low adherence, with only $\underline{\hspace{1cm}}\%$ of respondents maintaining regular data backups."*
- *"Primary device locking via PIN, password, or biometrics emerged as the most widely observed practice ($\underline{\hspace{1cm}}\%$ adoption)."*
- *"In contrast, dedicated password manager adoption represented the weakest practice ($\underline{\hspace{1cm}}\%$), highlighting widespread reliance on memory or browser autofill."*

### 1.4 Student vs. Faculty Group Comparison
- *"Faculty respondents achieved a higher mean Cyber Hygiene Score ($M = \underline{\hspace{1cm}}$) compared to student respondents ($M = \underline{\hspace{1cm}}$), reflecting an absolute difference of $\underline{\hspace{1cm}}$ points."*
- *"MFA enrollment was substantially higher among faculty ($\underline{\hspace{1cm}}\%$) than students ($\underline{\hspace{1cm}}\%$), likely driven by mandatory institutional requirements on staff grading and email portals."*
- *"Students reported significantly higher frequencies of public Wi-Fi usage ($\underline{\hspace{1cm}}\%$) than faculty ($\underline{\hspace{1cm}}\%$), increasing their exposure to open-network threats."*

### 1.5 Inferential Hypothesis Testing (t-Test)
- **If $p < 0.05$ (Statistically Significant):**  
  *"An independent two-sample Welch's t-test demonstrated a statistically significant difference in Cyber Hygiene Scores between Student respondents ($M = \underline{\hspace{1cm}}$, $SD = \underline{\hspace{1cm}}$, $n_1 = \underline{\hspace{1cm}}$) and Faculty respondents ($M = \underline{\hspace{1cm}}$, $SD = \underline{\hspace{1cm}}$, $n_2 = \underline{\hspace{1cm}}$); $t(\underline{\hspace{1cm}}) = \underline{\hspace{1cm}}$, $p = \underline{\hspace{1cm}}$ ($p < 0.05$). Consequently, the null hypothesis of equal cohort scores is rejected for this surveyed sample."*
- **If $p \ge 0.05$ (Not Statistically Significant):**  
  *"An independent two-sample Welch's t-test indicated no statistically significant difference in Cyber Hygiene Scores between Student respondents ($M = \underline{\hspace{1cm}}$, $SD = \underline{\hspace{1cm}}$) and Faculty respondents ($M = \underline{\hspace{1cm}}$, $SD = \underline{\hspace{1cm}}$); $t(\underline{\hspace{1cm}}) = \underline{\hspace{1cm}}$, $p = \underline{\hspace{1cm}}$ ($p \ge 0.05$). Observable score variations may be attributed to random sampling fluctuations within the cohort."*

---

## 2. Chapter-by-Chapter Report Writing Outline

Following the standard academic B.Sc. IT dissertation structure:

### Chapter 1: Introduction
- **1.1 Background:** Expanding reliance on mobile devices, cloud ecosystems, and personal laptops in higher education.
- **1.2 Definition of Cyber Hygiene:** Daily proactive routines that preserve device integrity, credential safety, and data redundancy.
- **1.3 Problem Statement:** The disparity between heavy digital consumption and lax digital hygiene among campus users.
- **1.4 Project Objectives:** Build an automated survey and analytical tool to assess, quantify, and visualize campus cyber awareness.
- **1.5 Scope & Deliverables:** Anonymous 21-item survey web app, scoring engine, administrative dashboard, and CSV export.

### Chapter 2: Literature & Technology Survey
- **2.1 Theoretical Framework:** Review of cybersecurity awareness models (e.g., Protection Motivation Theory).
- **2.2 Existing Field Studies:** Survey of published literature on student password behaviors, phishing susceptibility, and campus Wi-Fi hazards.
- **2.3 Existing Tools vs. Proposed System:** Comparing generic Google Forms (which lack custom scoring, real-time t-tests, and role-based comparative analytics) against this purpose-built field research platform.
- **2.4 Technology Stack Justification:** Next.js (App Router), TypeScript, SQLite with Prisma ORM, and Recharts.

### Chapter 3: Research Methodology & Requirements Analysis
- **3.1 Research Design:** Cross-sectional quantitative field study.
- **3.2 Population & Sampling:** Collegiate convenience sampling; target sample size criteria.
- **3.3 Survey Instrument:** Detailed rationale behind each of the 21 questions across Sections A through G.
- **3.4 Cyber Hygiene Index (0–100):** Mathematical normalization formula and category thresholds.
- **3.5 Ethical Considerations:** Guarantees of anonymity and zero collection of credentials or PII.

### Chapter 4: System Design & Architecture
- **4.1 Architectural Overview:** Next.js client-server model, API routes, and database layer.
- **4.2 Database Schema:** ER diagram and Prisma model definition for `SurveyResponse`.
- **4.3 Scoring & Analytics Modules:** Component breakdown of `lib/scoring.ts`, `lib/analysis.ts`, and `lib/recommendations.ts`.
- **4.4 Security Architecture:** Jose JWT authentication, HTTP-only cookie configuration, and Zod input validation.

### Chapter 5: Implementation & Testing
- **5.1 Implementation Details:** Multi-step wizard UI, state management, and real-time chart rendering with Recharts.
- **5.2 Automated Testing:** Unit test suite covering scoring normalization, descriptive statistics, and Zod validation.
- **5.3 Test Case Verification Table:** Complete transcript of test cases from `TESTING.md`.

### Chapter 6: Field Survey Results & Statistical Analysis
- **6.1 Demographic Breakdown:** Charts and tables depicting student and faculty participation.
- **6.2 Descriptive Score Distribution:** Mean, median, standard deviation, and category percentages.
- **6.3 Visual Analytics:** Screenshots of the 10 Recharts graphs generated by the system.
- **6.4 Student vs. Faculty Cross-Tabulation:** Side-by-side analysis of MFA, backups, updates, and phishing confidence.
- **6.5 Inferential Statistics:** Formal presentation of Welch's t-test with test statistics and academic interpretation.
- **6.6 Practice Hierarchy:** Ranked list of cybersecurity habits from highest compliance to lowest compliance.

### Chapter 7: Institutional Recommendations & Conclusion
- **7.1 Discussion of Findings:** Synthesis of empirical findings in relation to research questions RQ1–RQ6.
- **7.2 Rule-Based Recommendations:** Implementation strategies for campus MFA enforcement, backup drives, and phishing drills.
- **7.3 Study Limitations:** Acknowledgment of convenience sampling, sample size constraints, and self-reporting bias.
- **7.4 Future Scope:** Expanding to multi-campus longitudinal tracking and automated phishing simulation integration.
