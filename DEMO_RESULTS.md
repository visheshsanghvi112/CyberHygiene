# DEMO / SYNTHETIC DATASET ANALYSIS REPORT
### Prototype Baseline Metrics for Project Presentation
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  
**Generated At:** 2026-09-23T17:47:30.995Z  

> [!IMPORTANT]
> **ACADEMIC INTEGRITY NOTICE — DEMO / SYNTHETIC DATA ONLY**  
> The figures, statistics, and tables in this document were computed exclusively from **100 synthetic demonstration records** generated for development, interface testing, and academic presentation purposes.  
> **These results do NOT represent actual field-study participants** and must never be published or presented as empirical research findings from real college students or faculty. Once genuine survey responses are gathered via `/survey`, they will be documented in `REPORT_DATA.md`.

---

## 1. Synthetic Sample Composition Overview

| Metric | Synthetic Value | Description |
|---|---|---|
| **Total Synthetic Records** | **100** | Total generated demo responses |
| **Student Cohort Count** | **70** (70%) | Simulated student respondents (Undergraduate/Postgraduate) |
| **Faculty/Staff Cohort Count** | **30** (30%) | Simulated teaching and administrative personnel |
| **Data Generation Method** | Deterministic PRNG | Mulberry32 algorithm with neutral, unforced probability distributions |
| **Data Integrity Flag** | `isDemo = true` | Fully partitioned from real survey entries |

---

## 2. Descriptive Statistics of Cyber Hygiene Scores (0–100 Scale)

All scores are calculated through the system's 15-factor normalized scoring engine:

| Statistical Metric | Synthetic Dataset Value | Meaning |
|---|---|---|
| **Mean Score ($\\bar{x}$)** | **73.14 / 100** | Overall average cyber hygiene index |
| **Median Score ($Mdn$)** | **72 / 100** | 50th percentile midpoint score |
| **Sample Standard Deviation ($s$)** | **6.66** | Degree of dispersion around the mean |
| **Lowest Score (Min)** | **57 / 100** | Minimum score in demo dataset |
| **Highest Score (Max)** | **88 / 100** | Maximum score in demo dataset |

### Score Category Distribution
| Category | Range | Count ($f$) | Proportion ($\%$) |
|---|---|---|---|
| **Strong** | 80 – 100 | **19** | **19.0%** |
| **Good** | 60 – 79 | **80** | **80.0%** |
| **Basic** | 40 – 59 | **1** | **1.0%** |
| **Needs Improvement** | 0 – 39 | **0** | **0.0%** |

---

## 3. Student vs. Faculty Comparative Breakdown

| Indicator | Students ($N = 70$) | Faculty/Staff ($N = 30$) | Variance |
|---|---|---|---|
| **Average Score** | **71.9** | **76.03** | 4.1 pts |
| **Median Score** | **71.5** | **76** | 4.5 pts |
| **MFA Adoption Rate** | **77.1%** | **80%** | 2.9% |
| **Routine File Backup Rate** | **40%** | **30%** | -10.0% |
| **High Phishing Confidence** | **60%** | **53.3%** | -6.7% |
| **Formal Training in Past Year** | **28.6%** | **40%** | 11.4% |
| **Strong Password Creation** | **61.4%** | **56.7%** | -4.7% |
| **Regular OS/App Updates** | **70%** | **53.3%** | -16.7% |

---

## 4. Inferential Statistical Hypothesis Test (Software Demonstration Only)

> [!WARNING]
> **DEMONSTRATION CALCULATION NOTICE:**  
> Because the current dataset consists of synthetic demonstration records, inferential statistics shown below (such as $t = -3.192, p = 0.0014$) are for software and mathematical verification only. **They must NOT be cited as empirical findings about real student or faculty populations.** For the final research dissertation, inferential statistics will only be reported once authentic field responses are collected.

- **Test Type:** Welch's Two-Sample t-test (Unequal Variances)
- **Calculated t-Statistic:** `t = -3.192`
- **Degrees of Freedom:** `df = 66.4`
- **Two-Tailed p-Value:** `p = 0.0014`
- **System Phrasing:**  
  *"[DEMONSTRATION CALCULATION ONLY]: An independent Welch's two-sample t-test was computed across the synthetic demonstration records (Student simulated M=71.9, Faculty simulated M=76.03); t(66.4) = -3.192, p = 0.0014. Because this dataset consists of synthetic demonstration records, this statistical output is for software demonstration only and must not be interpreted as empirical evidence about the wider student or faculty population."*

---

## 5. Security Practices Hierarchy (Adoption Rankings)

Ranked from highest adherence to lowest adherence across all 100 synthetic respondents:

| Rank | Security Habit | Domain | Positive Adoption % | Status |
|---|---|---|---|---|
| **1** | Primary Device Lock / PIN / Biometrics | Device Security | **94%** | Strong |
| **2** | Multi-Factor Authentication Adoption | Authentication | **78%** | Strong |
| **3** | HTTPS / Secure Website Verification | Network & Browsing | **73%** | Strong |
| **4** | Antivirus or Built-in Security Usage | Device Security | **72%** | Strong |
| **5** | Operating System & Application Updates | Device Security | **65%** | Moderate |
| **6** | Checking Link Sources Before Clicking | Phishing Awareness | **64%** | Moderate |
| **7** | Avoiding Sensitive Accounts on Public Wi-Fi | Network & Browsing | **61%** | Moderate |
| **8** | Unique Passwords on Important Accounts | Password Security | **60%** | Moderate |
| **9** | Regular Routine File Backups | Data Management | **37%** | Needs Attention |
| **10** | Formal Cybersecurity Training in Past 12 Mo | Awareness & Training | **32%** | Needs Attention |
| **11** | Dedicated Password Manager Utilization | Password Security | **21%** | Needs Attention |

---

## 6. Auto-Generated Institutional Recommendations

The platform evaluates empirical thresholds from the dataset to produce these recommendations:

1. Routine Backup Protocols: With only 37% of respondents routinely backing up critical files, provide students and faculty with managed cloud storage tutorials (e.g. OneDrive/Google Drive versioning) to prevent catastrophic data loss.

2. Password Hygiene & Manager Adoption: Dedicated password manager usage is low at 21%. Host practical demonstrations on browser-based or open-source password managers (e.g., Bitwarden) to mitigate password reuse across portals.

3. Simulated Phishing Awareness: Link source verification is followed by 64% of participants. Organize campus-wide simulated phishing drills and credential harvesting awareness sessions.

4. Mandatory Academic Induction Modules: Formal cybersecurity training was attended by only 32% of respondents within the last year. Embed a lightweight 30-minute cyber hygiene module into student and staff annual orientation.

---

## 7. Instructions for Real Data Handover

When genuine survey responses are gathered:
1. Purge the synthetic demo records from `/admin/responses` using **Purge Synthetic Demo Data**.
2. Real participant submissions will automatically populate the live database.
3. Export the real CSV and document findings in `REPORT_DATA.md`.
