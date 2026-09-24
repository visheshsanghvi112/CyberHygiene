# Academic Project Report Screenshot Checklist
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  
**Academic Year:** 2025–2026

---

Use this checklist tomorrow to capture high-resolution screenshots for your final project documentation, PowerPoint presentation slides, or printed report appendices.

---

### Screenshot 1: Project Landing / Home Page
- **URL:** `http://localhost:3000`
- **Viewport:** Desktop browser (1280px or 1440px wide).
- **What Must Be Visible:**
  - Project title header: *"Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System"*.
  - Candidate badge: *"Dhruv Gupta • B.Sc. Information Technology"*.
  - Call-to-Action buttons: **"Participate in Survey"** and **"Researcher Portal"**.
  - Four key research focus area cards: *Authentication Security*, *Device & Patch Hygiene*, *Phishing & Social Engineering*, and *Network & Wi-Fi Safety*.
  - Privacy commitment notice (100% anonymous, zero credential collection).

---

### Screenshot 2: Interactive Survey Wizard Step
- **URL:** `http://localhost:3000/survey`
- **Viewport:** Desktop or tablet view (Step 2 or Step 3).
- **What Must Be Visible:**
  - Step progress indicator (e.g., *"Step 2 of 7: Password Hygiene & Management"*).
  - Clean question cards with single-choice selection buttons.
  - Interactive radio-style selection states (indigo highlighted active choice).
  - Navigation buttons: **"Back"** and **"Next Step"**.
  - Contextual help text explaining security terms clearly to non-technical respondents.

---

### Screenshot 3: Survey Submission & Score Receipt
- **URL:** `http://localhost:3000/survey` (After submitting questionnaire)
- **Viewport:** Desktop centered modal/card.
- **What Must Be Visible:**
  - Green checkmark icon with *"Thank You for Your Participation!"*.
  - Anonymous Response ID box with *"Privacy Status: 100% Anonymous • Non-identifiable"*.
  - Personalized **Survey-Based Cyber Hygiene Score** receipt (e.g., `85 / 100` with category badge `Strong`).
  - Clear methodology disclaimer: *"The score is an academic survey-derived measure created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark."*
  - **"Return to Homepage"** button.

---

### Screenshot 4: Administrator Authentication Portal
- **URL:** `http://localhost:3000/admin/login`
- **Viewport:** Desktop centered authentication card.
- **What Must Be Visible:**
  - Academic portal shield badge and title: *"Academic Research Portal"*.
  - Secure login form with Email and Password inputs.
  - Development/Demo credential helper card (`admin@college.edu` / `CyberHygiene2026!`).
  - Security footer note indicating JWT authentication via HTTP-only cookies.

---

### Screenshot 5: Admin Analytics Dashboard (Top Overview)
- **URL:** `http://localhost:3000/admin/dashboard`
- **Viewport:** Full-width desktop view.
- **What Must Be Visible:**
  - Header: *"Cyber Hygiene Research Dashboard"* with *"Academic Analytics Engine"* badge.
  - Dataset Filter tabs: **"All Records"**, **"Real Responses Only"**, and **"Synthetic Demo Only"**.
  - Prominent **DEMO DATASET** alert banner.
  - Top 4 KPI metric cards:
    - *Total Responses* (e.g., `100` with real/demo breakdown)
    - *Cohort Split* (`70 Students / 30 Faculty`)
    - *Average Cyber Hygiene Score* (e.g., `73.14 / 100`)
    - *MFA Adoption & Regular Backup Rates*
  - Quick action links to Responses, Analysis, and Export pages.

---

### Screenshot 6: Cyber Hygiene Score Distribution Chart
- **URL:** `http://localhost:3000/admin/dashboard` (Scroll to Chart 2)
- **Viewport:** Desktop view of Chart 1 & Chart 2.
- **What Must Be Visible:**
  - Chart 1: *Respondent Type Distribution* donut chart showing 70% Students vs. 30% Faculty/Staff.
  - Chart 2: *Cyber Hygiene Score Distribution* bar chart displaying respondent counts across the 4 categorical tiers (*Strong*, *Good*, *Basic*, *Needs Attention*).
  - Clear axis labels and tooltips.

---

