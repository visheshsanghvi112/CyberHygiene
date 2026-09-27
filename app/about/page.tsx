import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Cpu,
  Layers,
  Award,
  ArrowRight,
  Database,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 sm:pb-8 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Project Brief</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
          About the Cyber Hygiene Intelligence & Assessment System
        </h1>
        <p className="mt-3 text-xs sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          A comprehensive cybersecurity behavioral evaluation and analytics platform developed as a final year undergraduate Information Technology project.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-10">
        {/* Project Meta Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="intel-card p-4 sm:p-6">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Academic Project Identification
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400">Official Topic: </span>
                <strong className="text-slate-100 block sm:inline mt-0.5 sm:mt-0">
                  Cyber Hygiene Practices Among College Students and Faculty
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Student Researcher: </span>
                <strong className="text-indigo-400">Dhruv Gupta</strong>
              </div>
              <div>
                <span className="text-slate-400">Academic Program: </span>
                <strong className="text-slate-200">Bachelor of Science in Information Technology (B.Sc. IT)</strong>
              </div>
              <div>
                <span className="text-slate-400">Academic Year: </span>
                <strong className="text-slate-200 font-mono">2025–2026</strong>
              </div>
            </div>
          </div>

          <div className="intel-card p-4 sm:p-6">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Software Architecture Specification
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong className="text-slate-200">Core Framework:</strong> Next.js 14 (App Router) & React 18</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong className="text-slate-200">Database Engine:</strong> Embedded SQLite with Prisma ORM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-200">Scoring Engine:</strong> TypeScript Deterministic 15-Factor Normalization</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong className="text-slate-200">Visualization:</strong> Recharts 10-Chart Analytics Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Research Problem & Objectives */}
        <div className="intel-card p-4 sm:p-8">
          <div className="flex items-center gap-2.5 mb-3">
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100">1. Problem Statement & Research Objectives</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            In higher education institutions, students and faculty handle academic coursework, institutional portals, and personal sensitive data across multiple unmanaged devices. While university networks implement perimeter defenses, the human factor remains the primary attack vector. This software system was built to provide an objective, data-driven mechanism to measure everyday cyber hygiene practices, quantify behavioral risks, and programmatically generate institutional policy recommendations.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-slate-100 block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Systematic Assessment</span>
              </strong>
              <span className="text-slate-400 leading-relaxed">Collect self-reported behavioral compliance across 6 key cybersecurity domains.</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-slate-100 block mb-1.5 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Comparative Analytics</span>
              </strong>
              <span className="text-slate-400 leading-relaxed">Quantify variance between student and faculty cohorts using descriptive metrics and Welch&apos;s t-test.</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-slate-100 block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Prescriptive Governance</span>
              </strong>
              <span className="text-slate-400 leading-relaxed">Translate observed compliance gaps into actionable IT security improvements.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Assessment & Scoring Methodology */}
        <div className="intel-card p-4 sm:p-8">
          <div className="flex items-center gap-2.5 mb-3">
            <Award className="w-5 h-5 text-indigo-400 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100">2. Assessment & Scoring Methodology</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The Cyber Hygiene Score evaluates 15 key behavioral questions spanning password management, authentication enforcement, device lock, patching routines, phishing vigilance, public Wi-Fi safety, and backup discipline. Each response is mapped to an adherence scale of 1 to 5 points (maximum 75 raw points) and normalized to a 100-point scale:
          </p>
          <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-indigo-300 font-mono text-xs sm:text-sm text-center shadow-inner overflow-x-auto whitespace-nowrap">
            Cyber Hygiene Score = round((Earned Points / 75) × 100)
          </div>
          <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <strong className="block text-emerald-200 mb-0.5">Strong (80–100):</strong>
              <span className="text-[11px] text-emerald-400/90">Proactive security habits</span>
            </div>
            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300">
              <strong className="block text-sky-200 mb-0.5">Good (60–79):</strong>
              <span className="text-[11px] text-sky-400/90">Baseline precautions</span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <strong className="block text-amber-200 mb-0.5">Basic (40–59):</strong>
              <span className="text-[11px] text-amber-400/90">Notable vulnerabilities</span>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
              <strong className="block text-rose-200 mb-0.5">Needs Improvement (0–39):</strong>
              <span className="text-[11px] text-rose-400/90">High behavioral risk</span>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500 italic">
            Methodology Note: The score is an academic survey-derived measure created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark.
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 p-4 sm:p-8 rounded-2xl intel-card-elevated border border-indigo-500/30 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 shadow-xl">
          <div>
            <h3 className="font-bold text-slate-100 text-base">Ready to test the assessment module?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Participate anonymously or explore the administrative intelligence dashboard.
            </p>
          </div>
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 shrink-0">
            <Link
              href="/survey"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5 text-center"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-all text-center"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
