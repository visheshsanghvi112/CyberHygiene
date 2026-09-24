import { PrismaClient } from '@prisma/client';
import { generateFullReport } from '../lib/analysis';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const records = await prisma.surveyResponse.findMany({
    where: { isDemo: true },
    orderBy: { createdAt: 'desc' },
  });

  const report = generateFullReport(records, 'demo');

  const content = `# DEMO / SYNTHETIC DATASET ANALYSIS REPORT
### Prototype Baseline Metrics for Project Presentation
**Student Researcher:** Dhruv Gupta • B.Sc. Information Technology  
**Generated At:** ${new Date().toISOString()}  

> [!IMPORTANT]
> **ACADEMIC INTEGRITY NOTICE — DEMO / SYNTHETIC DATA ONLY**  
> The figures, statistics, and tables in this document were computed exclusively from **${report.totalCount} synthetic demonstration records** generated for development, interface testing, and academic presentation purposes.  
> **These results do NOT represent actual field-study participants** and must never be published or presented as empirical research findings from real college students or faculty. Once genuine survey responses are gathered via \`/survey\`, they will be documented in \`REPORT_DATA.md\`.

---

## 1. Synthetic Sample Composition Overview

| Metric | Synthetic Value | Description |
|---|---|---|
| **Total Synthetic Records** | **${report.totalCount}** | Total generated demo responses |
| **Student Cohort Count** | **${report.studentMetrics.count}** (${report.studentMetrics.percentageOfTotal}%) | Simulated student respondents (Undergraduate/Postgraduate) |
| **Faculty/Staff Cohort Count** | **${report.facultyMetrics.count}** (${report.facultyMetrics.percentageOfTotal}%) | Simulated teaching and administrative personnel |
| **Data Generation Method** | Deterministic PRNG | Mulberry32 algorithm with neutral, unforced probability distributions |
| **Data Integrity Flag** | \`isDemo = true\` | Fully partitioned from real survey entries |

---

## 2. Descriptive Statistics of Cyber Hygiene Scores (0–100 Scale)

All scores are calculated through the system's 15-factor normalized scoring engine:

| Statistical Metric | Synthetic Dataset Value | Meaning |
|---|---|---|
| **Mean Score ($\\\\bar{x}$)** | **${report.overallStats.mean} / 100** | Overall average cyber hygiene index |
| **Median Score ($Mdn$)** | **${report.overallStats.median} / 100** | 50th percentile midpoint score |
| **Sample Standard Deviation ($s$)** | **${report.overallStats.stdDev}** | Degree of dispersion around the mean |
| **Lowest Score (Min)** | **${report.overallStats.min} / 100** | Minimum score in demo dataset |
| **Highest Score (Max)** | **${report.overallStats.max} / 100** | Maximum score in demo dataset |

### Score Category Distribution
| Category | Range | Count ($f$) | Proportion ($\\%$) |
|---|---|---|---|
| **Strong** | 80 – 100 | **${report.scoreCategories.strong}** | **${((report.scoreCategories.strong / report.totalCount) * 100).toFixed(1)}%** |
| **Good** | 60 – 79 | **${report.scoreCategories.good}** | **${((report.scoreCategories.good / report.totalCount) * 100).toFixed(1)}%** |
| **Basic** | 40 – 59 | **${report.scoreCategories.basic}** | **${((report.scoreCategories.basic / report.totalCount) * 100).toFixed(1)}%** |
| **Needs Improvement** | 0 – 39 | **${report.scoreCategories.needsImprovement}** | **${((report.scoreCategories.needsImprovement / report.totalCount) * 100).toFixed(1)}%** |

---

## 3. Student vs. Faculty Comparative Breakdown

| Indicator | Students ($N = ${report.studentMetrics.count}$) | Faculty/Staff ($N = ${report.facultyMetrics.count}$) | Variance |
|---|---|---|---|
| **Average Score** | **${report.studentMetrics.averageScore}** | **${report.facultyMetrics.averageScore}** | ${(report.facultyMetrics.averageScore - report.studentMetrics.averageScore).toFixed(1)} pts |
| **Median Score** | **${report.studentMetrics.medianScore}** | **${report.facultyMetrics.medianScore}** | ${(report.facultyMetrics.medianScore - report.studentMetrics.medianScore).toFixed(1)} pts |
| **MFA Adoption Rate** | **${report.studentMetrics.mfaAdoptionRate}%** | **${report.facultyMetrics.mfaAdoptionRate}%** | ${(report.facultyMetrics.mfaAdoptionRate - report.studentMetrics.mfaAdoptionRate).toFixed(1)}% |
| **Routine File Backup Rate** | **${report.studentMetrics.regularBackupRate}%** | **${report.facultyMetrics.regularBackupRate}%** | ${(report.facultyMetrics.regularBackupRate - report.studentMetrics.regularBackupRate).toFixed(1)}% |
| **High Phishing Confidence** | **${report.studentMetrics.highPhishingConfidenceRate}%** | **${report.facultyMetrics.highPhishingConfidenceRate}%** | ${(report.facultyMetrics.highPhishingConfidenceRate - report.studentMetrics.highPhishingConfidenceRate).toFixed(1)}% |
| **Formal Training in Past Year** | **${report.studentMetrics.formalTrainingRate}%** | **${report.facultyMetrics.formalTrainingRate}%** | ${(report.facultyMetrics.formalTrainingRate - report.studentMetrics.formalTrainingRate).toFixed(1)}% |
| **Strong Password Creation** | **${report.studentMetrics.strongPasswordRate}%** | **${report.facultyMetrics.strongPasswordRate}%** | ${(report.facultyMetrics.strongPasswordRate - report.studentMetrics.strongPasswordRate).toFixed(1)}% |
| **Regular OS/App Updates** | **${report.studentMetrics.regularUpdateRate}%** | **${report.facultyMetrics.regularUpdateRate}%** | ${(report.facultyMetrics.regularUpdateRate - report.studentMetrics.regularUpdateRate).toFixed(1)}% |

---

## 4. Inferential Statistical Hypothesis Test (Demonstration)

${
  report.tTest
    ? `
