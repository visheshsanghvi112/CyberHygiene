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
  AlertTriangle,
  KeyRound,
  Wifi,
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
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Top Header & Dataset Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CIA v1.0 • Cyber Hygiene Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Cyber Hygiene Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time cybersecurity practices, behavioral risk matrices, and comparative cohort telemetry.
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

      {/* Loading & Error States */}
      {loading && !statsData && (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400 font-mono">Processing institutional security intelligence...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm text-center backdrop-blur-md">
          <p className="font-semibold">{error}</p>
          <button
            onClick={() => fetchStats(filter)}
            className="mt-3 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            Retry Loading
          </button>
        </div>
      )}

      {statsData && (
        <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-10">
          {/* SECTION 1: Security Behaviour Overview (Primary KPI Cards) */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  Security Behaviour Overview
                </h2>
                <p className="text-xs text-slate-400">
                  Core posture telemetry synthesized across student and faculty assessment submissions
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                <button
                  onClick={() => fetchStats(filter)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Refresh</span>
                </button>
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all"
                >
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{statsData.report.realCount} Real / {statsData.report.demoCount} Demo</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-4">
              {/* Card 1: Total Assessments */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-blue-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">Assessments</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-100">
                  {statsData.report.totalCount}
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 flex justify-between font-mono truncate">
                  <span>{sCount} Std</span>
                  <span>{fCount} Fac</span>
                </div>
              </div>

              {/* Card 2: Average Cyber Hygiene Score */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-emerald-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">Avg Score</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-100">
                    {statsData.report.overallStats.mean}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500">/100</span>
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] font-semibold text-emerald-400 flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">{statsData.report.overallStats.mean >= 60 ? 'Good Baseline' : 'Basic Posture'}</span>
                </div>
              </div>

              {/* Card 3: MFA Adoption */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-indigo-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">MFA Rate</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-indigo-300">
                  {mfaOverall}%
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  Std {statsData.report.studentMetrics.mfaAdoptionRate}% • Fac {statsData.report.facultyMetrics.mfaAdoptionRate}%
                </div>
              </div>

              {/* Card 4: Backup Adoption */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-teal-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">Backups</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-teal-300">
                  {backupOverall}%
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  Std {statsData.report.studentMetrics.regularBackupRate}% • Fac {statsData.report.facultyMetrics.regularBackupRate}%
                </div>
              </div>

              {/* Card 5: Phishing Awareness */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-amber-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">Phishing Ready</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-300">
                  {phishingOverall}%
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  High confidence
                </div>
              </div>

              {/* Card 6: Security Training Coverage */}
              <div className="intel-card p-3 sm:p-4.5 border-t-2 border-t-rose-500 min-w-0">
                <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate">Training</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-rose-300">
                  {trainingOverall}%
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  Institutional training
                </div>
              </div>
            </div>
          </section>

          {/* Quick Module Navigation Hub */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            <Link
              href="/admin/responses"
              className="intel-card p-3.5 sm:p-4 hover:border-indigo-500/50 flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  Assessment Records
                </div>
                <div className="text-[11px] text-slate-400">Inspect & filter individual audits</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0 ml-2" />
            </Link>

            <Link
              href="/admin/risk-insights"
              className="intel-card p-3.5 sm:p-4 hover:border-amber-500/50 flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  Risk Insights Matrix
                </div>
                <div className="text-[11px] text-slate-400">Domain vulnerabilities & flags</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
            </Link>

            <Link
              href="/admin/analysis"
              className="intel-card p-3.5 sm:p-4 hover:border-sky-500/50 flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  Cohort Analytics
                </div>
                <div className="text-[11px] text-slate-400">Welch&apos;s t-test & statistics</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0 ml-2" />
            </Link>

            <Link
              href="/admin/reports"
              className="intel-card p-3.5 sm:p-4 hover:border-purple-500/50 flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                  Audit Report Generator
                </div>
                <div className="text-[11px] text-slate-400">Printable executive summaries</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
            </Link>
          </div>

          {/* SECTION 2: Overall Security Posture */}
          <section className="intel-card-elevated p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
                  System Health & Posture Matrix
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                  Overall Cybersecurity Posture Matrix
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  Scale: 0–100% Adherence Benchmark
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: 'Password Hygiene',
                  percentage: passwordOverall,
                  status: passwordOverall >= 70 ? 'Strong' : passwordOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Unique complex passwords & credential isolation',
                  icon: KeyRound,
                },
                {
                  label: 'MFA Adoption',
                  percentage: mfaOverall,
                  status: mfaOverall >= 70 ? 'Strong' : mfaOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Multi-factor authentication on critical accounts',
                  icon: Lock,
                },
                {
                  label: 'Patch & Update Discipline',
                  percentage: patchOverall,
                  status: patchOverall >= 70 ? 'Strong' : patchOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Prompt installation of OS and software security patches',
                  icon: ShieldCheck,
                },
                {
                  label: 'Phishing Readiness',
                  percentage: phishingOverall,
                  status: phishingOverall >= 70 ? 'Strong' : phishingOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Link verification and suspicious message vigilance',
                  icon: AlertTriangle,
                },
                {
                  label: 'Backup Discipline',
                  percentage: backupOverall,
                  status: backupOverall >= 70 ? 'Strong' : backupOverall >= 50 ? 'Moderate' : 'Needs Attention',
                  desc: 'Scheduled offline or encrypted cloud backups',
                  icon: TrendingUp,
                },
                {
                  label: 'Network & Wi-Fi Safety',
                  percentage: 64.8,
                  status: 'Moderate',
                  desc: 'Avoidance of sensitive logins over public networks',
                  icon: Wifi,
                },
              ].map((item) => (
                <div key={item.label} className="p-4.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : item.status === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2.5">
                    <span className="text-2xl font-black text-slate-100">{item.percentage}%</span>
                    <span className="text-[11px] text-slate-400 font-mono">adoption</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.percentage >= 70
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : item.percentage >= 50
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-rose-500 to-pink-500'
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Assessment Performance & Visual Analytics */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                  Assessment Performance & Telemetry
                </h2>
                <p className="text-xs text-slate-400">
                  Ten interactive charts displaying behavioural frequencies, score distributions, and cohort contrasts
                </p>
              </div>

              {/* Score Methodology Drawer / Pill */}
              <div className="text-[11px] sm:text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 font-mono max-w-full overflow-x-auto whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  0–39 Needs Imp • 40–59 Basic • 60–79 Good • 80–100 Strong
                </span>
              </div>
            </div>

            <DashboardCharts charts={statsData.charts} />
          </section>

          {/* SECTION 4: Priority Improvement Areas (Security Improvement Recommendations) */}
          <section className="intel-card p-4 sm:p-8 border-t-2 border-t-indigo-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-100">
                    Security Improvement Recommendations
                  </h2>
                  <p className="text-xs text-slate-400">
                    Automated governance directives derived dynamically from current assessment indicators
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
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
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          item.priority === 'High'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        Priority: {item.priority}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-indigo-400 bg-slate-800/80 border border-slate-700 px-2 py-0.5 rounded">
                        {item.indicator}
                      </span>
                    </div>
                    <div className="font-bold text-slate-100 text-sm mb-2">
                      {item.issue}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Recommended Action:</strong> {item.action}
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
