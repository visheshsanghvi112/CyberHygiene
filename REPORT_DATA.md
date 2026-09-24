# Academic Project Report Data Template
### Topic: Cyber Hygiene Practices Among College Students and Faculty: A Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  

---

## Current Status & Data Source Demarcation

| Status Attribute | Current Prototype Baseline (For Demo) | Real Field Study (To Be Finalized) |
|---|---|---|
| **DATA STATUS** | **DEMO — SYNTHETIC BENCHMARK** | **FIELD DATA COLLECTION PENDING** |
| **Data Origin** | Deterministic Synthetic Dataset (\`isDemo = true\`) | Authentic Participant Submissions (\`isDemo = false\`) |
| **Total Sample Size (N)** | **100** (Demonstration Baseline) | \`[FINAL REAL SAMPLE SIZE TO BE UPDATED]\` |
| **Student Cohort (n₁)** | **70** (70.0%) | \`[STUDENT REAL COUNT TO BE UPDATED]\` |
| **Faculty/Staff Cohort (n₂)** | **30** (30.0%) | \`[FACULTY REAL COUNT TO BE UPDATED]\` |
| **Collection Instrument** | Anonymous Web Survey (\`/survey\`) | Anonymous Web Survey (\`/survey\`) |

> [!IMPORTANT]
> **ACADEMIC INTEGRITY NOTICE:**  
> The left column below contains exact metrics calculated from the **100 synthetic demonstration records** for prototype review. When submitting the final academic report, replace these demonstration values with the actual numbers collected from real student and faculty respondents.

---

## 1. Cyber Hygiene Score Descriptive Statistics (0–100 Scale)

| Statistical Metric | Demo Prototype Baseline ($N=100$) | Final Real Field Study ($N=[...]$) | Academic Meaning |
|---|---|---|---|
| **Mean Score ($\bar{x}$)** | **73.14** | \`[UPDATE WITH REAL MEAN]\` | Central tendency of cyber hygiene across sample |
| **Median Score ($Mdn$)** | **72.00** | \`[UPDATE WITH REAL MEDIAN]\` | 50th percentile midpoint score |
| **Sample Std Deviation ($s$)** | **6.66** | \`[UPDATE WITH REAL STD DEV]\` | Degree of dispersion around the mean |
| **Minimum Score (Min)** | **57.00** | \`[UPDATE WITH REAL MIN]\` | Lowest recorded score |
| **Maximum Score (Max)** | **88.00** | \`[UPDATE WITH REAL MAX]\` | Highest recorded score |

### Score Category Distribution
| Category | Range | Demo Baseline Count ($f$) | Demo Proportion | Real Study Count ($f$) | Real Proportion |
|---|---|---|---|---|---|
| **Strong** | 80 – 100 | **19** | **19.0%** | \`[UPDATE]\` | \`[UPDATE %]\` |
| **Good** | 60 – 79 | **80** | **80.0%** | \`[UPDATE]\` | \`[UPDATE %]\` |
| **Basic** | 40 – 59 | **1** | **1.0%** | \`[UPDATE]\` | \`[UPDATE %]\` |
| **Needs Improvement** | 0 – 39 | **0** | **0.0%** | \`[UPDATE]\` | \`[UPDATE %]\` |

---

## 2. Student vs. Faculty Comparative Breakdown

| Security Indicator | Demo Students ($n_1=70$) | Demo Faculty ($n_2=30$) | Demo Difference | Real Students | Real Faculty | Real Difference |
|---|---|---|---|---|---|---|
| **Average Score** | **71.90** | **76.03** | +4.13 pts | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **Median Score** | **71.50** | **76.00** | +4.50 pts | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **MFA Adoption Rate** | **77.1%** | **80.0%** | +2.9% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **Routine File Backup Rate** | **40.0%** | **30.0%** | -10.0% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **High Phishing Confidence** | **60.0%** | **53.3%** | -6.7% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **Formal Training in Past Year** | **28.6%** | **40.0%** | +11.4% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **Strong Password Practice** | **61.4%** | **56.7%** | -4.7% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |
| **Regular OS/App Updates** | **70.0%** | **53.3%** | -16.7% | \`[UPDATE]\` | \`[UPDATE]\` | \`[UPDATE]\` |

---

## 3. Practice Adoption Hierarchy (Rankings)

| Rank | Security Practice | Domain | Demo Adoption % | Demo Status | Real Field Adoption % | Real Status |
|---|---|---|---|---|---|---|
| **1** | Primary Device Screen Lock | Device Security | **94.0%** | Strong | \`[UPDATE]\` | \`[UPDATE]\` |
| **2** | Multi-Factor Authentication | Authentication | **78.0%** | Strong | \`[UPDATE]\` | \`[UPDATE]\` |
| **3** | HTTPS Padlock Verification | Network Safety | **73.0%** | Strong | \`[UPDATE]\` | \`[UPDATE]\` |
| **4** | Antivirus / Built-in Protection | Device Security | **72.0%** | Strong | \`[UPDATE]\` | \`[UPDATE]\` |
| **5** | OS & Application Patching | Device Security | **65.0%** | Moderate | \`[UPDATE]\` | \`[UPDATE]\` |
| **6** | Pre-Click Link Verification | Phishing | **64.0%** | Moderate | \`[UPDATE]\` | \`[UPDATE]\` |
| **7** | Public Wi-Fi Account Care | Network Safety | **61.0%** | Moderate | \`[UPDATE]\` | \`[UPDATE]\` |
| **8** | Unique Passwords on Accounts | Password Security | **60.0%** | Moderate | \`[UPDATE]\` | \`[UPDATE]\` |
| **9** | Routine File Backups | Data Management | **37.0%** | Needs Attention | \`[UPDATE]\` | \`[UPDATE]\` |
| **10** | Formal Cybersecurity Training | Awareness | **32.0%** | Needs Attention | \`[UPDATE]\` | \`[UPDATE]\` |
| **11** | Dedicated Password Manager | Password Security | **21.0%** | Needs Attention | \`[UPDATE]\` | \`[UPDATE]\` |

---

## 4. Inferential Statistical Hypothesis Test: Welch's t-Test

> [!WARNING]
> **DEMONSTRATION CALCULATION NOTICE:**  
> The demonstration prototype statistics below were calculated strictly from synthetic demo records to verify the mathematical execution of the Welch t-test engine. **These figures ($p = 0.0014$) must NOT be cited as empirical findings about actual college students or faculty.** For the final dissertation, only report $t$-test values derived from authentic field data.

- **Demonstration Prototype Statistics (Software Verification Only):**
  - $t$-Statistic: **$t = -3.192$**
  - Degrees of Freedom: **$df = 66.4$**
  - Two-Tailed $p$-Value: **$p = 0.0014$** ($p < 0.05$)
  - Demo Interpretation: *"[DEMONSTRATION CALCULATION ONLY]: An independent Welch's two-sample t-test was computed across the synthetic demonstration records (Student simulated M=71.9, Faculty simulated M=76.03); t(66.4) = -3.192, p = 0.0014. Because this dataset consists of synthetic demonstration records, this output is for software demonstration only and must not be interpreted as empirical evidence about the wider student or faculty population."*
- **Final Real Study Statistics:**
  - $t$-Statistic: \`[INSERT FROM /admin/analysis]\`
  - Degrees of Freedom: \`[INSERT FROM /admin/analysis]\`
  - Two-Tailed $p$-Value: \`[INSERT FROM /admin/analysis]\`
  - Real Interpretation: \`[COPY PHRASING FROM /admin/analysis]\`

---

## 5. Institutional Recommendations for Final Report (Chapter 7)

### Demo Prototype Recommendations Generated by Engine:
1. **Routine Backup Protocols:** With only 37% of respondents routinely backing up critical files, provide students and faculty with managed cloud storage tutorials (e.g. OneDrive/Google Drive versioning) to prevent catastrophic data loss.
2. **Password Hygiene & Manager Adoption:** Dedicated password manager usage is low at 21%. Host practical demonstrations on browser-based or open-source password managers (e.g., Bitwarden) to mitigate password reuse across portals.
3. **Simulated Phishing Awareness:** Link source verification is followed by 64% of participants. Organize campus-wide simulated phishing drills and credential harvesting awareness sessions.
4. **Mandatory Academic Induction Modules:** Formal cybersecurity training was attended by only 32% of respondents within the last year. Embed a lightweight 30-minute cyber hygiene module into student and staff annual orientation.

### Real Study Recommendations:
*(Will be automatically generated at \`/admin/dashboard\` based on genuine participant data)*
