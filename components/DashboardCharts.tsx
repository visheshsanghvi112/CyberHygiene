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
      <div className="py-20 text-center text-slate-400 text-sm">
        Loading interactive visualizations...
      </div>
    );
  }

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Row 1: Demographics & Overall Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Respondent Type Distribution */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              1. Respondent Type Distribution
            </h3>
            <p className="text-xs text-slate-500">Proportion of Students vs. Faculty/Staff in sample</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.respondentTypeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name || ''} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  }
                >
                  {charts.respondentTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cyber Hygiene Score Distribution */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              2. Cyber Hygiene Score Distribution
            </h3>
            <p className="text-xs text-slate-500">Categorical breakdown (0–100 scale)</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.scoreDistribution}>
                <XAxis dataKey="category" tick={{ fontSize: 10 }} interval={0} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Students vs Faculty Score Comparison */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              3. Average Cyber Hygiene Score: Students vs. Faculty
            </h3>
            <p className="text-xs text-slate-500">Mean and median comparative benchmarks</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.groupScoreComparison}>
                <XAxis dataKey="group" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Mean Score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="median" name="Median Score" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Indicators */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              Key Security Indicators: Student vs. Faculty Adoption (%)
            </h3>
            <p className="text-xs text-slate-500">Side-by-side adoption rate comparison</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.comparativeIndicators}>
                <XAxis dataKey="indicator" tick={{ fontSize: 9 }} interval={0} />
                <YAxis domain={[0, 100]} unit="%" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Faculty" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Authentication & Device Practices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 4: Multi-Factor Authentication */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              4. Multi-Factor Authentication (MFA) Adoption
            </h3>
            <p className="text-xs text-slate-500">Degree of 2FA enforcement across personal accounts</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.mfaAdoption} layout="vertical">
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={140} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {charts.mfaAdoption.map((entry, index) => (
                    <Cell key={`cell-mfa-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Password Practice Distribution */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              5. Password Uniqueness Across Important Accounts
            </h3>
            <p className="text-xs text-slate-500">Frequency of using unique credentials</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.passwordPractice}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Device Updates & Phishing Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 6: Software Updates */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              6. Software & OS Update Installation Frequency
            </h3>
            <p className="text-xs text-slate-500">Timeliness of security patch adoption</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.softwareUpdates}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 7: Phishing Confidence */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              7. Confidence in Identifying Phishing Attempts
            </h3>
            <p className="text-xs text-slate-500">Self-assessed social engineering resilience</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.phishingConfidence}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 5: Public Wi-Fi, Backups, and Training */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart 8: Public Wi-Fi */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              8. Public Wi-Fi Usage Frequency
            </h3>
            <p className="text-xs text-slate-500">Open network exposure</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.publicWifiUsage}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 9: File Backup Habits */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              9. Routine File Backup Habits
            </h3>
            <p className="text-xs text-slate-500">Data redundancy precautions</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.backupHabits}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 10: Training Awareness */}
        <div className="academic-card">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              10. Formal Cyber Training (Past 12 Mo)
            </h3>
            <p className="text-xs text-slate-500">Institutional workshop exposure</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.cyberTraining}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name || ''} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  }
                >
                  {charts.cyberTraining.map((_, index) => (
                    <Cell key={`cell-training-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
