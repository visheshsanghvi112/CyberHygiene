# Testing Documentation & Verification Report
### Cyber Hygiene Field Survey and Awareness Analysis System
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  

---

## 1. Automated Test Suite Overview

Automated tests are implemented using **Vitest** to ensure mathematical, logical, and structural integrity across all core business modules.

### Running Automated Tests
```bash
npm test
```
*(Runs `vitest run` in the project root)*

---

## 2. Automated Test Specifications

### 2.1 Scoring Engine Tests (`tests/scoring.test.ts`)
| Test ID | Description | Input Conditions | Expected Outcome | Status |
|---|---|---|---|---|
| **TC-SC-01** | Maximum Score Normalization | Perfect hygiene answers on all 15 scored items | `score = 100`, `rawPoints = 75`, `category = 'Strong'` | **PASS** |
| **TC-SC-02** | Minimum Score Normalization | Low hygiene answers on all 15 scored items | `score < 25`, `category = 'Needs Improvement'` | **PASS** |
| **TC-SC-03** | Categorical Threshold Boundaries | Boundary values (10, 39, 40, 59, 60, 79, 80, 95) | Correct category assigned per specification | **PASS** |
| **TC-SC-04** | Academic Disclaimer Verification | Calculated score breakdown object | Disclaimer string explicitly attached | **PASS** |

### 2.2 Analysis Engine Tests (`tests/analysis.test.ts`)
| Test ID | Description | Input Conditions | Expected Outcome | Status |
|---|---|---|---|---|
| **TC-AN-01** | Descriptive Statistics Accuracy | Array `[60, 70, 80, 90, 100]` | `mean = 80`, `median = 80`, `stdDev ≈ 15.81` | **PASS** |
| **TC-AN-02** | Empty Database Safety | Empty array `[]` | `count = 0`, `mean = 0`, `stdDev = 0` (No NaN/crashes) | **PASS** |
| **TC-AN-03** | Group Metrics & Percentage Rates | Mock cohort of 2 records with contrasting answers | `mfaRate = 50%`, `backupRate = 50%`, `avgScore = 60` | **PASS** |
| **TC-AN-04** | Welch's Two-Sample t-Test Calculation | Two mock cohorts (N1=4, N2=4) with differing score distributions | Valid `t-statistic`, `df > 0`, `0 <= pValue <= 1` | **PASS** |
| **TC-AN-05** | Insufficient Sample Size Handling | Sample size N < 3 | Returns `null` without executing test | **PASS** |

### 2.3 Validation Schema Tests (`tests/validation.test.ts`)
| Test ID | Description | Input Conditions | Expected Outcome | Status |
|---|---|---|---|---|
| **TC-VAL-01** | Valid Payload Acceptance | Full 21-question valid submission payload | `schema.safeParse().success = true` | **PASS** |
| **TC-VAL-02** | Required Field Enforcement | Payload with missing `mfaUsage` | `success = false`, error identifies missing field | **PASS** |
| **TC-VAL-03** | Invalid Role Rejection | Payload with unrecognized `respondentType` | `success = false` | **PASS** |
| **TC-VAL-04** | Invalid Age Bracket Rejection | Payload with age outside enum options | `success = false` | **PASS** |

### 2.4 CSV Export Tests (`tests/export.test.ts`)
| Test ID | Description | Input Conditions | Expected Outcome | Status |
|---|---|---|---|---|
| **TC-EXP-01** | RFC-4180 CSV Header Structure | Empty records array | Returns valid header row matching all 27 attributes | **PASS** |
| **TC-EXP-02** | Cell Escaping Special Characters | Fields containing commas or quotes | Escapes with surrounding quotes and double quotes | **PASS** |
| **TC-EXP-03** | Multi-Section Summary Report | Analysis report object | Generates all 5 academic report sections | **PASS** |

---

## 3. Manual System Verification Checklist

| Verification Task | Procedure | Expected Result | Verified Result |
|---|---|---|---|
| **1. Database Creation** | Run `npx prisma db push` | Creates `dev.db` and Prisma client | **PASSED** |
| **2. Synthetic Data Seeding** | Run `npm run seed` | Ingests 66 synthetic records marked `isDemo: true` | **PASSED** |
| **3. Survey Navigation** | Open `/survey`, test step 1 through 7 | Step validation prevents skipping empty fields; progress bar advances smoothly | **PASSED** |
| **4. Anonymous Submission** | Complete survey and click Submit | Submits to `/api/survey`, displays response ID and score feedback card | **PASSED** |
| **5. Admin Authentication** | Navigate to `/admin/login`, enter credentials | Authenticates, sets HTTP-only cookie, redirects to `/admin/dashboard` | **PASSED** |
| **6. Dashboard Visualizations** | Open `/admin/dashboard` | 10 Recharts render with live database data; KPI cards reflect correct counts | **PASSED** |
| **7. Dataset Filtering** | Toggle filter between `All`, `Real Only`, `Demo Only` | Metrics, charts, and banner update dynamically according to filter | **PASSED** |
| **8. Response Filtering & Search** | Navigate to `/admin/responses`, search by area | Filters table dynamically; Inspect button displays modal breakdown | **PASSED** |
| **9. Demo Purge Mechanism** | Click "Purge Synthetic Demo Data" in `/admin/responses` | Deletes records where `isDemo: true`; retains real records | **PASSED** |
| **10. CSV Export** | Navigate to `/admin/export`, trigger both downloads | Downloads valid `.csv` files matching RFC-4180 format | **PASSED** |
| **11. Next.js Production Build** | Run `npm run build` | Zero TypeScript errors, zero ESLint errors, all 16 routes optimized | **PASSED** |
