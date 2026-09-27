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
      <div className="border-b border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            System Settings & Data Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Database provenance control, authentication configuration, and dataset life-cycle operations.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-900/60 font-medium text-xs transition-colors shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {actionMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {actionError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      <div className="space-y-6 sm:space-y-8">
        {/* Module 1: Dataset Provenance & Management */}
        <div className="intel-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-slate-100 text-base">Dataset Provenance & Records Status</h2>
            </div>
            <button
              onClick={fetchStats}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total in Database</div>
              <div className="text-3xl font-black text-slate-100 mt-1">
                {loading ? '...' : report?.totalCount}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">All persistent rows</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs text-amber-400 font-mono uppercase tracking-wider font-semibold">Synthetic Demo Records</div>
              <div className="text-3xl font-black text-amber-300 mt-1">
                {loading ? '...' : report?.demoCount}
              </div>
              <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">isDemo = true (Isolated)</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-xs text-emerald-400 font-mono uppercase tracking-wider font-semibold">Live Submissions</div>
              <div className="text-3xl font-black text-emerald-300 mt-1">
                {loading ? '...' : report?.realCount}
              </div>
              <div className="text-[11px] text-emerald-400/80 font-mono mt-0.5">isDemo = false (Field Data)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-slate-100 text-xs sm:text-sm">
                Purge Demonstration Records
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                Permanently wipes all synthetic records (`isDemo: true`) prior to collecting live assessment submissions. Real student and faculty assessments will not be deleted.
              </p>
            </div>

            <button
              onClick={handleClearDemoData}
              disabled={purging || (report?.demoCount === 0)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-900/30 transition-all shrink-0 disabled:opacity-40 text-center"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{purging ? 'Purging...' : 'Purge Demo Records'}</span>
            </button>
          </div>
        </div>

        {/* Module 2: System Architecture & Tech Stack */}
        <div className="intel-card p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-3">
            <Server className="w-5 h-5 text-indigo-400" />
            <h2 className="font-bold text-slate-100 text-base">Software Infrastructure & Security</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400">Database Engine</div>
              <div className="font-semibold text-slate-200 mt-0.5 font-mono">SQLite (File-based: dev.db)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400">Object-Relational Mapping</div>
              <div className="font-semibold text-slate-200 mt-0.5 font-mono">Prisma ORM 6.x</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400">Authentication Protocol</div>
              <div className="font-semibold text-slate-200 mt-0.5 font-mono">Jose JWT in HTTP-Only Cookies</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400">Input Validation Engine</div>
              <div className="font-semibold text-slate-200 mt-0.5 font-mono">Zod Schema Validation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
