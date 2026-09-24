# Research Methodology
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  

---

## 1. Research Design
This study employs an empirical, descriptive, cross-sectional survey design. The objective is to assess, quantify, and compare self-reported everyday cybersecurity hygiene practices between college students and academic faculty/staff members within a collegiate environment.

---

## 2. Target Population & Sampling Technique

### 2.1 Target Population
The target population comprises active college students (undergraduate and postgraduate) and teaching/administrative faculty members who utilize personal computing devices and campus networks for academic purposes.

### 2.2 Sampling Method
A **non-probability convenience sampling method** was utilized due to accessibility, resource constraints, and the voluntary nature of participation in undergraduate field projects. 

### 2.3 Sample Size
- **Planned Target:** Minimum 60–100 respondents.
- **Actual Final Sample Size:** `[FINAL SAMPLE SIZE TO BE UPDATED AFTER DATA COLLECTION]`  
  - *Student Sub-sample (n₁):* `[STUDENT SAMPLE SIZE TO BE UPDATED AFTER DATA COLLECTION]`  
  - *Faculty/Staff Sub-sample (n₂):* `[FACULTY SAMPLE SIZE TO BE UPDATED AFTER DATA COLLECTION]`  

> [!IMPORTANT]
> Because convenience sampling was employed, the findings reflect patterns within the surveyed sample only and must not be generalized as representative of all university students or faculty across India.

---

## 3. Data Collection Instrument (Questionnaire)

The field survey instrument consists of **21 structured items** categorized into 7 thematic sections:

| Section | Domain | Focus & Questions | Question Count |
|---|---|---|---|
| **Section A** | Respondent Profile | Primary institutional role (Student vs. Faculty), age bracket, academic discipline, optional gender. | 4 items |
| **Section B** | Password Security | Credential uniqueness across accounts, response latency to suspected account compromise, password manager adoption. | 3 items |
| **Section C** | Multi-Factor Authentication | Enforcement of two-factor / multi-factor authentication (MFA/2FA) on critical accounts. | 1 item |
| **Section D** | Device Security | Operating system patch frequency, primary device screen lock/biometric protection, antivirus software usage. | 3 items |
| **Section E** | Phishing & Social Engineering | Pre-click link verification, past encounters with deceptive messages, reaction procedures, self-rated phishing identification confidence. | 4 items |
| **Section F** | Network & Data Safety | Public Wi-Fi frequency, avoidance of sensitive accounts on open networks, routine file backup habits, HTTPS padlock verification. | 4 items |
| **Section G** | Awareness & Training | Attendance of formal cybersecurity training in the past 12 months, overall self-rated security awareness, specific cybersecurity topic of interest. | 3 items |

---

## 4. Analytical Metric: Survey-Based Cyber Hygiene Score (0–100)

To provide an objective basis for comparing respondent cohorts, a normalized **Survey-Based Cyber Hygiene Score** was constructed.

### 4.1 Scoring Configuration
The metric aggregates 15 positively valenced security habits. Each response is assigned points ranging from 1 to 5 (or 0 to 5 for knowledge-deficient responses):
- Maximum possible raw points ($P_{\max}$): 75
- Minimum possible raw points ($P_{\min}$): 12

$$\text{Cyber Hygiene Score} = \text{round}\left( \frac{\text{Earned Points}}{75} \times 100 \right)$$

### 4.2 Descriptive Categorization
- **Strong (80–100):** Consistent, multi-layered adherence to recommended security behaviors.
- **Good (60–79):** Regular practice of fundamental hygiene with minor gaps (e.g. lack of password manager or irregular backups).
- **Basic (40–59):** Inconsistent security habits; notable exposure to credential theft or network risks.
- **Needs Improvement (0–39):** Significant vulnerability across authentication, device, and network dimensions.

*Disclaimer: This benchmark is an academic instrument designed specifically for this undergraduate study and is not an accredited industry standard.*

---

## 5. Statistical Analysis Procedures

1. **Descriptive Statistics:**
   - Measures of central tendency: Mean ($\bar{x}$) and Median ($Mdn$).
   - Measures of dispersion: Standard Deviation ($s$), Range [Min, Max].
   - Frequency and percentage distributions across score categories and individual question options.

2. **Comparative Group Analysis:**
   - Direct cross-tabulation of key security indicators (MFA adoption, routine backup rate, phishing confidence, formal training attendance) between Students and Faculty.

3. **Inferential Hypothesis Testing:**
   - Independent Two-Sample **Welch's t-test** (unequal variances) to test the null hypothesis ($H_0$) that student and faculty mean Cyber Hygiene Scores do not differ significantly:
   $$t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$
   - Significance threshold: $\alpha = 0.05$.
   - Reporting includes $t$-statistic, degrees of freedom ($df$), and exact two-tailed $p$-value.

4. **Practice Compliance Ranking:**
   - All 11 discrete practices are ranked by positive adoption percentage to identify institutional strengths and critical intervention priorities.

---

## 6. Ethical & Privacy Considerations

1. **Strict Anonymity:** No personal identifiable information (PII) such as full names, student/employee roll numbers, email addresses, phone numbers, or IP addresses are linked to questionnaire responses.
2. **Zero Sensitive Data:** The questionnaire explicitly forbids the collection of passwords, financial records, Aadhaar, PAN, or account credentials.
3. **Voluntary Participation:** Respondents are informed of the study's academic purpose prior to beginning the questionnaire and may exit at any point.
4. **Data Protection:** All records are stored locally in an embedded SQLite database and can be purged at any time by the student researcher.

---

## 7. Methodological Limitations

- **Sampling Bias:** Convenience sampling limits geographic and institutional diversity; findings cannot be generalized to the entire student body or national educational sector.
- **Self-Reporting Bias:** Self-administered surveys are susceptible to social desirability bias (respondents overestimating good practices) or recall inaccuracies.
- **Sample Size Constraints:** Real-world field collection in collegiate settings is subject to voluntary response rates and localized outreach constraints.
