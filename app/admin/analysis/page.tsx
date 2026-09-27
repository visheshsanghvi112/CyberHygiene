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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>CIA v1.0 • Analytics Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Analytics & Cohort Comparisons
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Descriptive statistics, student versus faculty comparative distributions, and inferential hypothesis testing.
          </p>
        </div>

        {/* Dataset Filter Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 sm:p-1.5 rounded-xl border border-slate-800 shadow-lg backdrop-blur-md w-full sm:w-auto overflow-x-auto touch-scroll">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden xs:block shrink-0" />
          {(['all', 'real', 'demo'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-center ${
                filter === mode
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {mode === 'all' && 'All Assessments'}
              {mode === 'real' && 'Real Only'}
              {mode === 'demo' && 'Demo Dataset'}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-mono">Computing analytics metrics and hypothesis tests...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
          {error}
        </div>
      )}

      {report && (
        <div className="mt-8 space-y-6 sm:space-y-8">
          {/* Cyber Hygiene Score Methodology */}
          <div className="intel-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <h3 className="font-bold text-slate-100 text-sm">
                  Cyber Hygiene Score Methodology (0–100 Scale)
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 self-start sm:self-auto">
                15 Scored Habits • Max Raw: 75 pts • Normalized 0–100
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The score evaluates 15 positive cyber habits across 6 operational dimensions: <em>Password Practices, Multi-Factor Authentication, Device Security, Phishing Verification, Network & Public Wi-Fi Care, and Routine Data Backups</em>. Responses are mapped to 1–5 points based on adherence level, summed, and normalized to a 100-point scale.
            </p>
            <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <strong>Strong (80–100):</strong> Proactive posture
              </div>
              <div className="p-2.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <strong>Good (60–79):</strong> Baseline precautions
              </div>
              <div className="p-2.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <strong>Basic (40–59):</strong> Notable vulnerabilities
              </div>
              <div className="p-2.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                <strong>Needs Improvement (0–39):</strong> High risk
              </div>
            </div>
          </div>

          {/* Section 1: Descriptive Statistics Table */}
          <div className="intel-card p-4 sm:p-6">
            <div className="border-b border-slate-800/80 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-100">
                1. Descriptive Statistics of Cyber Hygiene Scores
              </h2>
              <p className="text-xs text-slate-400">
                Summary distribution metrics across the assessed population (N = {report.totalCount})
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Sample Value</th>
                    <th className="py-3 px-4">Statistical Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Sample Size (N)</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-400">{report.totalCount}</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      Total records analyzed ({report.realCount} real field + {report.demoCount} demonstration)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Mean Score (M)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-100">{report.overallStats.mean} / 100</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      Central tendency score of assessed cohort
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Median Score (Mdn)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-100">{report.overallStats.median} / 100</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      50th percentile respondent score
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Standard Deviation (SD)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-100">{report.overallStats.stdDev}</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      Dispersion/spread of individual scores around the mean
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Score Range [Min, Max]</td>
                    <td className="py-2.5 px-4 font-bold text-slate-100">
                      [{report.overallStats.min}, {report.overallStats.max}]
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">
                      Lowest and highest recorded scores in active dataset
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Score Categories Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Strong (80–100)</div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  {report.scoreCategories.strong}
                </div>
                <div className="text-[11px] text-emerald-300/80 mt-0.5">
                  {((report.scoreCategories.strong / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30">
                <div className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">Good (60–79)</div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  {report.scoreCategories.good}
                </div>
                <div className="text-[11px] text-sky-300/80 mt-0.5">
                  {((report.scoreCategories.good / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Basic (40–59)</div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  {report.scoreCategories.basic}
                </div>
                <div className="text-[11px] text-amber-300/80 mt-0.5">
                  {((report.scoreCategories.basic / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <div className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">Needs Improvement (0–39)</div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  {report.scoreCategories.needsImprovement}
                </div>
                <div className="text-[11px] text-rose-300/80 mt-0.5">
                  {((report.scoreCategories.needsImprovement / (report.totalCount || 1)) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Comparative Analysis (Students vs. Faculty) */}
          <div className="intel-card p-4 sm:p-6">
            <div className="border-b border-slate-800/80 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-100">
                2. Comparative Analysis: Students vs. Faculty & Staff
              </h2>
              <p className="text-xs text-slate-400">
                Direct cross-sectional comparison across key cybersecurity indicators
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[550px]">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Cyber Hygiene Metric</th>
                    <th className="py-3 px-4">Students (N = {report.studentMetrics.count})</th>
                    <th className="py-3 px-4">Faculty & Staff (N = {report.facultyMetrics.count})</th>
                    <th className="py-3 px-4">Absolute Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Average Cyber Hygiene Score</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-400">
                      {report.studentMetrics.averageScore} / 100
                    </td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400">
                      {report.facultyMetrics.averageScore} / 100
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.averageScore - report.studentMetrics.averageScore).toFixed(1)} pts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Multi-Factor Authentication Adoption</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.mfaAdoptionRate - report.studentMetrics.mfaAdoptionRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Routine File Backup Habits</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.regularBackupRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.regularBackupRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.regularBackupRate - report.studentMetrics.regularBackupRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">High Phishing Confidence (Self-Reported)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.highPhishingConfidenceRate - report.studentMetrics.highPhishingConfidenceRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Formal Cyber Training in Past 12 Months</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.formalTrainingRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.formalTrainingRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.formalTrainingRate - report.studentMetrics.formalTrainingRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Unique Password Creation (Always/Often)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.strongPasswordRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.strongPasswordRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.strongPasswordRate - report.studentMetrics.strongPasswordRate).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">Prompt OS & App Updates (Always/Often)</td>
                    <td className="py-2.5 px-4">{report.studentMetrics.regularUpdateRate}%</td>
                    <td className="py-2.5 px-4">{report.facultyMetrics.regularUpdateRate}%</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {(report.facultyMetrics.regularUpdateRate - report.studentMetrics.regularUpdateRate).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Inferential Statistics (Two-Sample t-Test) */}
          <div className="intel-card p-4 sm:p-6">
            <div className="border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-100">
                3. Comparative Statistical Hypothesis Testing (Two-Sample Welch&apos;s t-Test)
              </h2>
              <p className="text-xs text-slate-400">
                Independent two-sample Welch&apos;s t-test evaluating score differences between student and faculty cohorts
              </p>
            </div>

            {report.tTest ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="text-slate-400">Statistical Test</div>
                    <div className="font-semibold text-slate-200 mt-1">Welch&apos;s t-test (unequal variances)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="text-slate-400">t-Statistic</div>
                    <div className="font-mono font-bold text-indigo-400 mt-1">
                      t = {report.tTest.tStatistic}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="text-slate-400">Degrees of Freedom</div>
                    <div className="font-mono font-bold text-slate-200 mt-1">
                      df = {report.tTest.degreesOfFreedom}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="text-slate-400">p-Value (Two-Tailed)</div>
                    <div className="font-mono font-bold text-indigo-400 mt-1">
                      p = {report.tTest.pValue}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="font-bold text-slate-100 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Statistical Interpretation:</span>
                  </div>
                  <blockquote className="italic border-l-2 border-indigo-400 pl-3 text-slate-400">
                    &quot;{report.tTest.interpretation}&quot;
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                Insufficient cohort sample size (minimum N &gt;= 3 required per group) to execute inferential hypothesis testing.
              </div>
            )}
          </div>

          {/* Section 4: Practice Rankings */}
          <div className="intel-card p-4 sm:p-6">
            <div className="border-b border-slate-800/80 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-100">
                4. Cyber Hygiene Practice Adoption Rankings
              </h2>
              <p className="text-xs text-slate-400">
                Relative compliance across evaluated behavioral practices
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Security Practice</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Positive Adoption %</th>
                    <th className="py-3 px-4">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {report.practiceRankings.map((p, idx) => (
                    <tr key={p.practiceName} className="hover:bg-slate-900/60">
                      <td className="py-2.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-100">{p.practiceName}</td>
                      <td className="py-2.5 px-4 text-slate-400">{p.category}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-200">
                        {p.positiveResponsePercentage}%
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Strong'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : p.status === 'Moderate'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
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
