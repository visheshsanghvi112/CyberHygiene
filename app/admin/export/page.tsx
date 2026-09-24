'use client';

import { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Filter,
  Database,
} from 'lucide-react';

export default function AdminExportPage() {
  const [filter, setFilter] = useState<'all' | 'real' | 'demo'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>CIA v1.0 • Data Export & Interoperability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Data Export Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Download assessment records, analytics summaries, and compliance audit datasets in standard RFC-4180 CSV format.
          </p>
        </div>

        {/* Filter Selector */}
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
              {mode === 'real' && 'Real Data Only'}
              {mode === 'demo' && 'Demo Dataset'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Raw Anonymized Responses */}
        <div className="academic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Raw Assessment Records (CSV)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Downloads complete assessment entries line-by-line, including all question responses, calculated Cyber Hygiene Scores (0–100), categorical risk classifications, and anonymized audit IDs.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong>Format:</strong> RFC 4180 CSV • Compatible with Microsoft Excel, Google Sheets, SPSS, R, and Python pandas.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <a
              href={`/api/admin/export?type=responses&filter=${filter}`}
              download
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Assessment Records ({filter.toUpperCase()})</span>
            </a>
          </div>
        </div>

        {/* Card 2: Summary Statistics Report */}
        <div className="academic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Aggregated Analytics Summary (CSV)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Downloads pre-computed statistical tables including descriptive parameters (Mean, Median, SD, Min, Max), Student vs. Faculty comparative metrics, practice rankings, and Welch&apos;s t-test findings.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong>Format:</strong> Structured Multi-Section CSV Report ready for direct academic citation and project inclusion.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <a
              href={`/api/admin/export?type=summary&filter=${filter}`}
              download
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Analytics Summary ({filter.toUpperCase()})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Assessment Data Schema & Dictionary */}
      <div className="mt-12 academic-card">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Assessment Data Schema & Variable Dictionary
          </h2>
          <p className="text-xs text-slate-500">
            Field specifications, data types, and scoring rubrics utilized in the assessment engine
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Field Variable</th>
                <th className="py-2.5 px-3">Module Dimension</th>
                <th className="py-2.5 px-3">Data Type</th>
                <th className="py-2.5 px-3">Scored Range</th>
                <th className="py-2.5 px-3">Permitted Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {[
                {
                  var: 'respondentType',
                  dim: 'Step 1 (Profile)',
                  type: 'Categorical',
                  score: 'N/A',
                  vals: 'Student, Faculty/Staff',
                },
                {
                  var: 'passwordPractice',
                  dim: 'Step 2 (Passwords)',
                  type: 'Ordinal (Likert)',
                  score: '1 – 5 pts',
                  vals: 'Always (5), Often (4), Sometimes (3), Rarely (2), Never (1)',
                },
                {
                  var: 'passwordManager',
                  dim: 'Step 2 (Passwords)',
                  type: 'Categorical',
                  score: '1 – 5 pts',
                  vals: 'Yes (5), No (2), Not sure (1)',
                },
                {
                  var: 'mfaUsage',
                  dim: 'Step 3 (Authentication)',
                  type: 'Categorical',
                  score: '0 – 5 pts',
                  vals: 'Most accounts (5), Some accounts (3), No (1), Unaware (0)',
                },
                {
                  var: 'softwareUpdates',
                  dim: 'Step 4 (Device Security)',
                  type: 'Ordinal (Likert)',
                  score: '1 – 5 pts',
                  vals: 'Always (5), Often (4), Sometimes (3), Rarely (2), Never (1)',
                },
                {
                  var: 'deviceLock',
                  dim: 'Step 4 (Device Security)',
                  type: 'Dichotomous',
                  score: '1 or 5 pts',
                  vals: 'Yes (5), No (1)',
                },
                {
                  var: 'linkVerification',
                  dim: 'Step 5 (Threat Awareness)',
                  type: 'Ordinal (Likert)',
                  score: '1 – 5 pts',
                  vals: 'Always (5), Often (4), Sometimes (3), Rarely (2), Never (1)',
                },
                {
                  var: 'backupFrequency',
                  dim: 'Step 6 (Data Safety)',
                  type: 'Categorical',
                  score: '1 – 5 pts',
                  vals: 'Yes regularly (5), Occasionally (3), Rarely (2), Never (1)',
                },
                {
                  var: 'cyberTraining',
                  dim: 'Step 7 (Awareness & Training)',
                  type: 'Categorical',
                  score: '2 or 5 pts',
                  vals: 'Yes (5), No (2), Not sure (2)',
                },
                {
                  var: 'cyberHygieneScore',
                  dim: 'Computed Index',
                  type: 'Continuous',
                  score: '0 – 100',
                  vals: 'Normalized total across 15 scored practices',
                },
              ].map((row) => (
                <tr key={row.var} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono font-semibold text-indigo-700">{row.var}</td>
                  <td className="py-2 px-3">{row.dim}</td>
                  <td className="py-2 px-3 text-slate-500">{row.type}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">{row.score}</td>
                  <td className="py-2 px-3 text-slate-600">{row.vals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
