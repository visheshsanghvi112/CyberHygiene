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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Basic':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Response Management Module</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Assessment Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, filter, and inspect individual anonymous questionnaires.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
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
        <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mt-6 academic-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID, Area, Age..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-600"
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
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
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
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
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
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
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
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
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
              className="w-full py-2 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 font-medium"
            >
              <option value="all">All Data Sources</option>
              <option value="real">Real Records Only</option>
              <option value="demo">Demo Dataset</option>
            </select>
          </div>
        </div>
      </div>

      {/* Responses Table */}
      <div className="mt-6 academic-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Assessment ID</th>
                <th className="py-3 px-3">Cohort</th>
                <th className="py-3 px-3">Academic Area</th>
                <th className="py-3 px-3">Age Group</th>
                <th
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
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
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
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
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    Loading records from database...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500">
                    No assessment records match the active criteria.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Assessment ID */}
                    <td className="py-3 px-3 font-mono text-[11px] text-indigo-700 font-medium">
                      {r.id.substring(0, 10)}...
                    </td>

                    {/* Respondent Type */}
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {r.respondentType}
                    </td>

                    {/* Area */}
                    <td className="py-3 px-3 text-slate-600 max-w-[130px] truncate" title={r.academicArea}>
                      {r.academicArea}
                    </td>

                    {/* Age Group */}
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {r.ageGroup}
                    </td>

                    {/* Cyber Hygiene Score */}
                    <td className="py-3 px-3">
                      <span className="font-extrabold text-slate-900 text-sm">
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
                    <td className="py-3 px-3 text-slate-600">
                      {r.mfaUsage.startsWith('Yes') ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Enabled</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 text-[11px]">
                          <AlertCircle className="w-3 h-3 text-rose-500" />
                          <span>Disabled</span>
                        </span>
                      )}
                    </td>

                    {/* Backup */}
                    <td className="py-3 px-3 text-slate-600 text-[11px]">
                      {r.backupFrequency}
                    </td>

                    {/* Training */}
                    <td className="py-3 px-3 text-slate-600 text-[11px]">
                      {r.cyberTraining === 'Yes' ? (
                        <span className="text-emerald-700 font-medium">Completed</span>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>

                    {/* Assessment Date */}
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedRecord(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium transition-colors"
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
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing Page <strong>{pagination.page}</strong> of{' '}
            <strong>{pagination.totalPages || 1}</strong> ({pagination.totalCount} total records)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Assessment Audit Inspection
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Assessment ID: <span className="font-mono text-sm">{selectedRecord.id}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-slate-500">Cyber Hygiene Score</div>
                <div className="text-2xl font-black text-slate-900">
                  {selectedRecord.cyberHygieneScore}{' '}
                  <span className="text-xs font-normal text-slate-500">/ 100</span>
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
            <div className="space-y-4 text-xs">
              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 1: Profile & Demographics</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Role: <strong className="text-slate-800">{selectedRecord.respondentType}</strong></div>
                  <div>Age Group: <strong className="text-slate-800">{selectedRecord.ageGroup}</strong></div>
                  <div>Academic Discipline: <strong className="text-slate-800">{selectedRecord.academicArea}</strong></div>
                  <div>Gender: <strong className="text-slate-800">{selectedRecord.gender || 'Not specified'}</strong></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 2: Password Security</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>Password Uniqueness: <strong className="text-slate-800">{selectedRecord.passwordPractice}</strong></div>
                  <div>Change on Compromise: <strong className="text-slate-800">{selectedRecord.passwordChangeBehavior}</strong></div>
                  <div>Password Manager: <strong className="text-slate-800">{selectedRecord.passwordManager}</strong></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 3: Multi-Factor Authentication</h4>
                <div className="text-slate-600">
                  MFA Adoption Level: <strong className="text-slate-800">{selectedRecord.mfaUsage}</strong>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 4: Device & OS Security</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>Software / OS Updates: <strong className="text-slate-800">{selectedRecord.softwareUpdates}</strong></div>
                  <div>Primary Device Lock: <strong className="text-slate-800">{selectedRecord.deviceLock}</strong></div>
                  <div>Antivirus/Security Suite: <strong className="text-slate-800">{selectedRecord.antivirusUsage}</strong></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 5: Phishing & Threat Awareness</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>Link Verification: <strong className="text-slate-800">{selectedRecord.linkVerification}</strong></div>
                  <div>Encountered Suspicious Messages: <strong className="text-slate-800">{selectedRecord.suspiciousMessageExperience}</strong></div>
                  <div>Incident Reaction: <strong className="text-slate-800">{selectedRecord.suspiciousMessageAction}</strong></div>
                  <div>Phishing Detection Confidence: <strong className="text-slate-800">{selectedRecord.phishingConfidence}</strong></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 6: Network & Data Safety</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>Public Wi-Fi Frequency: <strong className="text-slate-800">{selectedRecord.publicWifiUsage}</strong></div>
                  <div>Avoids Sensitive Logins on Public Wi-Fi: <strong className="text-slate-800">{selectedRecord.publicWifiSensitiveAccounts}</strong></div>
                  <div>Routine Backup Frequency: <strong className="text-slate-800">{selectedRecord.backupFrequency}</strong></div>
                  <div>HTTPS Security Check: <strong className="text-slate-800">{selectedRecord.httpsVerification}</strong></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <h4 className="font-bold text-slate-900 mb-2">Step 7: Awareness & Training</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>Institutional Training Completed: <strong className="text-slate-800">{selectedRecord.cyberTraining}</strong></div>
                  <div>Self-Rated Hygiene Awareness: <strong className="text-slate-800">{selectedRecord.overallAwareness}</strong></div>
                  <div>Topic of Interest: <strong className="text-slate-800">{selectedRecord.learningInterest || 'None'}</strong></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
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
