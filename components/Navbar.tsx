'use client';

import { useState, useEffect } from 'react';
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
  Menu,
  X,
  LogIn,
  ChevronRight,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSurvey = pathname.startsWith('/survey');

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const adminNavItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      desc: 'Real-time telemetry & KPIs',
    },
    {
      href: '/admin/responses',
      label: 'Assessment Records',
      icon: BookOpen,
      desc: 'Search & inspect submissions',
    },
    {
      href: '/admin/analysis',
      label: 'Cohort Analytics',
      icon: BarChart3,
      desc: 'Welch’s t-test & variances',
    },
    {
      href: '/admin/risk-insights',
      label: 'Risk Insights',
      icon: AlertTriangle,
      desc: 'Behavioural risk matrix',
    },
    {
      href: '/admin/reports',
      label: 'Executive Reports',
      icon: FileText,
      desc: 'Printable posture audits',
    },
    {
      href: '/admin/export',
      label: 'Data Export',
      icon: FileSpreadsheet,
      desc: 'RFC-4180 CSV downloads',
    },
    {
      href: '/admin/settings',
      label: 'System Settings',
      icon: Settings,
      desc: 'Database & dataset controls',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/25">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Product Identity */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25 transition-all group-hover:scale-105 group-hover:shadow-indigo-500/40 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-100 text-xs sm:text-base leading-tight tracking-tight flex items-center gap-1.5 sm:gap-2">
                <span className="truncate">CyberHygiene Intel</span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CIA v1.0
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden md:block truncate">
                Assessment & Behavioural Analytics Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= lg: 1024px) */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              href="/survey"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSurvey
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/25 hover:text-white'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </Link>

            <div className="h-4 w-px bg-slate-800 mx-1.5" />

            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/dashboard'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/responses"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/responses'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Records</span>
            </Link>

            <Link
              href="/admin/analysis"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/analysis'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </Link>

            <Link
              href="/admin/risk-insights"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/risk-insights'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Risk Insights</span>
            </Link>

            <Link
              href="/admin/reports"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/reports'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Reports</span>
            </Link>

            <Link
              href="/admin/export"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/export'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export</span>
            </Link>

            <Link
              href="/admin/settings"
              title="System Data & Settings"
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/settings'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/about"
              title="About Project"
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                pathname === '/about'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Actions: Direct Assessment button + Hamburger Menu Button (< lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/survey"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition-transform"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Survey</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                mobileMenuOpen
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto pb-safe">
          <div className="max-w-md mx-auto px-4 py-5 space-y-6">
            {/* Quick Section: Primary Pages */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5 px-1">
                Main Experience
              </div>
              <div className="space-y-1.5">
                <Link
                  href="/"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    pathname === '/'
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Home</div>
                      <div className="text-[11px] text-slate-400">Platform overview & capabilities</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>

                <Link
                  href="/survey"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isSurvey
                      ? 'bg-gradient-to-r from-indigo-600/30 to-sky-600/30 border-indigo-500/50 text-white'
                      : 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Take Assessment</span>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      </div>
                      <div className="text-[11px] text-indigo-200/80">7-step anonymous security check</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400" />
                </Link>
              </div>
            </div>

            {/* Section: Intelligence & Administrative Portal */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5 px-1">
                Intelligence & Admin Modules
              </div>
              <div className="space-y-1.5">
                {adminNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/80 text-slate-400 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{item.label}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Section: Academic Project & Auth */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5 px-1">
                Project & Access
              </div>
              <div className="space-y-1.5">
                <Link
                  href="/about"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    pathname === '/about'
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">About Academic Project</div>
                      <div className="text-[11px] text-slate-500">Dhruv Gupta • B.Sc. IT Research</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </Link>

                <Link
                  href="/admin/login"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    pathname === '/admin/login'
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center">
                      <LogIn className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Admin Sign In</div>
                      <div className="text-[11px] text-slate-500">Access researcher gateway</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </Link>
              </div>
            </div>

            {/* Bottom info badge */}
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center text-[11px] text-slate-500">
              Cyber Hygiene Assessment Platform • B.Sc. IT Project
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