### Screenshot 7: Student vs. Faculty Comparative Analysis Charts
- **URL:** `http://localhost:3000/admin/dashboard` (Scroll to Row 2)
- **Viewport:** Desktop view of Chart 3 & Comparative Indicators.
- **What Must Be Visible:**
  - Chart 3: *Average Cyber Hygiene Score: Students vs. Faculty* grouped bar chart comparing Mean and Median scores side-by-side.
  - *Key Security Indicators* comparative chart comparing student vs. faculty adoption percentages across MFA, backups, updates, strong passwords, and phishing confidence.
  - Descriptive academic subtitles rather than absolute superiority claims.

---

### Screenshot 8: Questionnaire Responses Management Table
- **URL:** `http://localhost:3000/admin/responses`
- **Viewport:** Desktop tabular view.
- **What Must Be Visible:**
  - Page header with **"Purge Synthetic Demo Data"** red button and **"Export CSV"** button.
  - Search filter input and dropdown selectors (Role, Score Category, Origin).
  - Data table displaying:
    - Response ID (anonymized hash)
    - Origin badge (`Synthetic Demo` in amber or `Real Field Response` in emerald)
    - Role (`Student` or `Faculty/Staff`)
    - Academic Area & Age Bracket
    - Normalized Cyber Hygiene Score & Tier Badge
    - Date timestamp
  - **"Inspect"** button on individual rows.

---

### Screenshot 9: Detailed Academic Statistical Analysis Page
- **URL:** `http://localhost:3000/admin/analysis`
- **Viewport:** Desktop view of Section 1 & Section 2.
- **What Must Be Visible:**
  - Header: *"Statistical Analysis & Group Comparisons"*.
  - Score Methodology Framework card detailing the 15 dimensions and point mapping.
  - Section 1: *Descriptive Statistics Table* displaying Sample Size ($N$), Mean ($M$), Median ($Mdn$), Standard Deviation ($SD$), and Score Range [$Min, Max$].
  - Section 2: *Comparative Analysis Table* showing Students vs. Faculty across 7 key indicators with absolute variance columns.

---

### Screenshot 10: Inferential Statistical Hypothesis Test (Welch's t-Test)
- **URL:** `http://localhost:3000/admin/analysis` (Scroll to Section 3)
- **Viewport:** Desktop view of Section 3.
- **What Must Be Visible:**
  - Section Header: *"3. Demonstration Statistical Test — Based on Synthetic Demo Data"*.
  - Demonstration Warning Notice: *"Because the current dataset consists of synthetic demonstration records, inferential statistics shown here are for software demonstration only..."*.
  - Statistical metric cards: Test Method (*Welch's t-test*), $t$-Statistic (`-3.192`), Degrees of Freedom (`66.4`), and Two-Tailed $p$-Value (`0.0014`).
  - Formal Academic Report Phrasing blockquote with demonstration demarcation.

---

### Screenshot 11: Automated Institutional Recommendations
- **URL:** `http://localhost:3000/admin/dashboard` or bottom of `/admin/analysis`
- **Viewport:** Desktop recommendation cards.
- **What Must Be Visible:**
  - Header: *"Automated Evidence-Based Recommendations"*.
  - Explanatory note: *"These recommendations are derived programmatically from the empirical survey percentages above to support Chapter 7 in Dhruv's project report."*.
  - 4 structured recommendation action items addressing Routine Backup Protocols, Password Hygiene & Manager Adoption, Simulated Phishing Awareness, and Mandatory Academic Induction Modules.

---

### Screenshot 12: CSV Data Export & Data Dictionary Hub
- **URL:** `http://localhost:3000/admin/export`
- **Viewport:** Desktop view of download cards and dictionary table.
- **What Must Be Visible:**
  - Header: *"CSV Dataset & Summary Export"*.
  - Standardized DEMO DATASET warning banner.
  - Download cards for:
    - *Raw Anonymized Responses (CSV)*
    - *Aggregated Summary Statistics (CSV)*
  - Academic Data Dictionary table listing column names, data types, and field descriptions (e.g. `is_demo`, `cyber_hygiene_score`, `score_category`).

---

### Tips for Capturing Clean Screenshots
1. **Resolution:** Set browser zoom to 100% and maximize the window (minimum 1280 × 800 resolution).
2. **Clean State:** Ensure no console errors or browser inspection tabs are visible in the capture.
3. **Format:** Save images as PNGs named logically: `Fig_4_1_Landing_Page.png`, `Fig_4_2_Survey_Wizard.png`, `Fig_5_1_Dashboard_Overview.png`, etc., to match the figure references in your final dissertation.
