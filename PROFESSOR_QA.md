# Professor Viva & Defense Q&A Cheat Sheet
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  
**Academic Year:** 2025–2026

---

### Q1: Why did you choose this topic?
**Answer:**  
In higher education institutions, both students and faculty manage critical academic and personal information across personal laptops and mobile devices. While IT infrastructure and cybersecurity protocols exist at the network perimeter, individual human behavior remains the primary attack vector. This project investigates the actual behavioral hygiene practices of college stakeholders to identify specific human-layer vulnerabilities and inform targeted institutional policies.

---

### Q2: Why "cyber hygiene" specifically rather than generic cybersecurity?
**Answer:**  
Cybersecurity often refers to technical infrastructure like firewalls, intrusion detection systems, and enterprise encryption. In contrast, *cyber hygiene* focuses on routine, day-to-day personal habits—such as password uniqueness, prompt patch installation, enabling multi-factor authentication, verifying suspicious email links, and routine file backups. Just as personal medical hygiene prevents illness, cyber hygiene prevents common compromises like credential theft and malware infection.

---

### Q3: What is your research method?
**Answer:**  
We employed an empirical, cross-sectional descriptive survey methodology. The study uses a quantitative questionnaire designed across 6 security domains (21 total questions) to collect self-reported behavior from two distinct college cohorts: Undergraduate/Postgraduate Students and Faculty/Staff members. Data is statistically analyzed using descriptive metrics (mean, median, standard deviation) and inferential hypothesis testing (Welch's two-sample $t$-test).

---

### Q4: How was data collected?
**Answer:**  
Data is collected via a self-administered, mobile-responsive 7-step web survey built with Next.js and React. The survey is distributed via direct campus communication channels (institutional email lists, departmental bulletin boards, and messaging groups). Each completed questionnaire is validated client-side and server-side, normalized into a numerical score, and stored immediately in an embedded SQLite database.

---

### Q5: Why is the survey completely anonymous?
**Answer:**  
Anonymity is critical to eliminating social desirability bias. When individuals are asked about sensitive security mistakes—such as clicking phishing links or using simple passwords—attaching names or student IDs leads respondents to exaggerate their good habits. By ensuring 100% non-identifiable data collection (no names, contact numbers, student roll numbers, or IP addresses), respondents are encouraged to provide honest, accurate reports of their actual practices.

---

### Q6: What is convenience sampling?
**Answer:**  
Convenience sampling is a non-probability sampling technique where respondents are recruited based on practical accessibility and proximity to the researcher (e.g., enrolled students and active faculty within the college campus). While it does not guarantee full random representation of all higher education institutions globally, it is the standard, practical method for localized undergraduate academic field studies.

---

### Q7: Why did you use SQLite instead of MySQL or PostgreSQL?
**Answer:**  
SQLite is a serverless, zero-configuration, ACID-compliant relational database engine stored within a single self-contained file (`dev.db`). For an academic field study of 100 to 1,000 respondents, SQLite provides sub-millisecond query execution, zero daemon overhead, and total portability. It allows examiners to clone and run the system on any laptop using standard Node.js without provisioning external database servers. If the system scales to thousands of concurrent users in the future, Prisma ORM allows switching to PostgreSQL simply by changing a single connection string.

---

### Q8: Why did you use Next.js and TypeScript?
**Answer:**  
Next.js 14 provides an integrated full-stack architecture combining React server-side rendering for speed and security with built-in API route handlers. TypeScript ensures end-to-end type safety, preventing runtime exceptions during complex statistical calculations and survey validation. This modern stack guarantees rapid load times, clean code maintainability, and built-in mobile responsiveness.

---

### Q9: How does the Cyber Hygiene Score work?
**Answer:**  
The score evaluates 15 scored behavioral dimensions across passwords, authentication, device security, phishing verification, public Wi-Fi behavior, and backup habits. Each question response is assigned an adherence weight from 1 to 5 points (maximum 75 raw points). The score is then normalized to a 100-point scale:
$$\text{Score} = \text{round}\left(\frac{\text{Earned Raw Points}}{75} \times 100\right)$$
Respondents are categorized into four tiers:
- **Strong:** 80–100 points
- **Good:** 60–79 points
- **Basic:** 40–59 points
- **Needs Improvement:** 0–39 points

---

### Q10: Is the Cyber Hygiene Score an official industry standard?
**Answer:**  
**No.** It is a project-specific, survey-derived educational index created specifically for this academic field study to enable consistent comparative analysis between students and faculty. We explicitly disclaim in the software and thesis that it is not an accredited commercial certification or clinical benchmark.

---

### Q11: What is the difference between demo data and real data in your system?
**Answer:**  
- **Demo Data:** A reproducible baseline of 100 neutral synthetic records generated using a deterministic pseudo-random number generator (Mulberry32). Every demo row is internally flagged with `isDemo = true` and clearly labeled with prominent orange warning banners across the dashboard, analysis hub, and CSV exports to maintain academic honesty.
- **Real Data:** Authentic field questionnaires submitted through `/survey` by genuine students and faculty. These records are saved with `isDemo = false`.
- **Clean Separation:** The admin panel includes a "Purge Synthetic Demo Data" button that deletes ONLY `isDemo = true` records, leaving all genuine field responses untouched.

---

### Q12: What happens if the project receives 500 or 1,000 responses?
**Answer:**  
The architecture easily handles 1,000+ responses. SQLite supports databases up to 281 terabytes and handles tens of thousands of rows with ease. In the admin portal, database queries use database-level indexing, pagination (20 records per page), and server-side aggregation (`PRISMA count`, `groupBy`), ensuring sub-second response times regardless of dataset size.

---

### Q13: What are the primary limitations of the study?
**Answer:**  
1. **Self-Reported Bias:** Responses reflect what participants claim they do, which may differ slightly from actual device telemetry.
2. **Cross-Sectional Nature:** Data represents a snapshot in time rather than tracking habit evolution longitudinally.
3. **Sampling Scope:** Convenience sampling within a single academic institution limits statistical generalization to all national universities.

---

### Q14: What is the future scope of this project?
**Answer:**  
1. Multi-campus federated surveys comparing private vs. state universities.
2. Automated generation of individualized PDF security report cards for respondents upon survey completion.
3. Integration with institutional Single Sign-On (SSO) to conduct pre-training and post-training longitudinal assessments.

---

### Q15: How did you test the application?
**Answer:**  
The application is tested using a two-tier verification strategy:
1. **Automated Unit & Integration Testing:** 17 automated test suites written with Vitest verifying input validation rules, scoring logic, standard deviation formulas, RFC-4180 CSV generation, and strict demo/real data isolation during purges.
2. **Manual Smoke Testing:** Full manual verification of the 7-step wizard on desktop and mobile viewports, credentialed admin login, session expiration, and CSV file exports in Microsoft Excel.

---

### Q16: What security measures have you implemented in the system?
**Answer:**  
- **Zero Sensitive Data Storage:** No personal identity data or passwords collected in survey.
- **Session Security:** Admin authentication uses cryptographically signed JWT tokens (via Jose library) transmitted over HTTP-only, SameSite cookies to protect against Cross-Site Scripting (XSS).
- **Injection Prevention:** Prisma ORM uses parameterized SQL queries, completely eliminating SQL injection vectors.
- **Input Sanitization:** Every API payload is strictly validated against a strict Zod schema before database insertion.

---

### Q17: Can the application be deployed online?
**Answer:**  
Yes. Because it is built on Next.js, the frontend and API routes can be deployed with one click to platforms like Vercel, Railway, or AWS. For persistent multi-region deployments, the SQLite database can be paired with Turso (LibSQL) or migrated to PostgreSQL via Prisma with zero application code changes.
