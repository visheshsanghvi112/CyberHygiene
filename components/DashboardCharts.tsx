'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

interface ChartProps {
  charts: {
    respondentTypeDistribution: Array<{ name: string; value: number; fill: string }>;
    scoreDistribution: Array<{ category: string; count: number; fill: string }>;
    groupScoreComparison: Array<{ group: string; score: number; median: number }>;
    mfaAdoption: Array<{ name: string; count: number; fill: string }>;
    passwordPractice: Array<{ name: string; count: number }>;
    softwareUpdates: Array<{ name: string; count: number }>;
    phishingConfidence: Array<{ name: string; count: number }>;
    publicWifiUsage: Array<{ name: string; count: number }>;
    backupHabits: Array<{ name: string; count: number }>;
    cyberTraining: Array<{ name: string; count: number }>;
    comparativeIndicators: Array<{ indicator: string; Students: number; Faculty: number }>;
  };
}

export function DashboardCharts({ charts }: ChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-slate-500 text-sm">
        Initializing cybersecurity telemetry visualizations...
      </div>
    );
  }

  const customTooltip = {
    contentStyle: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(51, 65, 85, 0.8)',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 102, 241, 0.15)',
      color: '#f8fafc',
      fontSize: '12px',
      padding: '8px 12px',
    },
    cursor: { fill: 'rgba(99, 102, 241, 0.08)' },
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      {/* Row 1: Demographics & Overall Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {/* Chart 1: Respondent Type Distribution */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                1. Cohort Sample Distribution
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Proportion of Students vs. Faculty/Staff</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
              Demographics
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.respondentTypeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {charts.respondentTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(15, 23, 42, 0.8)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip {...customTooltip} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }}
                  formatter={(value, entry) => {
                    const payload = entry.payload as { value?: number } | undefined;
                    return `${value} (${payload?.value ?? 0})`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cyber Hygiene Score Distribution */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                2. Cyber Hygiene Score Distribution
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Categorical breakdown (0–100 scale)</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
              0–100 Scale
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="category" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                  {charts.scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-score-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Comparative Scores & Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {/* Chart 3: Students vs Faculty Score Comparison */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                3. Average Score: Students vs. Faculty
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Mean and median comparative benchmarks</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 shrink-0">
              Comparative
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.groupScoreComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="group" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                <Bar dataKey="score" name="Mean Score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="median" name="Median Score" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Indicators */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                Key Security Indicators: Student vs. Faculty (%)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Side-by-side adoption rate comparison</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              Adoption Rates
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.comparativeIndicators} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="indicator"
                  stroke="#475569"
                  tick={{ fill: '#94a3b8', fontSize: 9 }}
                  interval={0}
                  tickFormatter={(val) => (val.length > 12 ? `${val.substring(0, 10)}…` : val)}
                />
                <YAxis domain={[0, 100]} unit="%" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} formatter={(value) => `${value}%`} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                <Bar dataKey="Students" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Faculty" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Authentication & Device Practices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {/* Chart 4: Multi-Factor Authentication */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                4. Multi-Factor Authentication (MFA) Adoption
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Degree of 2FA enforcement across personal accounts</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              Identity
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.mfaAdoption} layout="vertical" margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#475569"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  width={110}
                  tickFormatter={(val) => (val.length > 15 ? `${val.substring(0, 14)}…` : val)}
                />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]}>
                  {charts.mfaAdoption.map((entry, index) => (
                    <Cell key={`cell-mfa-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Password Practice Distribution */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                5. Password Uniqueness Across Important Accounts
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Frequency of using unique credentials</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
              Credentials
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.passwordPractice} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Device Updates & Phishing Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {/* Chart 6: Software Updates */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                6. Software & OS Update Installation Frequency
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Timeliness of security patch adoption</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 shrink-0">
              Patching
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.softwareUpdates} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 7: Phishing Confidence */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                7. Confidence in Identifying Phishing Attempts
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Self-assessed social engineering resilience</p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              Social Eng
            </span>
          </div>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.phishingConfidence} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 5: Public Wi-Fi, Backups, and Training */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
        {/* Chart 8: Public Wi-Fi */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4">
            <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
              8. Public Wi-Fi Frequency
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">Exposure to unencrypted networks</p>
          </div>
          <div className="h-56 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.publicWifiUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 9: File Backup Habits */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="border-b border-slate-800/80 pb-3 mb-4">
            <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
              9. Routine File Backup Frequency
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">Ransomware & data-loss resilience</p>
          </div>
          <div className="h-56 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.backupHabits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 10: Cyber Training Participation */}
        <div className="intel-card p-4 sm:p-6 min-w-0 overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="border-b border-slate-800/80 pb-3 mb-4">
            <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
              10. Formal Security Training
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">Institutional awareness coverage</p>
          </div>
          <div className="h-56 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.cyberTraining} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis allowDecimals={false} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...customTooltip} />
                <Bar dataKey="count" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
