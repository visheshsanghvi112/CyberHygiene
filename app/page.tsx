import Link from 'next/link';
import {
  ShieldCheck,
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
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Cyber Hygiene Intelligence & Assessment System (CIA Platform)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Cyber Hygiene <br className="hidden sm:inline" />
          <span className="text-indigo-600">Assessment & Analytics</span> Platform
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An enterprise information system for assessing cybersecurity practices, identifying behavioural vulnerabilities, and generating actionable security awareness insights across higher education stakeholders.
        </p>

        {/* Primary Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/survey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-2xs transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Link>

          <Link
            href="/admin/risk-insights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-2xs transition-all hover:border-slate-400"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>View Risk Insights</span>
          </Link>
        </div>

        {/* Privacy & Zero-Credential Guarantee */}
        <div className="mt-8 max-w-xl mx-auto p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-center gap-2.5">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>100% Anonymous Architecture:</strong> No passwords, contact details, or personal identity records collected.
          </span>
        </div>
      </div>

      {/* System Capabilities Matrix */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Core System Capabilities</h2>
          <p className="text-slate-500 text-sm mt-1">
            End-to-end software modules powering behavioral cyber hygiene evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Assessment Management */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Assessment Management</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Responsive 7-step wizard evaluating 21 indicators across passwords, authentication, device locks, software patching, and threat resilience.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
              <Link href="/survey" className="hover:underline flex items-center gap-1">
                <span>Launch Assessment Module</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Module 2: Cyber Hygiene Scoring Engine */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cyber Hygiene Scoring Engine</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Algorithmic 15-factor normalization model computing normalized 0–100 cyber hygiene scores and categorization across four distinct posture tiers.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Normalized 0–100 Benchmark</span>
            </div>
          </div>

          {/* Module 3: Risk & Behaviour Analytics */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Risk & Behaviour Analytics</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Automated risk classification evaluating vulnerabilities across credential security, public Wi-Fi exposure, phishing vulnerability, and patch lag.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-amber-700">
              <Link href="/admin/risk-insights" className="hover:underline flex items-center gap-1">
                <span>Explore Risk Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Module 4: Cohort Comparison */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cohort Comparison & t-Testing</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Granular cross-sectional comparison contrasting student habits against faculty practices, complete with descriptive metrics and Welch&apos;s t-test calculation.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-emerald-700">
              <Link href="/admin/analysis" className="hover:underline flex items-center gap-1">
                <span>View Comparative Metrics</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Module 5: Security Recommendations */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Security Improvement Engine</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Dynamic, data-derived rule engine translating aggregate behavioral shortfalls into prioritised institutional governance and policy recommendations.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-purple-700">
              <span>Rule-Based Synthesis</span>
            </div>
          </div>

          {/* Module 6: Reports & Export */}
          <div className="academic-card p-6 flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Formal Reports & CSV Export</h3>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Structured academic report preview generation alongside one-click RFC-4180 CSV dataset downloads for offline analysis in Excel, SPSS, or Python.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-700">
              <Link href="/admin/reports" className="hover:underline flex items-center gap-1">
                <span>Generate Assessment Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Attribution & Context Section */}
      <div className="mt-20 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>B.Sc. Information Technology • Undergraduate Software Project</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Topic: Cyber Hygiene Practices Among College Students and Faculty
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Candidate: <strong>Dhruv Gupta</strong> • An information system and assessment analytics platform designed to evaluate and enhance collegiate digital security posture.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/about"
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-2xs transition-colors flex items-center gap-1"
          >
            <span>Project Details</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/admin/login"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-2xs transition-colors"
          >
            Admin Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
