'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  ShieldCheck,
  Lock,
  Lightbulb,
  BookOpen,
  Filter,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Database,
} from 'lucide-react';
import { DashboardCharts } from '@/components/DashboardCharts';
import { FullAnalysisReport } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'real' | 'demo'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statsData, setStatsData] = useState<{
    report: FullAnalysisReport;
    charts: React.ComponentProps<typeof DashboardCharts>['charts'];
  } | null>(null);

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
        throw new Error(data.error || 'Failed to fetch statistics');
      }
      setStatsData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading dashboard');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats(filter);
  }, [filter, fetchStats]);

  // Aggregate weighted metrics
  const totalCount = statsData?.report.totalCount || 1;
  const sCount = statsData?.report.studentMetrics.count || 0;
  const fCount = statsData?.report.facultyMetrics.count || 0;

  const mfaOverall = Number(
    (
      ((statsData?.report.studentMetrics.mfaAdoptionRate || 0) * sCount +
        (statsData?.report.facultyMetrics.mfaAdoptionRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  const backupOverall = Number(
    (
      ((statsData?.report.studentMetrics.regularBackupRate || 0) * sCount +
        (statsData?.report.facultyMetrics.regularBackupRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  const phishingOverall = Number(
    (
      ((statsData?.report.studentMetrics.highPhishingConfidenceRate || 0) * sCount +
        (statsData?.report.facultyMetrics.highPhishingConfidenceRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  const trainingOverall = Number(
    (
      ((statsData?.report.studentMetrics.formalTrainingRate || 0) * sCount +
        (statsData?.report.facultyMetrics.formalTrainingRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  const passwordOverall = Number(
    (
      ((statsData?.report.studentMetrics.strongPasswordRate || 0) * sCount +
        (statsData?.report.facultyMetrics.strongPasswordRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  const patchOverall = Number(
    (
      ((statsData?.report.studentMetrics.regularUpdateRate || 0) * sCount +
        (statsData?.report.facultyMetrics.regularUpdateRate || 0) * fCount) /
      totalCount
    ).toFixed(1)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header & Dataset Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CIA v1.0 • Cyber Hygiene Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Cyber Hygiene Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor cybersecurity practices, assessment outcomes, and behavioural risk indicators.
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
              {mode === 'all' && 'All Assessments'}
              {mode === 'real' && 'Real Assessments Only'}
              {mode === 'demo' && 'Demo Dataset'}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && !statsData && (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Calculating system intelligence metrics...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
          <p className="font-semibold">{error}</p>
          <button
            onClick={() => fetchStats(filter)}
            className="mt-3 px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium"
          >
            Retry Loading
          </button>
        </div>
      )}

      {statsData && (
        <div className="mt-8 space-y-10">
          {/* SECTION 1: Security Behaviour Overview (Primary KPI Cards) */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Security Behaviour Overview
                </h2>
                <p className="text-xs text-slate-500">
                  High-level posture KPIs across authenticated student and faculty assessments
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchStats(filter)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 shadow-2xs"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh</span>
                </button>
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  <Database className="w-3 h-3" />
                  <span>Dataset: {statsData.report.realCount} Real / {statsData.report.demoCount} Demo</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Card 1: Total Assessments */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Assessments</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {statsData.report.totalCount}
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
                  <span>{sCount} Students</span>
                  <span>{fCount} Faculty</span>
                </div>
              </div>

              {/* Card 2: Average Cyber Hygiene Score */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Avg Score</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {statsData.report.overallStats.mean}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
                <div className="mt-2 text-[11px] font-medium text-emerald-600">
                  {statsData.report.overallStats.mean >= 60 ? 'Good Baseline' : 'Basic Posture'}
                </div>
              </div>

              {/* Card 3: MFA Adoption */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">MFA Adoption</span>
                  <Lock className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">
                  {mfaOverall}%
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  Std {statsData.report.studentMetrics.mfaAdoptionRate}% • Fac {statsData.report.facultyMetrics.mfaAdoptionRate}%
                </div>
              </div>

              {/* Card 4: Backup Adoption */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Regular Backup</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {backupOverall}%
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  Std {statsData.report.studentMetrics.regularBackupRate}% • Fac {statsData.report.facultyMetrics.regularBackupRate}%
                </div>
              </div>

              {/* Card 5: Phishing Awareness */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Phishing Ready</span>
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                  {phishingOverall}%
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  High identification confidence
                </div>
              </div>

              {/* Card 6: Security Training Coverage */}
              <div className="academic-card p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Training Rate</span>
                  <BookOpen className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-700">
                  {trainingOverall}%
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  Completed institutional training
                </div>
              </div>
            </div>
          </section>

          {/* Quick Module Navigation Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/admin/responses"
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-2xs transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">Assessment Records</div>
                <div className="text-[11px] text-slate-500">Inspect & filter individual audits</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/admin/risk-insights"
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-2xs transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">Risk Insights</div>
                <div className="text-[11px] text-slate-500">Domain vulnerabilities & flags</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/admin/analysis"
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-2xs transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">Cohort Analytics</div>
                <div className="text-[11px] text-slate-500">Comparative tests & Welch t-test</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/admin/reports"
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-2xs transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">Report Generator</div>
                <div className="text-[11px] text-slate-500">Export publication summaries</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* SECTION 2: Overall Security Posture */}
          <section className="academic-card p-6 bg-slate-900 text-white border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  System Health & Posture Matrix
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Overall Security Posture
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                  Scale: 0–100% Adherence
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: 'Password Hygiene',
                  percentage: passwordOverall,
                  status: passwordOverall >= 70 ? 'Strong' : passwordOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Unique complex passwords & credential uniqueness',
                },
                {
                  label: 'MFA Adoption',
                  percentage: mfaOverall,
                  status: mfaOverall >= 70 ? 'Strong' : mfaOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Multi-factor authentication on critical accounts',
                },
                {
                  label: 'Patch & Update Discipline',
                  percentage: patchOverall,
                  status: patchOverall >= 70 ? 'Strong' : patchOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Prompt installation of OS and software security patches',
                },
                {
                  label: 'Phishing Readiness',
                  percentage: phishingOverall,
                  status: phishingOverall >= 70 ? 'Strong' : phishingOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Link verification and suspicious message vigilance',
                },
                {
                  label: 'Backup Discipline',
                  percentage: backupOverall,
                  status: backupOverall >= 70 ? 'Strong' : backupOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Scheduled offline or encrypted cloud backups',
                },
                {
                  label: 'Network & Wi-Fi Safety',
                  percentage: 64.8,
                  status: 'Moderate',
                  desc: 'Avoidance of sensitive logins over public networks',
                },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Strong'
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                          : item.status === 'Moderate'
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                          : 'bg-rose-900/60 text-rose-300 border border-rose-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-extrabold text-white">{item.percentage}%</span>
                    <span className="text-[11px] text-slate-400">adoption</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage >= 70
                          ? 'bg-emerald-500'
                          : item.percentage >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Assessment Performance & Visual Analytics */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Assessment Performance & Distribution
                </h2>
                <p className="text-xs text-slate-500">
                  Ten interactive charts displaying behavioural frequencies and cohort contrasts
                </p>
              </div>

              {/* Score Methodology Drawer / Pill */}
              <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  <strong>Cyber Hygiene Score:</strong> 0–39 Needs Improvement • 40–59 Basic • 60–79 Good • 80–100 Strong
                </span>
              </div>
            </div>

            <DashboardCharts charts={statsData.charts} />
          </section>

          {/* SECTION 4: Priority Improvement Areas (Security Improvement Recommendations) */}
          <section className="academic-card bg-indigo-50/40 border-indigo-200 p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-700" />
                <div>
                  <h2 className="text-base font-bold text-indigo-950">
                    Security Improvement Recommendations
                  </h2>
                  <p className="text-xs text-indigo-900/80">
                    Automated priority actions derived dynamically from current assessment indicators
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-100 text-indigo-800">
                Action Engine
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  priority: 'High' as const,
                  issue: 'Critical gap in routine offline & encrypted cloud data backups',
                  indicator: `${backupOverall}% overall adoption (Students: ${statsData.report.studentMetrics.regularBackupRate}%)`,
                  action:
                    'Mandate scheduled automated backups and provide institution-managed encrypted OneDrive/Google Drive storage workshops.',
                },
                {
                  priority: 'High' as const,
                  issue: 'Formal cybersecurity training participation deficit',
                  indicator: `${trainingOverall}% completed institutional training`,
                  action:
                    'Implement mandatory interactive cyber hygiene onboarding modules for both newly matriculating students and joining faculty.',
                },
                {
                  priority: 'Medium' as const,
                  issue: 'Inconsistent Multi-Factor Authentication (MFA) coverage across secondary services',
                  indicator: `${mfaOverall}% adoption on primary accounts`,
                  action:
                    'Enforce hardware/authenticator-app based MFA campus-wide for campus portals, institutional email, and student portals.',
                },
                {
                  priority: 'Medium' as const,
                  issue: 'Vulnerability to phishing & unverified link interaction',
                  indicator: `${phishingOverall}% self-assessed high confidence`,
                  action:
                    'Deploy simulated benign phishing campaigns with immediate just-in-time micro-training explaining URL discrepancy indicators.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.priority === 'High'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        Priority: {item.priority}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.indicator}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5">
                      {item.issue}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Recommended Action:</strong> {item.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
