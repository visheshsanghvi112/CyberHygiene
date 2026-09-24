'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings,
  Database,
  Trash2,
  RefreshCw,
  Server,
  LogOut,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { FullAnalysisReport } from '@/lib/types';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<FullAnalysisReport | null>(null);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [purging, setPurging] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setActionError('');

    try {
      const res = await fetch('/api/admin/stats?filter=all');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch settings state');
      }
      setReport(data.report);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Error loading settings');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleClearDemoData = async () => {
    if (
      !confirm(
        'Delete all synthetic demo records?\n\nThis permanently removes all synthetic demo responses. This does not delete genuine responses.'
      )
    ) {
      return;
    }

    setPurging(true);
    setActionMessage('');
    setActionError('');

    try {
      const res = await fetch('/api/admin/responses?action=clear_demo', {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to purge demo data');
      }
      setActionMessage(data.message);
      fetchStats();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to clear demo data');
    } finally {
      setPurging(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            System Settings & Data Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Database provenance control, authentication configuration, and dataset life-cycle operations.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {actionMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {actionError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Module 1: Dataset Provenance & Management */}
        <div className="academic-card p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">Dataset Provenance & Records Status</h2>
            </div>
            <button
              onClick={fetchStats}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Total Assessments in DB</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {loading ? '...' : report?.totalCount}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="text-xs text-amber-800 font-medium">Synthetic Demo Records</div>
              <div className="text-2xl font-bold text-amber-950 mt-1">
                {loading ? '...' : report?.demoCount}
              </div>
              <div className="text-[10px] text-amber-700 mt-0.5">isDemo = true</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="text-xs text-emerald-800 font-medium">Live Assessment Records</div>
              <div className="text-2xl font-bold text-emerald-950 mt-1">
                {loading ? '...' : report?.realCount}
              </div>
              <div className="text-[10px] text-emerald-700 mt-0.5">isDemo = false</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                Purge Demonstration Records
              </div>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                Permanently wipes all synthetic records (`isDemo: true`) prior to collecting live assessment submissions. Real student and faculty assessments will not be deleted.
              </p>
            </div>

            <button
              onClick={handleClearDemoData}
              disabled={purging || (report?.demoCount === 0)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-2xs transition-colors shrink-0 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{purging ? 'Purging...' : 'Purge Demo Records'}</span>
            </button>
          </div>
        </div>

        {/* Module 2: System Architecture & Tech Stack */}
        <div className="academic-card p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Server className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-base">Software Infrastructure & Security</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500">Database Engine</div>
              <div className="font-semibold text-slate-800 mt-0.5">SQLite (File-based: dev.db)</div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500">Object-Relational Mapping</div>
              <div className="font-semibold text-slate-800 mt-0.5">Prisma ORM 6.x</div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500">Authentication Protocol</div>
              <div className="font-semibold text-slate-800 mt-0.5">Jose JWT in HTTP-Only Cookies</div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500">Input Validation Engine</div>
              <div className="font-semibold text-slate-800 mt-0.5">Zod Schema Validation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
