import Link from 'next/link';
import {
  ClipboardCheck,
  BarChart3,
  Lock,
  AlertTriangle,
  ArrowRight,
  Cpu,
  FileSpreadsheet,
  Users2,
  Lightbulb,
  ExternalLink,
  Activity,
  CheckCircle2,
  Database,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Top ambient spotlight glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-48 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* System Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg shadow-indigo-950/30 backdrop-blur-md max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-200 shrink-0">CIA Platform v1.0</span>
          <span className="text-slate-500 hidden xs:inline">•</span>
          <span className="hidden xs:inline truncate">Cyber Hygiene Intelligence & Assessment System</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.15]">
          Cyber Hygiene <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
            Intelligence & Analytics
          </span> Platform
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          An enterprise-grade information system for assessing cybersecurity practices, identifying human-layer behavioral vulnerabilities, and delivering empirical security awareness intelligence across higher education stakeholders.
        </p>

        {/* Primary Call to Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <Link
            href="/survey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700/80 shadow-lg hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-md"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Admin Intelligence</span>
          </Link>

          <Link
            href="/admin/risk-insights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/70 text-slate-300 hover:text-white font-medium text-xs sm:text-sm border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-md"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Risk Matrix</span>
          </Link>
        </div>

        {/* Privacy & Zero-Credential Guarantee Pill */}
        <div className="mt-6 sm:mt-8 max-w-xl mx-auto p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2.5 shadow-sm backdrop-blur-md text-left sm:text-center">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-emerald-200">100% Anonymous Architecture:</strong> No passwords, contact details, student IDs, or network IPs are ever collected.
          </span>
        </div>
      </div>

      {/* Live System Pillars / Telemetry Strip */}
      <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
        <div className="intel-card p-3 sm:p-4 text-center">
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-mono">Scoring Standard</div>
          <div className="text-sm sm:text-lg font-bold text-slate-100 mt-1 flex items-center justify-center gap-1 sm:gap-1.5">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
            <span className="truncate">15-Factor Norm</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">0–100 Scale Benchmark</div>
        </div>

        <div className="intel-card p-3 sm:p-4 text-center">
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-mono">Survey Efficiency</div>
          <div className="text-sm sm:text-lg font-bold text-slate-100 mt-1 flex items-center justify-center gap-1 sm:gap-1.5">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
            <span>~3.5 Min Avg</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">7-Step Mobile Wizard</div>
        </div>

        <div className="intel-card p-3 sm:p-4 text-center">
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-mono">Statistical Engine</div>
          <div className="text-sm sm:text-lg font-bold text-slate-100 mt-1 flex items-center justify-center gap-1 sm:gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>Welch&apos;s t-Test</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">Automated Variance</div>
        </div>

        <div className="intel-card p-3 sm:p-4 text-center">
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-mono">Data Export</div>
          <div className="text-sm sm:text-lg font-bold text-slate-100 mt-1 flex items-center justify-center gap-1 sm:gap-1.5">
            <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span>RFC-4180 CSV</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">Raw & Summaries</div>
        </div>
      </div>

      {/* System Capabilities Matrix */}
      <div className="mt-14 sm:mt-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-indigo-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>PLATFORM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">Core System Capabilities</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            End-to-end software modules powering behavioral cybersecurity evaluation, statistical hypothesis testing, and automated governance directives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Module 1: Assessment Management */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-blue-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Assessment Management</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Responsive 7-step wizard evaluating 21 categorical indicators across password hygiene, multi-factor authentication, device locks, software patching, and phishing resilience.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
              <Link href="/survey" className="hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                <span>Launch Assessment Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 2: Cyber Hygiene Scoring Engine */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-indigo-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Cyber Hygiene Scoring Engine</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Algorithmic 15-factor normalization model computing scalar 0–100 cyber hygiene scores and assigning respondents to one of four standardized posture tiers.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>Deterministic 0–100 Benchmark</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Module 3: Risk & Behaviour Analytics */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-amber-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Risk & Behaviour Analytics</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Automated risk classification evaluating vulnerabilities across credential security, public Wi-Fi exposure, phishing vulnerability, and patch latency.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <Link href="/admin/risk-insights" className="hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                <span>Explore Risk Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 4: Cohort Comparison */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-emerald-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Cohort Comparison & t-Testing</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Granular cross-sectional comparison contrasting student habits against faculty practices, complete with descriptive metrics and Welch&apos;s t-test calculation.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <Link href="/admin/analysis" className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                <span>View Comparative Metrics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 5: Security Recommendations */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-purple-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Security Improvement Engine</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Dynamic, data-derived rule engine translating aggregate behavioral shortfalls into prioritised institutional governance and policy recommendations.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400">
              <span>Rule-Based Synthesis</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
          </div>

          {/* Module 6: Reports & Export */}
          <div className="intel-card p-5 sm:p-6 flex flex-col justify-between border-t-2 border-t-sky-500/80 group">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Formal Reports & CSV Export</h3>
              <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                Structured academic report preview generation alongside one-click RFC-4180 CSV dataset downloads for offline analysis in Excel, SPSS, or Python.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400">
              <Link href="/admin/reports" className="hover:text-sky-300 flex items-center gap-1.5 transition-colors">
                <span>Generate Assessment Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Attribution & Context Section */}
      <div className="mt-14 sm:mt-20 p-5 sm:p-8 rounded-2xl intel-card-elevated border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>B.Sc. Information Technology • Final Year Project</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            Topic: Cyber Hygiene Practices Among College Students and Faculty
          </h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
            Candidate: <strong className="text-slate-200">Dhruv Gupta</strong> • An information system and assessment analytics platform designed to empirically evaluate and enhance collegiate digital security posture.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Project Details</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/admin/login"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all text-center"
          >
            Admin Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
