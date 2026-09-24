# Academic Demo & Presentation Checklist
### Cyber Hygiene Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  

---

## 1. Quick Launch Sequence (For Tomorrow's Demo)

Run these commands in terminal before presenting to the professor or evaluation panel:

```bash
# 1. Navigate to the project directory
cd project  # Or your project directory

# 2. Ensure dependencies are installed
npm install

# 3. Synchronize SQLite database
npx prisma db push

# 4. Seed the 100-record neutral demonstration dataset
npm run seed

# 5. Start the local server
npm run dev

# 6. (Optional) Run the automated test suite in a separate tab
npm test
```

Server URL: **[http://localhost:3000](http://localhost:3000)**  
Admin Login: **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**  
Credentials: `admin@college.edu` / `CyberHygiene2026!`  

---

## 2. Structured 5–10 Minute Presentation Flow (14 Logical Steps)

Follow this sequence and speaking notes when demonstrating to your professor:

### Step 1: Explain Problem Statement
- **Open:** [Homepage (`http://localhost:3000`)](http://localhost:3000)
- **Dhruv's Speaking Note:**
  > *"Good morning Professor. My field project is **'Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System'**. In higher education, students and faculty handle institutional and personal data across multiple unmanaged devices. However, digital proficiency does not guarantee good cyber hygiene. My project measures this gap empirically through a secure web survey platform."*

### Step 2: Open Survey Interface
- **Navigate to:** [Survey Wizard (`http://localhost:3000/survey`)](http://localhost:3000/survey)
- **Dhruv's Speaking Note:**
  > *"Here is the responsive 7-step survey instrument. It guides respondents through 21 questions structured across 6 core cybersecurity dimensions."*

### Step 3: Explain Anonymous Data Collection
- **Point out:** The Privacy Notice at the top of the survey.
- **Dhruv's Speaking Note:**
  > *"To ensure ethical compliance and truthful reporting, data collection is strictly anonymous. We collect zero personally identifiable information—no names, emails, phone numbers, student IDs, or IP addresses."*

### Step 4: Show Sample Questions
- **Demonstrate:** Step through Section 1 (Profile), Section 2 (Passwords), Section 3 (MFA), and Section 5 (Phishing).
- **Dhruv's Speaking Note:**
  > *"Questions test practical behaviors rather than theoretical knowledge: for example, password uniqueness, prompt software patching, verifying links before clicking, and avoiding sensitive accounts on public campus Wi-Fi."*

### Step 5: Submit a Test Response
- **Action:** Quickly complete remaining steps and click **Submit Response**.
- **Show:** The **Submission Confirmation Screen** and instant **Survey-Based Cyber Hygiene Score Feedback Receipt**.
- **Dhruv's Speaking Note:**
  > *"Upon submission, a unique anonymous response ID is generated and stored in SQLite. The respondent immediately receives personalized feedback on their hygiene score."*

### Step 6: Login to Admin Dashboard
- **Navigate to:** [Admin Login (`http://localhost:3000/admin/login`)](http://localhost:3000/admin/login)
- **Action:** Enter `admin@college.edu` / `CyberHygiene2026!` and log in.
- **Dhruv's Speaking Note:**
  > *"Authorized researchers access the administration hub via JWT-authenticated HTTP-only session cookies."*

### Step 7: Show Key Performance Indicators (KPIs)
- **Navigate to:** [Dashboard (`http://localhost:3000/admin/dashboard`)](http://localhost:3000/admin/dashboard)
- **Show:** The top 4 KPI summary cards (Total Responses, Student/Faculty Split, Average Score, Key Rates).
- **Dhruv's Speaking Note:**
  > *"At a glance, the researcher sees aggregate sample size, cohort breakdown, overall average score, and key adoption percentages computed dynamically from the database."*

### Step 8: Show Interactive Charts
- **Scroll through:** The 10 interactive Recharts data visualizers.
- **Dhruv's Speaking Note:**
  > *"These 10 charts illustrate categorical score distribution, MFA adoption, password uniqueness, update frequency, phishing confidence, and Wi-Fi habits."*

### Step 9: Show Score Methodology
- **Point out:** The **Score Methodology & Framework** card on the dashboard or analysis page.
- **Dhruv's Speaking Note:**
  > *"The Survey-Based Cyber Hygiene Score is calculated across 15 positive habits on a 100-point scale. It is an academic educational measure created for this study, not an accredited industry certification."*

### Step 10: Show Student vs. Faculty Descriptive Comparison
- **Show:** Chart 3 (Average Score Comparison) and Key Security Indicators Bar Chart.
- **Dhruv's Speaking Note:**
  > *"The platform allows side-by-side comparison. For example, in our current dataset, faculty report higher MFA adoption, while students report higher routine file backups. All findings are phrased descriptively without broad unsupported generalizations."*

### Step 11: Show Automated Recommendation Engine
- **Scroll down to:** **Automated Evidence-Based Recommendations**.
- **Dhruv's Speaking Note:**
  > *"The system programmatically analyzes empirical thresholds to recommend targeted institutional policies—such as cloud backup workshops and annual phishing simulations—which directly populate Chapter 7 of the project report."*

### Step 12: Show CSV Data Export
- **Navigate to:** [Export Hub (`http://localhost:3000/admin/export`)](http://localhost:3000/admin/export)
- **Show:** The raw CSV and summary CSV download options.
- **Dhruv's Speaking Note:**
  > *"All raw anonymized questionnaires and aggregated summary statistics can be exported to standard RFC-4180 CSV files for offline verification or statistical analysis in Excel, SPSS, or Python."*

### Step 13: Explain Synthetic Demo Data Status
- **Point to:** The prominent **DEMO DATASET** banner displayed on the Dashboard, Analysis, Responses, and Export pages.
- **Dhruv's Speaking Note:**
  > *"Professor, for today's software demonstration, the database contains 100 neutral synthetic records generated using a deterministic random seed. Every synthetic record is explicitly tagged with `isDemo = true` and clearly marked across all screens to ensure total academic integrity."*

### Step 14: Explain Transition to Actual Field Study
- **Navigate to:** [Responses Table (`http://localhost:3000/admin/responses`)](http://localhost:3000/admin/responses)
- **Point to:** The red **Purge Synthetic Demo Data** button and the dataset filter tabs.
- **Dhruv's Speaking Note:**
  > *"Once field data collection commences, clicking 'Purge Synthetic Demo Data' wipes the synthetic records while leaving genuine student and faculty responses untouched. Alternatively, the dashboard filter can toggle between 'All', 'Real Only', and 'Demo Only' at any time."*

- **Conclude:**
  - *"Thank you Professor. The system is fully operational, mathematically verified, and ready to collect real field responses for the final dissertation."*

---

## 3. Professor Q&A Defense Cheat Sheet

### Q1: "Why did you use SQLite instead of MySQL or PostgreSQL?"
> **Answer:**  
> *"SQLite is an ACID-compliant embedded relational database that runs inside a single portable file (`dev.db`). For an academic field study of 100–500 survey respondents, SQLite provides microsecond query performance, zero operational maintenance, and maximum portability—allowing the entire project to be reviewed on any machine with just `npm install` and `npm run dev` without needing to configure database servers."*

### Q2: "How is the Cyber Hygiene Score calculated? Is it scientific?"
> **Answer:**  
> *"The Survey-Based Cyber Hygiene Score (0–100) is a descriptive academic metric constructed specifically for this study. It evaluates 15 positive cybersecurity behaviors on 1–5 or 0–5 point scales, summing to a maximum of 75 raw points, which is then normalized into a 0–100 index. We explicitly document in the thesis that this is a comparative educational benchmark rather than an accredited industry certification standard."*

### Q3: "Why did you use Welch's t-test instead of the standard Student's t-test?"
> **Answer:**  
> *"Student and faculty cohorts in field studies typically exhibit unequal sample sizes (e.g. 70 students vs. 30 faculty) and unequal population variances. The standard Student's t-test assumes equal variances (homoscedasticity). Welch's t-test relaxes this assumption and calculates adjusted degrees of freedom using the Welch-Satterthwaite equation, providing more robust and reliable $p$-values."*

### Q4: "How do you guarantee respondent privacy?"
> **Answer:**  
> *"The survey architecture does not collect names, contact numbers, email addresses, student IDs, or IP addresses. Additionally, the questionnaire strictly excludes sensitive credentials, passwords, financial data, or government IDs. All records are identified solely by an anonymous cryptographic hash/CUID."*

### Q5: "How will you transition from demo data to real data?"
> **Answer:**  
> *"All demonstration records are stored with `isDemo = true`. In the researcher portal, a single click on 'Purge Synthetic Demo Data' deletes all synthetic records. Alternatively, Dhruv can filter the dashboard by 'Real Field Responses Only'. The survey link can then be circulated via campus channels, and real submissions (`isDemo = false`) will populate the live database immediately."*
