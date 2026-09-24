# Academic Project Report Screenshot Checklist (SS Checklist)
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**System:** CIA — Cyber Hygiene Intelligence & Assessment System  
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  
**Academic Year:** 2025–2026

---

> **What is this file?**  
> In your Mumbai University B.Sc. IT Project Black Book (specifically **Chapter 4: System Design (User Interface Design)** and **Chapter 6: Results and Discussions (User Documentation)**), you are required to paste screenshots ("SS") of every page in your application.  
> This checklist gives you the exact 12 screenshots to capture from your running browser (`http://localhost:3000`) with the exact figure names to use in your report.

---

### Screenshot 1: Project Landing / Home Page
- **Figure Label in Report:** `Figure 4.1: System Home Page & Public Portal`
- **URL:** `http://localhost:3000`
- **Viewport:** Desktop browser (1280px or 1440px wide).
- **What Must Be Visible:**
  - Project title header: *"CIA — Cyber Hygiene Intelligence & Assessment System"*.
  - Candidate badge: *"Dhruv Gupta • B.Sc. Information Technology"*.
  - Call-to-Action buttons: **"Start Assessment"** and **"Platform Portal"**.
  - Four security domain cards: *Authentication Security*, *Device & Patch Hygiene*, *Phishing & Social Engineering*, and *Network & Wi-Fi Safety*.
  - Privacy commitment notice (100% anonymous, zero credential collection).

---

### Screenshot 2: Interactive Assessment Wizard Step
- **Figure Label in Report:** `Figure 4.2: Cyber Hygiene Assessment Wizard Interface`
- **URL:** `http://localhost:3000/survey`
- **Viewport:** Desktop view (Step 2 or Step 3).
- **What Must Be Visible:**
  - Step progress indicator (e.g., *"Step 2 of 7: Password Hygiene & Management"*).
  - Clean question cards with single-choice selection buttons.
  - Interactive selection states (indigo highlighted active choice).
  - Navigation buttons: **"Back"** and **"Next Step"**.
  - Contextual help text explaining security terms clearly to non-technical respondents.

---

### Screenshot 3: Assessment Submission & Score Receipt
- **Figure Label in Report:** `Figure 4.3: Instant Score Evaluation & Feedback Receipt`
- **URL:** `http://localhost:3000/survey` (After submitting questionnaire)
- **Viewport:** Desktop centered modal/card.
- **What Must Be Visible:**
  - Green checkmark icon with *"Thank You for Completing the Assessment!"*.
  - Anonymous Response ID box with *"Privacy Status: 100% Anonymous • Non-identifiable"*.
  - Personalized **Cyber Hygiene Score** receipt (e.g., `85 / 100` with category badge `Strong`).
  - Clear methodology disclaimer: *"The score is an academic survey-derived measure created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark."*
  - **"Return to Homepage"** button.

---

### Screenshot 4: Administrator Authentication Portal
- **Figure Label in Report:** `Figure 4.4: Administrator Secure Login Interface`
- **URL:** `http://localhost:3000/admin/login`
- **Viewport:** Desktop centered authentication card.
- **What Must Be Visible:**
  - Portal shield badge and title: *"CIA Administrator Portal"*.
  - Secure login form with Email and Password inputs.
  - Development/Demo credential helper card (`admin@college.edu` / `CyberHygiene2026!`).
  - Security footer note indicating JWT authentication via HTTP-only cookies.

---

### Screenshot 5: Admin Analytics Dashboard (Top Overview)
- **Figure Label in Report:** `Figure 6.1: Intelligence Analytics Dashboard (Executive Overview)`
- **URL:** `http://localhost:3000/admin/dashboard`
- **Viewport:** Full-width desktop view.
- **What Must Be Visible:**
  - Header: *"Cyber Hygiene Intelligence Dashboard"* with navigation tabs (Dashboard, Records, Analytics, Risk Insights, Reports, Export).
  - Top 4 KPI metric cards:
    - *Total Assessed* (e.g., `100 records`)
    - *Cohort Split* (`70 Students / 30 Faculty`)
    - *Average Cyber Hygiene Score* (e.g., `73.14 / 100`)
    - *MFA Adoption & Regular Backup Rates*
  - Quick action links to Records, Analytics, Risk Insights, and Reports.

---

### Screenshot 6: Cyber Hygiene Score Distribution Chart
- **Figure Label in Report:** `Figure 6.2: Cyber Hygiene Score Tier Distribution`
- **URL:** `http://localhost:3000/admin/dashboard` (Scroll to Score Distribution Chart)
- **Viewport:** Desktop view of Chart 1 & Chart 2.
- **What Must Be Visible:**
  - Chart 1: *Cohort Distribution* donut chart showing 70% Students vs. 30% Faculty/Staff.
  - Chart 2: *Score Distribution* bar chart displaying respondent counts across the 4 categorical tiers (*Strong*, *Good*, *Basic*, *Needs Attention*).
  - Clear axis labels and tooltips.

