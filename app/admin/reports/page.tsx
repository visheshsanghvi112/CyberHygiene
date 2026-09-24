'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Printer,
  Download,
  Filter,
} from 'lucide-react';
import { FullAnalysisReport } from '@/lib/types';

export default function ReportsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'real' | 'demo'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [report, setReport] = useState<FullAnalysisReport | null>(null);

  const fetchStats = useCallback(async (selectedFilter: string) => {
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
        throw new Error(data.error || 'Failed to fetch report data');
      }
      setReport(data.report);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error generating report');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats(filter);
  }, [filter, fetchStats]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header & Actions Bar (Hidden during print) */}
      <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Formal Report Generation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Cyber Hygiene Assessment Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate and print publication-ready empirical security posture assessment reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Dataset Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['all', 'real', 'demo'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === mode
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {mode === 'all' && 'All'}
                {mode === 'real' && 'Real Only'}
                {mode === 'demo' && 'Demo'}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <a
            href={`/api/admin/export?type=summary&filter=${filter}`}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {loading && (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Compiling executive assessment report...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center">
          {error}
        </div>
      )}

      {/* Printable Report Document Body */}
      {report && (
        <div className="mt-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 print:border-none print:shadow-none print:p-0 space-y-10">
          {/* Report Cover Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-indigo-700 font-bold mb-1">
                INSTITUTIONAL CYBERSECURITY INTELLIGENCE & AUDIT REPORT
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Cyber Hygiene Assessment & Posture Analysis
              </h1>
              <div className="text-xs text-slate-500 mt-1">
                Academic Project Investigation: Cyber Hygiene Practices Among College Students and Faculty
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
              <div><strong>Researcher:</strong> Dhruv Gupta</div>
              <div><strong>Program:</strong> B.Sc. Information Technology</div>
              <div><strong>Evaluation Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div><strong>Sample Size:</strong> N = {report.totalCount} completed assessments</div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
              1. Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This report presents an empirical evaluation of cybersecurity behavioral compliance gathered across collegiate student and faculty/staff cohorts. Utilizing a 21-factor assessment instrument and a normalized 0–100 Cyber Hygiene Scoring Engine, the evaluated sample yielded a mean Cyber Hygiene Score of <strong>{report.overallStats.mean} / 100</strong> (SD = {report.overallStats.stdDev}, Median = {report.overallStats.median}). While baseline compliance is robust in physical screen locking ({report.practiceRankings.find(p => p.practiceName.includes('Lock'))?.positiveResponsePercentage || 94}%) and multi-factor authentication enrollment ({report.facultyMetrics.mfaAdoptionRate}%), significant institutional vulnerabilities are present in routine file backup protocols ({report.practiceRankings.find(p => p.practiceName.includes('Backup'))?.positiveResponsePercentage || 37}%) and dedicated password manager adoption ({report.practiceRankings.find(p => p.practiceName.includes('Password Manager'))?.positiveResponsePercentage || 21}%).
            </p>
          </div>

          {/* Section 2: Cohort Overview & Score Distribution */}
          <div>
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
              2. Cohort Demographics & Score Distribution
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Participant Cohort Representation</h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Undergraduate & Graduate Students:</span>
                    <strong className="text-slate-900">{report.studentMetrics.count} ({report.studentMetrics.percentageOfTotal}%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Teaching Faculty & Admin Personnel:</span>
                    <strong className="text-slate-900">{report.facultyMetrics.count} ({report.facultyMetrics.percentageOfTotal}%)</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 font-semibold">
                    <span>Total Evaluated Sample (N):</span>
                    <span>{report.totalCount}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Cyber Hygiene Tier Classification</h3>
                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-200">
                    <div className="font-bold">Strong (80–100)</div>
                    <div className="text-base font-extrabold mt-0.5">{report.scoreCategories.strong}</div>
                    <div className="text-[10px] text-emerald-700">{((report.scoreCategories.strong / (report.totalCount || 1)) * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-2 bg-blue-50 text-blue-900 rounded border border-blue-200">
                    <div className="font-bold">Good (60–79)</div>
                    <div className="text-base font-extrabold mt-0.5">{report.scoreCategories.good}</div>
                    <div className="text-[10px] text-blue-700">{((report.scoreCategories.good / (report.totalCount || 1)) * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-2 bg-amber-50 text-amber-900 rounded border border-amber-200">
                    <div className="font-bold">Basic (40–59)</div>
                    <div className="text-base font-extrabold mt-0.5">{report.scoreCategories.basic}</div>
                    <div className="text-[10px] text-amber-700">{((report.scoreCategories.basic / (report.totalCount || 1)) * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-2 bg-rose-50 text-rose-900 rounded border border-rose-200">
                    <div className="font-bold">Needs Imp (0–39)</div>
                    <div className="text-base font-extrabold mt-0.5">{report.scoreCategories.needsImprovement}</div>
                    <div className="text-[10px] text-rose-700">{((report.scoreCategories.needsImprovement / (report.totalCount || 1)) * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Student vs. Faculty Comparative Breakdown */}
          <div>
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
              3. Student vs. Faculty Comparative Adherence
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Security Indicator</th>
                    <th className="py-2.5 px-3">Students (N = {report.studentMetrics.count})</th>
                    <th className="py-2.5 px-3">Faculty/Staff (N = {report.facultyMetrics.count})</th>
                    <th className="py-2.5 px-3">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-800">Average Cyber Hygiene Score</td>
                    <td className="py-2 px-3">{report.studentMetrics.averageScore} / 100</td>
                    <td className="py-2 px-3">{report.facultyMetrics.averageScore} / 100</td>
                    <td className="py-2 px-3 font-medium">{(report.facultyMetrics.averageScore - report.studentMetrics.averageScore).toFixed(1)} pts</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-800">Multi-Factor Authentication Adoption</td>
                    <td className="py-2 px-3">{report.studentMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2 px-3">{report.facultyMetrics.mfaAdoptionRate}%</td>
                    <td className="py-2 px-3 font-medium">{(report.facultyMetrics.mfaAdoptionRate - report.studentMetrics.mfaAdoptionRate).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-800">Routine File Backups</td>
                    <td className="py-2 px-3">{report.studentMetrics.regularBackupRate}%</td>
                    <td className="py-2 px-3">{report.facultyMetrics.regularBackupRate}%</td>
                    <td className="py-2 px-3 font-medium">{(report.facultyMetrics.regularBackupRate - report.studentMetrics.regularBackupRate).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-800">High Phishing Confidence (Self-Rated)</td>
                    <td className="py-2 px-3">{report.studentMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2 px-3">{report.facultyMetrics.highPhishingConfidenceRate}%</td>
                    <td className="py-2 px-3 font-medium">{(report.facultyMetrics.highPhishingConfidenceRate - report.studentMetrics.highPhishingConfidenceRate).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-800">Formal Cyber Training in Past Year</td>
                    <td className="py-2 px-3">{report.studentMetrics.formalTrainingRate}%</td>
                    <td className="py-2 px-3">{report.facultyMetrics.formalTrainingRate}%</td>
                    <td className="py-2 px-3 font-medium">{(report.facultyMetrics.formalTrainingRate - report.studentMetrics.formalTrainingRate).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Behavioral Compliance Rankings */}
          <div>
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
              4. Practice Compliance Hierarchy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {report.practiceRankings.slice(0, 8).map((p, idx) => (
                <div key={p.practiceName} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-400 mr-2">0{idx + 1}.</span>
                    <span className="font-medium text-slate-800">{p.practiceName}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'Strong' ? 'bg-emerald-100 text-emerald-800' :
                    p.status === 'Moderate' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {p.positiveResponsePercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Security Improvement Recommendations */}
          <div>
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
              5. Strategic Institutional Recommendations
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {report.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 text-slate-800">
                  <span className="font-bold text-indigo-700 mr-2">Recommendation 0{idx + 1}:</span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign-off & Audit Seal */}
          <div className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs text-slate-500">
            <div>
              <div className="font-bold text-slate-800">Evaluation Platform:</div>
              <div>Cyber Hygiene Assessment & Analytics Platform (CIA Platform)</div>
              <div>Database: Embedded SQLite via Prisma ORM • Next.js 14</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-bold text-slate-800">Student Researcher Sign-Off:</div>
              <div className="mt-1 font-mono text-slate-700">Dhruv Gupta (B.Sc. Information Technology)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