- **Test Type:** ${report.tTest.method}
- **Calculated t-Statistic:** \`t = ${report.tTest.tStatistic}\`
- **Degrees of Freedom:** \`df = ${report.tTest.degreesOfFreedom}\`
- **Two-Tailed p-Value:** \`p = ${report.tTest.pValue}\`
- **Academic Phrasing:**  
  *"${report.tTest.interpretation}"*
`
    : 'Insufficient sample size for inferential statistics.'
}

---

## 5. Security Practices Hierarchy (Adoption Rankings)

Ranked from highest adherence to lowest adherence across all ${report.totalCount} synthetic respondents:

| Rank | Security Habit | Domain | Positive Adoption % | Status |
|---|---|---|---|---|
${report.practiceRankings
  .map(
    (p, idx) =>
      `| **${idx + 1}** | ${p.practiceName} | ${p.category} | **${p.positiveResponsePercentage}%** | ${p.status} |`
  )
  .join('\n')}

---

## 6. Auto-Generated Institutional Recommendations

The platform evaluates empirical thresholds from the dataset to produce these recommendations:

${report.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}

---

## 7. Instructions for Real Data Handover

When genuine survey responses are gathered:
1. Purge the synthetic demo records from \`/admin/responses\` using **Purge Synthetic Demo Data**.
2. Real participant submissions will automatically populate the live database.
3. Export the real CSV and document findings in \`REPORT_DATA.md\`.
`;

  const outputPath = path.join(__dirname, '../DEMO_RESULTS.md');
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`Successfully generated DEMO_RESULTS.md with exact computed metrics!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
