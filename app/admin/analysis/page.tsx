'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Filter,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { FullAnalysisReport } from '@/lib/types';

export default function AdminAnalysisPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'real' | 'demo'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [report, setReport] = useState<FullAnalysisReport | null>(null);

  const fetchAnalysis = useCallback(async (selectedFilter: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/stats?filter=${selectedFilter}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to compute statistical analysis');
      }
      setReport(data.report);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error generating analysis');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAnalysis(filter);
  }, [filter, fetchAnalysis]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>CIA v1.0 • Analytics Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Analytics & Cohort Comparisons
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Descriptive statistics, student versus faculty comparative distributions, and inferential hypothesis testing.
          </p>
        </div>

        {/* Dataset Filter Selector */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {(['all', 'real', 'demo'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === mode
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {mode === 'all' && 'All Records'}
              {mode === 'real' && 'Real Only'}
              {mode === 'demo' && 'Demo Only'}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Computing analytics metrics and hypothesis tests...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center">
          {error}
        </div>
      )}

      {report && (
        <div className="mt-8 space-y-8">
          {/* Cyber Hygiene Score Methodology */}
          <div className="academic-card bg-slate-50 border-slate-200 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Cyber Hygiene Score Methodology (0–100 Scale)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                15 Scored Habits • Max Raw: 75 pts • Normalized 0–100
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The score evaluates 15 positive cyber habits across 6 operational dimensions: <em>Password Practices, Multi-Factor Authentication, Device Security, Phishing Verification, Network & Public Wi-Fi Care, and Routine Data Backups</em>. Responses are mapped to 1–5 points based on adherence level, summed, and normalized to a 100-point scale.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                <strong>Strong (80–100):</strong> Proactive posture
              </div>
              <div className="p-2 rounded bg-blue-50 text-blue-900 border border-blue-200">
                <strong>Good (60–79):</strong> Baseline precautions
              </div>
              <div className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                <strong>Basic (40–59):</strong> Notable vulnerabilities
              </div>
              <div className="p-2 rounded bg-rose-50 text-rose-900 border border-rose-200">
                <strong>Needs Improvement (0–39):</strong> High risk
              </div>
            </div>
          </div>

          {/* Section 1: Descriptive Statistics Table */}
          <div className="academic-card">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                1. Descriptive Statistics of Cyber Hygiene Scores
              </h2>
              <p className="text-xs text-slate-500">
                Summary distribution metrics across the assessed population (N = {report.totalCount})
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Sample Value</th>
                    <th className="py-3 px-4">Statistical Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Sample Size (N)</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-700">{report.totalCount}</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      Total records analyzed ({report.realCount} real field + {report.demoCount} demonstration)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Mean Score (M)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{report.overallStats.mean} / 100</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      Central tendency score of assessed cohort
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Median Score (Mdn)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{report.overallStats.median} / 100</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      50th percentile respondent score
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Standard Deviation (SD)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{report.overallStats.stdDev}</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      Dispersion/spread of individual scores around the mean
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Score Range [Min, Max]</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">
                      [{report.overallStats.min}, {report.overallStats.max}]
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      Lowest and highest recorded scores in active dataset
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Score Categories Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-[11px] font-bold text-emerald-800 uppercase">Strong (80–100)</div>
                <div className="text-xl font-bold text-emerald-950 mt-1">
                  {report.scoreCategories.strong}
                </div>
                <div className="text-[10px] text-emerald-700">
                  {((report.scoreCategories.strong / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-[11px] font-bold text-blue-800 uppercase">Good (60–79)</div>
                <div className="text-xl font-bold text-blue-950 mt-1">
                  {report.scoreCategories.good}
                </div>
                <div className="text-[10px] text-blue-700">
                  {((report.scoreCategories.good / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-[11px] font-bold text-amber-800 uppercase">Basic (40–59)</div>
                <div className="text-xl font-bold text-amber-950 mt-1">
                  {report.scoreCategories.basic}
                </div>
                <div className="text-[10px] text-amber-700">
                  {((report.scoreCategories.basic / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <div className="text-[11px] font-bold text-rose-800 uppercase">Needs Improvement (0–39)</div>
                <div className="text-xl font-bold text-rose-950 mt-1">
                  {report.scoreCategories.needsImprovement}
                </div>
                <div className="text-[10px] text-rose-700">
                  {((report.scoreCategories.needsImprovement / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Comparative Analysis (Students vs. Faculty) */}
          <div className="academic-card">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                2. Comparative Analysis: Students vs. Faculty & Staff
              </h2>
              <p className="text-xs text-slate-500">
                Direct cross-sectional comparison across key cybersecurity indicators
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Cyber Hygiene Metric</th>
                    <th className="py-3 px-4">Students (N = {report.studentMetrics.count})</th>
                    <th className="py-3 px-4">Faculty & Staff (N = {report.facultyMetrics.count})</th>
                    <th className="py-3 px-4">Absolute Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Average Cyber Hygiene Score</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-700">
                      {report.studentMetrics.averageScore} / 100
                    </td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">
                      {report.facultyMetrics.averageScore} / 100
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.averageScore - report.studentMetrics.averageScore).toFixed(1)} pts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Multi-Factor Authentication Adoption</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.mfaAdoptionRate - report.studentMetrics.mfaAdoptionRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Routine File Backup Habits</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.regularBackupRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.regularBackupRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.regularBackupRate - report.studentMetrics.regularBackupRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">High Phishing Confidence (Self-Reported)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.highPhishingConfidenceRate - report.studentMetrics.highPhishingConfidenceRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Formal Cyber Training in Past 12 Months</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.formalTrainingRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.formalTrainingRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.formalTrainingRate - report.studentMetrics.formalTrainingRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Unique Password Creation (Always/Often)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.strongPasswordRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.strongPasswordRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.strongPasswordRate - report.studentMetrics.strongPasswordRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">Prompt OS & App Updates (Always/Often)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.regularUpdateRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.regularUpdateRate}%</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {(report.facultyMetrics.regularUpdateRate - report.studentMetrics.regularUpdateRate).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Inferential Statistics (Two-Sample t-Test) */}
          <div className="academic-card bg-slate-50/70 border-slate-200">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                3. Comparative Statistical Hypothesis Testing (Two-Sample Welch&apos;s t-Test)
              </h2>
              <p className="text-xs text-slate-500">
                Independent two-sample Welch&apos;s t-test evaluating score differences between student and faculty cohorts
              </p>
            </div>

            {report.tTest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <div className="text-slate-500">Statistical Test</div>
                    <div className="font-semibold text-slate-800 mt-1">Welch&apos;s t-test (unequal variances)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <div className="text-slate-500">t-Statistic</div>
                    <div className="font-mono font-bold text-indigo-700 mt-1">
                      t = {report.tTest.tStatistic}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <div className="text-slate-500">Degrees of Freedom</div>
                    <div className="font-mono font-bold text-slate-800 mt-1">
                      df = {report.tTest.degreesOfFreedom}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <div className="text-slate-500">p-Value (Two-Tailed)</div>
                    <div className="font-mono font-bold text-indigo-700 mt-1">
                      p = {report.tTest.pValue}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Statistical Interpretation:</span>
                  </div>
                  <blockquote className="italic border-l-2 border-indigo-400 pl-3 text-slate-600">
                    &quot;{report.tTest.interpretation}&quot;
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                Insufficient cohort sample size (minimum N &gt;= 3 required per group) to execute inferential hypothesis testing.
              </div>
            )}
          </div>

          {/* Section 4: Practice Rankings */}
          <div className="academic-card">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                4. Cyber Hygiene Practice Adoption Rankings
              </h2>
              <p className="text-xs text-slate-500">
                Relative compliance across evaluated behavioral practices
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Security Practice</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Positive Adoption %</th>
                    <th className="py-3 px-4">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.practiceRankings.map((p, idx) => (
                    <tr key={p.practiceName} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">{p.practiceName}</td>
                      <td className="py-2.5 px-4 text-slate-500">{p.category}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800">
                        {p.positiveResponsePercentage}%
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Strong'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'Moderate'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
