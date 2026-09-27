'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  X,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Database,
} from 'lucide-react';

interface AssessmentRecord {
  id: string;
  isDemo: boolean;
  respondentType: string;
  ageGroup: string;
  academicArea: string;
  gender?: string | null;
  passwordPractice: string;
  passwordChangeBehavior: string;
  passwordManager: string;
  mfaUsage: string;
  softwareUpdates: string;
  deviceLock: string;
  antivirusUsage: string;
  linkVerification: string;
  suspiciousMessageExperience: string;
  suspiciousMessageAction: string;
  phishingConfidence: string;
  publicWifiUsage: string;
  publicWifiSensitiveAccounts: string;
  backupFrequency: string;
  httpsVerification: string;
  cyberTraining: string;
  overallAwareness: string;
  learningInterest?: string | null;
  cyberHygieneScore: number;
  scoreCategory: string;
  createdAt: string;
}

export default function AdminResponsesPage() {
  const router = useRouter();
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [respondentType, setRespondentType] = useState('');
  const [scoreCategory, setScoreCategory] = useState('');
  const [mfaFilter, setMfaFilter] = useState('');
  const [trainingFilter, setTrainingFilter] = useState('');
  const [filter, setFilter] = useState<'all' | 'real' | 'demo'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'cyberHygieneScore'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalCount: 0,
    totalPages: 1,
  });

  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(null);

  const fetchResponses = useCallback(async () => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams({
      page: page.toString(),
      limit: '15',
      search,
      respondentType,
      scoreCategory,
      mfa: mfaFilter,
      training: trainingFilter,
      filter,
      sortBy,
      sortOrder,
    });

    try {
      const res = await fetch(`/api/admin/responses?${params.toString()}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch assessment records');
      }
      setRecords(data.data);
      setPagination(data.pagination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading assessments');
    } finally {
      setLoading(false);
    }
  }, [page, search, respondentType, scoreCategory, mfaFilter, trainingFilter, filter, sortBy, sortOrder, router]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchResponses();
  };

  const getScoreBadge = (category: string) => {
    switch (category) {
      case 'Strong':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Good':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Basic':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Response Management Module</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Assessment Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and inspect individual anonymous questionnaires.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-900/60 text-slate-300 text-xs font-medium transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span>Data Management Hub</span>
          </Link>
          <Link
            href="/admin/export"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mt-6 intel-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID, Area, Age..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>

          {/* Cohort Filter */}
          <div>
            <select
              value={respondentType}
              onChange={(e) => {
                setRespondentType(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-700 bg-slate-900/90 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All Cohorts</option>
              <option value="Student">Students</option>
              <option value="Faculty/Staff">Faculty & Staff</option>
            </select>
          </div>

          {/* Score Category Filter */}
          <div>
            <select
              value={scoreCategory}
              onChange={(e) => {
                setScoreCategory(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-700 bg-slate-900/90 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All Scores</option>
              <option value="Strong">Strong (80–100)</option>
              <option value="Good">Good (60–79)</option>
              <option value="Basic">Basic (40–59)</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>
          </div>

          {/* MFA Filter */}
          <div>
            <select
              value={mfaFilter}
              onChange={(e) => {
                setMfaFilter(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-700 bg-slate-900/90 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All MFA Status</option>
              <option value="enabled">MFA Enabled</option>
              <option value="disabled">MFA Disabled/Rare</option>
            </select>
          </div>

          {/* Training Filter */}
          <div>
            <select
              value={trainingFilter}
              onChange={(e) => {
                setTrainingFilter(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-700 bg-slate-900/90 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All Training</option>
              <option value="yes">Training Completed</option>
              <option value="no">No Formal Training</option>
            </select>
          </div>

          {/* Data Source Filter */}
          <div>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as 'all' | 'real' | 'demo');
                setPage(1);
              }}
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-700 bg-slate-900/90 focus:outline-none focus:ring-1 focus:ring-indigo-600 font-medium"
            >
              <option value="all">All Data Sources</option>
              <option value="real">Real Records Only</option>
              <option value="demo">Demo Dataset</option>
            </select>
          </div>
        </div>
      </div>

      {/* Responses Data Display: Mobile Card View (md:hidden) and Desktop Table (hidden md:block) */}
      <div className="mt-6 intel-card p-0 overflow-hidden">
        {/* Mobile View Cards */}
        <div className="block md:hidden divide-y divide-slate-800/80">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Loading records from database...
            </div>
          ) : records.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No assessment records match the active criteria.
            </div>
          ) : (
            records.map((r) => (
              <div key={r.id} className="p-4 space-y-3 hover:bg-slate-900/40 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs text-indigo-400 font-semibold truncate">
                      #{r.id.substring(0, 8)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-extrabold text-slate-100 text-sm">
                      {r.cyberHygieneScore}
                      <span className="text-[10px] text-slate-400 font-normal">/100</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getScoreBadge(
                        r.scoreCategory
                      )}`}
                    >
                      {r.scoreCategory}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Cohort & Age:</span>
                    <span className="text-slate-200 font-medium">{r.respondentType} ({r.ageGroup})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Discipline:</span>
                    <span className="text-slate-200 font-medium truncate block" title={r.academicArea}>
                      {r.academicArea}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">MFA Status:</span>
                    <span className={r.mfaUsage.startsWith('Yes') ? 'text-emerald-400 font-medium' : 'text-rose-400'}>
                      {r.mfaUsage.startsWith('Yes') ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Backups:</span>
                    <span className="text-slate-300 truncate block">{r.backupFrequency}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Training: <strong className={r.cyberTraining === 'Yes' ? 'text-emerald-400' : 'text-slate-400'}>
                      {r.cyberTraining === 'Yes' ? 'Completed' : 'None'}
                    </strong>
                  </span>
                  <button
                    onClick={() => setSelectedRecord(r)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Assessment ID</th>
                <th className="py-3 px-3">Cohort</th>
                <th className="py-3 px-3">Academic Area</th>
                <th className="py-3 px-3">Age Group</th>
                <th
                  className="py-3 px-3 cursor-pointer hover:text-slate-100"
                  onClick={() => {
                    if (sortBy === 'cyberHygieneScore') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('cyberHygieneScore');
                      setSortOrder('desc');
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>Score (0–100)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Risk Category</th>
                <th className="py-3 px-3">MFA</th>
                <th className="py-3 px-3">Backup</th>
                <th className="py-3 px-3">Training</th>
                <th
                  className="py-3 px-3 cursor-pointer hover:text-slate-100"
                  onClick={() => {
                    if (sortBy === 'createdAt') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('createdAt');
                      setSortOrder('desc');
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>Assessment Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    Loading records from database...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    No assessment records match the active criteria.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/60/70 transition-colors">
                    {/* Assessment ID */}
                    <td className="py-3 px-3 font-mono text-[11px] text-indigo-400 font-medium">
                      {r.id.substring(0, 10)}...
                    </td>

                    {/* Respondent Type */}
                    <td className="py-3 px-3 font-medium text-slate-100">
                      {r.respondentType}
                    </td>

                    {/* Area */}
                    <td className="py-3 px-3 text-slate-400 max-w-[130px] truncate" title={r.academicArea}>
                      {r.academicArea}
                    </td>

                    {/* Age Group */}
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {r.ageGroup}
                    </td>

                    {/* Cyber Hygiene Score */}
                    <td className="py-3 px-3">
                      <span className="font-extrabold text-slate-100 text-sm">
                        {r.cyberHygieneScore}
                      </span>
                    </td>

                    {/* Risk Category */}
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getScoreBadge(
                          r.scoreCategory
                        )}`}
                      >
                        {r.scoreCategory}
                      </span>
                    </td>

                    {/* MFA */}
                    <td className="py-3 px-3 text-slate-400">
                      {r.mfaUsage.startsWith('Yes') ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Enabled</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 text-[11px]">
                          <AlertCircle className="w-3 h-3 text-rose-500" />
                          <span>Disabled</span>
                        </span>
                      )}
                    </td>

                    {/* Backup */}
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {r.backupFrequency}
                    </td>

                    {/* Training */}
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {r.cyberTraining === 'Yes' ? (
                        <span className="text-emerald-400 font-medium">Completed</span>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>

                    {/* Assessment Date */}
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedRecord(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            Showing Page <strong>{pagination.page}</strong> of{' '}
            <strong>{pagination.totalPages || 1}</strong> ({pagination.totalCount} total records)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page <= 1}
              className="px-3 py-1.5 rounded-lg border border-slate-800 disabled:opacity-40 hover:bg-slate-900/60 flex items-center gap-1 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="inline sm:hidden">Prev</span>
            </button>
            <span className="px-2 font-mono text-slate-400 text-xs sm:hidden">
              {pagination.page} / {pagination.totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-800 disabled:opacity-40 hover:bg-slate-900/60 flex items-center gap-1 text-slate-300"
            >
              <span className="inline sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="intel-card-elevated max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 shadow-2xl border border-slate-700/80">
            <div className="flex items-start justify-between border-b border-slate-800/80 pb-4 mb-4 sm:mb-6 gap-3">
              <div className="min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Assessment Audit Inspection
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                  ID: <span className="font-mono text-xs sm:text-sm text-indigo-400 font-normal break-all">{selectedRecord.id}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-800 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <div className="text-[11px] sm:text-xs text-slate-400">Cyber Hygiene Score</div>
                <div className="text-xl sm:text-2xl font-black text-slate-100">
                  {selectedRecord.cyberHygieneScore}{' '}
                  <span className="text-xs font-normal text-slate-400">/ 100</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadge(
                  selectedRecord.scoreCategory
                )}`}
              >
                {selectedRecord.scoreCategory}
              </span>
            </div>

            {/* Response Breakdown Sections */}
            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 1: Profile & Demographics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <div>Role: <strong className="text-slate-200">{selectedRecord.respondentType}</strong></div>
                  <div>Age Group: <strong className="text-slate-200">{selectedRecord.ageGroup}</strong></div>
                  <div>Academic Discipline: <strong className="text-slate-200">{selectedRecord.academicArea}</strong></div>
                  <div>Gender: <strong className="text-slate-200">{selectedRecord.gender || 'Not specified'}</strong></div>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 2: Password Security</h4>
                <div className="space-y-1.5 text-slate-400">
                  <div>Password Uniqueness: <strong className="text-slate-200">{selectedRecord.passwordPractice}</strong></div>
                  <div>Change on Compromise: <strong className="text-slate-200">{selectedRecord.passwordChangeBehavior}</strong></div>
                  <div>Password Manager: <strong className="text-slate-200">{selectedRecord.passwordManager}</strong></div>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 3: Multi-Factor Authentication</h4>
                <div className="text-slate-400">
                  MFA Adoption Level: <strong className="text-slate-200">{selectedRecord.mfaUsage}</strong>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 4: Device & OS Security</h4>
                <div className="space-y-1.5 text-slate-400">
                  <div>Software / OS Updates: <strong className="text-slate-200">{selectedRecord.softwareUpdates}</strong></div>
                  <div>Primary Device Lock: <strong className="text-slate-200">{selectedRecord.deviceLock}</strong></div>
                  <div>Antivirus/Security Suite: <strong className="text-slate-200">{selectedRecord.antivirusUsage}</strong></div>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 5: Phishing & Threat Awareness</h4>
                <div className="space-y-1.5 text-slate-400">
                  <div>Link Verification: <strong className="text-slate-200">{selectedRecord.linkVerification}</strong></div>
                  <div>Encountered Suspicious Messages: <strong className="text-slate-200">{selectedRecord.suspiciousMessageExperience}</strong></div>
                  <div>Incident Reaction: <strong className="text-slate-200">{selectedRecord.suspiciousMessageAction}</strong></div>
                  <div>Phishing Detection Confidence: <strong className="text-slate-200">{selectedRecord.phishingConfidence}</strong></div>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 6: Network & Data Safety</h4>
                <div className="space-y-1.5 text-slate-400">
                  <div>Public Wi-Fi Frequency: <strong className="text-slate-200">{selectedRecord.publicWifiUsage}</strong></div>
                  <div>Avoids Sensitive Logins on Public Wi-Fi: <strong className="text-slate-200">{selectedRecord.publicWifiSensitiveAccounts}</strong></div>
                  <div>Routine Backup Frequency: <strong className="text-slate-200">{selectedRecord.backupFrequency}</strong></div>
                  <div>HTTPS Security Check: <strong className="text-slate-200">{selectedRecord.httpsVerification}</strong></div>
                </div>
              </div>

              <div className="border border-slate-800/80 rounded-lg p-3">
                <h4 className="font-bold text-slate-100 mb-2">Step 7: Awareness & Training</h4>
                <div className="space-y-1.5 text-slate-400">
                  <div>Institutional Training Completed: <strong className="text-slate-200">{selectedRecord.cyberTraining}</strong></div>
                  <div>Self-Rated Hygiene Awareness: <strong className="text-slate-200">{selectedRecord.overallAwareness}</strong></div>
                  <div>Topic of Interest: <strong className="text-slate-200">{selectedRecord.learningInterest || 'None'}</strong></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors text-center"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
