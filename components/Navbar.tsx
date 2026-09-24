'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  BarChart3,
  FileSpreadsheet,
  ClipboardCheck,
  BookOpen,
  AlertTriangle,
  FileText,
  Settings,
  Info,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const isSurvey = pathname.startsWith('/survey');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Product Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight tracking-tight flex items-center gap-2">
                <span>CyberHygiene Intel</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  CIA v1.0
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Assessment & Behavioural Analytics Platform
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-slate-100 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/survey"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isSurvey
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </Link>

            {/* Admin Divider */}
            <div className="h-4 w-px bg-slate-200 mx-1 hidden md:block" />

            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/dashboard'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              href="/admin/responses"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/responses'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Records</span>
            </Link>

            <Link
              href="/admin/analysis"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/analysis'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Analytics</span>
            </Link>

            <Link
              href="/admin/risk-insights"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/risk-insights'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Risk Insights</span>
            </Link>

            <Link
              href="/admin/reports"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/reports'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reports</span>
            </Link>

            <Link
              href="/admin/export"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/export'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Link>

            <Link
              href="/admin/settings"
              title="System Data & Settings"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/admin/settings'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/about"
              title="About Project"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/about'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
