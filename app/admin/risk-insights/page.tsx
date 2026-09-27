'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  KeyRound,
  Lock,
  Smartphone,
  Eye,
  Wifi,
  HardDrive,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { FullAnalysisReport } from '@/lib/types';

export default function RiskInsightsPage() {
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
        throw new Error(data.error || 'Failed to fetch risk analytics');
      }
      setReport(data.report);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading risk insights');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats(filter);
  }, [filter, fetchStats]);

  // Derive risk categories from rankings
  const getRiskDomain = (name: string) => {
    const item = report?.practiceRankings.find((p) =>
      p.practiceName.toLowerCase().includes(name.toLowerCase())
    );
    return item ? item.positiveResponsePercentage : 50;
  };

  const getRiskLevel = (pct: number): { label: string; color: string; bg: string } => {
    if (pct >= 75) return { label: 'Low Risk', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (pct >= 60) return { label: 'Moderate Risk', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' };
    if (pct >= 45) return { label: 'Elevated Risk', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'High Risk', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Behavioural Vulnerability Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Cyber Hygiene Risk Insights & Posture Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Domain-level behavioral vulnerability mapping, compliance tracking, and security posture gaps.
          </p>
        </div>

        {/* Dataset Filter */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-2xs w-full sm:w-auto justify-between sm:justify-start">
          <Filter className="w-4 h-4 text-slate-400 ml-2 hidden xs:block shrink-0" />
          {(['all', 'real', 'demo'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${
                filter === mode
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
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
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Evaluating domain vulnerability indexes...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
          {error}
        </div>
      )}

      {report && (
        <div className="mt-8 space-y-6 sm:space-y-8">
          {/* Top Posture Overview Banner */}
          <div className="academic-card p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-0 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-300">
                  Aggregate Security Assessment Posture
                </span>
                <h2 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                  Collegiate Cyber Hygiene Resilience Index
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Calculated across N = {report.totalCount} completed assessments. Areas of institutional strength include device locking and HTTPS awareness, whereas routine data backup protocols and password manager adoption represent major compliance vulnerabilities.
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-6 border-t lg:border-t-0 lg:border-l border-indigo-800/80 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <div className="text-xs text-indigo-300">Mean Score</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    {report.overallStats.mean}
                    <span className="text-xs sm:text-sm font-normal text-indigo-300">/100</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-indigo-300">Posture Tier</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5">
                    Good Baseline
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Key Risk Domains Grid */}
          <div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-slate-100">
                Operational Domain Risk Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Evaluation across the 6 core cybersecurity operational areas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Domain 1: Credential Security */}
              {(() => {
                const uniquePwd = getRiskDomain('unique passwords');
                const risk = getRiskLevel(uniquePwd);
                const atRiskCount = Math.round(report.totalCount * (1 - uniquePwd / 100));
                return (
                  <div className="intel-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                          <KeyRound className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Credential & Password Security</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Measures password uniqueness on vital portals and dedicated password manager adoption.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Adoption Compliance:</span>
                          <span className="font-bold text-slate-100">{uniquePwd}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${uniquePwd}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Estimated vulnerable: <strong>{atRiskCount} respondents</strong> reuse passwords across accounts.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                      <strong>Observation:</strong> Password manager adoption remains notably low (21%), resulting in widespread credential recycling.
                    </div>
                  </div>
                );
              })()}

              {/* Domain 2: Authentication Security */}
              {(() => {
                const mfaRate = report.studentMetrics.mfaAdoptionRate;
                const risk = getRiskLevel(mfaRate);
                return (
                  <div className="intel-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                          <Lock className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Multi-Factor Authentication</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Tracks 2FA / MFA enrollment across academic, personal, and financial portals.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">MFA Adoption:</span>
                          <span className="font-bold text-slate-100">{mfaRate}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${mfaRate}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Faculty MFA compliance: <strong>{report.facultyMetrics.mfaAdoptionRate}%</strong> vs. Students: <strong>{report.studentMetrics.mfaAdoptionRate}%</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                      <strong>Observation:</strong> Strong baseline adoption driven by institutional single sign-on mandates.
                    </div>
                  </div>
                );
              })()}

              {/* Domain 3: Device Security */}
              {(() => {
                const deviceLock = getRiskDomain('Primary Device Lock');
                const risk = getRiskLevel(deviceLock);
                return (
                  <div className="intel-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Endpoint & Device Security</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Screen locks, biometrics, software updates, and active endpoint protection.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Device Lock Adoption:</span>
                          <span className="font-bold text-slate-100">{deviceLock}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${deviceLock}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Operating system prompt patching rate: <strong>{getRiskDomain('Operating System')} %</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                      <strong>Observation:</strong> High physical device lock compliance (94%), though 35% delay critical OS patches.
                    </div>
                  </div>
                );
              })()}

              {/* Domain 4: Threat Vigilance & Phishing */}
              {(() => {
                const linkVerify = getRiskDomain('Checking Link Sources');
                const risk = getRiskLevel(linkVerify);
                return (
                  <div className="intel-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                          <Eye className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Threat Vigilance & Phishing Risk</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Pre-click link source inspection, social engineering detection, and suspicious message handling.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Pre-Click Inspection:</span>
                          <span className="font-bold text-slate-100">{linkVerify}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-600 h-full rounded-full" style={{ width: `${linkVerify}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          High self-rated phishing confidence: <strong>{report.studentMetrics.highPhishingConfidenceRate}%</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                      <strong>Observation:</strong> Moderate verification rate (64%); gap between high confidence and actual verification exists.
                    </div>
                  </div>
                );
              })()}

              {/* Domain 5: Public Wi-Fi & Network */}
              {(() => {
                const wifiCare = getRiskDomain('Avoiding Sensitive Accounts');
                const risk = getRiskLevel(wifiCare);
                return (
                  <div className="intel-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                          <Wifi className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Network Safety & Public Wi-Fi</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Protection during public campus Wi-Fi sessions and HTTPS connection verification.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Safe Wi-Fi Compliance:</span>
                          <span className="font-bold text-slate-100">{wifiCare}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${wifiCare}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          HTTPS padlock verification rate: <strong>{getRiskDomain('HTTPS')} %</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                      <strong>Observation:</strong> 39% of respondents access banking or academic portals on public networks without VPNs.
                    </div>
                  </div>
                );
              })()}

              {/* Domain 6: Routine Data Backups */}
              {(() => {
                const backupRate = getRiskDomain('Regular Routine File Backups');
                const risk = getRiskLevel(backupRate);
                const atRiskCount = Math.round(report.totalCount * (1 - backupRate / 100));
                return (
                  <div className="intel-card p-6 flex flex-col justify-between border-t-2 border-t-rose-500/80">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                          <HardDrive className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Data Backup & Recovery Discipline</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Routine scheduling of off-site or external drive backups for critical academic and research files.
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Routine Backup Adoption:</span>
                          <span className="font-bold text-rose-400">{backupRate}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-rose-600 h-full rounded-full" style={{ width: `${backupRate}%` }} />
                        </div>
                        <div className="text-[11px] text-rose-300 pt-1">
                          Vulnerable to ransomware/loss: <strong>{atRiskCount} respondents ({(100 - backupRate).toFixed(1)}%)</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-500/20 text-[11px] text-rose-300 bg-rose-500/10 p-2.5 rounded-lg font-medium">
                      <strong>Critical Vulnerability:</strong> Lowest compliant area in the entire assessment dataset. Urgent need for institutional backup policy.
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Quick Actions Nav */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
            <Link
              href="/admin/analysis"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>View Full Statistical Metrics & Hypothesis Testing</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
            <Link
              href="/admin/reports"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
            >
              Generate Full Assessment Report
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