---

### Screenshot 7: Cohort Comparative Analysis Charts
- **Figure Label in Report:** `Figure 6.3: Student vs. Faculty Comparative Security Metrics`
- **URL:** `http://localhost:3000/admin/dashboard` (Scroll to Comparative Analysis)
- **Viewport:** Desktop view of Comparative Chart & Indicators.
- **What Must Be Visible:**
  - Comparative bar chart comparing Mean and Median scores between Students and Faculty.
  - *Key Security Indicators* comparative chart comparing student vs. faculty adoption percentages across MFA, backups, updates, strong passwords, and phishing confidence.

---

### Screenshot 8: Assessment Records Management Table
- **Figure Label in Report:** `Figure 6.4: Assessment Records & Incident Logs Interface`
- **URL:** `http://localhost:3000/admin/responses`
- **Viewport:** Desktop tabular view.
- **What Must Be Visible:**
  - Page header: *"Assessment Records & Field Logs"*.
  - Search filter input and dropdown selectors (Role, Score Tier, Academic Department).
  - Data table displaying:
    - Assessment ID (anonymized hash)
    - Role (`Student` or `Faculty/Staff`)
    - Department & Age Bracket
    - Normalized Cyber Hygiene Score & Tier Badge
    - Date timestamp
  - **"Inspect"** button on individual rows.

---

### Screenshot 9: Detailed Statistical Analysis Engine
- **Figure Label in Report:** `Figure 6.5: Descriptive & Inferential Statistical Analysis Engine`
- **URL:** `http://localhost:3000/admin/analysis`
- **Viewport:** Desktop view of Section 1 & Section 2.
- **What Must Be Visible:**
  - Header: *"Statistical Analysis & Group Comparisons"*.
  - Score Methodology Framework card detailing the 15 dimensions and scoring rubric.
  - Section 1: *Descriptive Statistics Table* displaying Sample Size ($N$), Mean ($M$), Median ($Mdn$), Standard Deviation ($SD$), and Score Range [$Min, Max$].
  - Section 2: *Comparative Analysis Table* showing Students vs. Faculty across 7 key indicators with absolute variance columns.

---

### Screenshot 10: Institutional Risk Matrix & Action Priorities
- **Figure Label in Report:** `Figure 6.6: Cyber Risk Heatmap & Institutional Vulnerability Matrix`
- **URL:** `http://localhost:3000/admin/risk`
- **Viewport:** Desktop view of Risk Heatmap & Priority Vulnerabilities.
- **What Must Be Visible:**
  - Header: *"Institutional Cyber Risk Heatmap & Vulnerability Matrix"*.
  - Domain risk cards showing risk levels (Critical, High, Medium, Low) for Authentication, Device Management, Phishing, and Network Hygiene.
  - Prioritized Institutional Remediation Roadmap.

---

### Screenshot 11: Institutional Hygiene Audit Report
- **Figure Label in Report:** `Figure 6.7: Automated Institutional Cybersecurity Audit Report`
- **URL:** `http://localhost:3000/admin/reports`
- **Viewport:** Desktop view of report summary.
- **What Must Be Visible:**
  - Header: *"Institutional Cyber Hygiene Audit Report"*.
  - Printable/Exportable report summary with Executive Insights, Compliance Readiness Score, and Action Plan.

---

### Screenshot 12: Data Export Hub & Data Dictionary
- **Figure Label in Report:** `Figure 6.8: Raw Data Export Hub & Academic Schema Dictionary`
- **URL:** `http://localhost:3000/admin/export`
- **Viewport:** Desktop view of download cards and dictionary table.
- **What Must Be Visible:**
  - Header: *"Dataset & Report Export Hub"*.
  - Download cards for:
    - *Raw Anonymized Records (CSV)*
    - *Aggregated Summary Statistics (CSV)*
  - Data Dictionary table listing column names, data types, and field descriptions (e.g. `cyber_hygiene_score`, `score_category`, `mfa_enabled`).

---

### Tips for Capturing Clean Screenshots
1. **Resolution:** Set browser zoom to 100% and maximize the window (minimum 1280 × 800 resolution).
2. **Clean State:** Ensure no console errors or browser inspection tabs are visible in the capture.
3. **Format:** Save images as PNGs named logically: `Fig_4_1_Landing_Page.png`, `Fig_4_2_Survey_Wizard.png`, `Fig_6_1_Dashboard_Overview.png`, etc., to paste into your final Black Book report document.
