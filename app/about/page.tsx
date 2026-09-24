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
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Project Brief</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About the Cyber Hygiene Intelligence & Assessment System
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          An empirical cybersecurity behavioral evaluation and analytics platform developed as a final year undergraduate Information Technology project.
        </p>
      </div>

      <div className="space-y-10">
        {/* Project Meta Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="academic-card p-6 bg-slate-50/70 border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Academic Project Identification
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-500">Official Topic: </span>
                <strong className="text-slate-900">
                  Cyber Hygiene Practices Among College Students and Faculty
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Student Researcher: </span>
                <strong className="text-indigo-700">Dhruv Gupta</strong>
              </div>
              <div>
                <span className="text-slate-500">Academic Program: </span>
                <strong className="text-slate-800">Bachelor of Science in Information Technology (B.Sc. IT)</strong>
              </div>
              <div>
                <span className="text-slate-500">Academic Year: </span>
                <strong className="text-slate-800">2025–2026</strong>
              </div>
            </div>
          </div>

          <div className="academic-card p-6 bg-indigo-50/40 border-indigo-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
              Software Architecture Specification
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Core Framework:</strong> Next.js 14 (App Router) & React 18</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Database Engine:</strong> Embedded SQLite with Prisma ORM</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Scoring & Analytics:</strong> TypeScript Deterministic Computation</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Visualization:</strong> Recharts 10-Chart Analytics Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Research Problem & Objectives */}
        <div className="academic-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">1. Problem Statement & Research Objectives</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In higher education institutions, students and faculty handle academic coursework, institutional portals, and personal sensitive data across multiple unmanaged devices. While university networks implement perimeter defenses, the human factor remains the primary attack vector. This software system was built to provide an objective, data-driven mechanism to measure everyday cyber hygiene practices, quantify behavioral risks, and programmatically generate institutional policy recommendations.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Empirical Assessment</strong>
              <span className="text-slate-500">Collect self-reported behavioral compliance across 6 key cybersecurity domains.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Comparative Analytics</strong>
              <span className="text-slate-500">Quantify variance between student and faculty cohorts using descriptive metrics and Welch&apos;s t-test.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Prescriptive Governance</strong>
              <span className="text-slate-500">Translate observed compliance gaps into actionable IT security improvements.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Assessment & Scoring Methodology */}
        <div className="academic-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">2. Assessment & Scoring Methodology</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The Cyber Hygiene Score evaluates 15 key behavioral questions spanning password management, authentication enforcement, device lock, patching routines, phishing vigilance, public Wi-Fi safety, and backup discipline. Each response is mapped to an adherence scale of 1 to 5 points (maximum 75 raw points) and normalized to a 100-point scale:
          </p>
          <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs text-center">
            Cyber Hygiene Score = round((Earned Points / 75) × 100)
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-950 border border-emerald-200">
              <strong>Strong (80–100):</strong> Proactive security habits
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-950 border border-blue-200">
              <strong>Good (60–79):</strong> Baseline precautions
            </div>
            <div className="p-3 rounded-lg bg-amber-50 text-amber-950 border border-amber-200">
              <strong>Basic (40–59):</strong> Notable vulnerabilities
            </div>
            <div className="p-3 rounded-lg bg-rose-50 text-rose-950 border border-rose-200">
              <strong>Needs Improvement (0–39):</strong> High behavioral risk
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500 italic">
            Methodology Note: The score is an academic survey-derived measure created for this project and is not a standardized cybersecurity certification or clinical/industry benchmark.
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-indigo-600 text-white">
          <div>
            <h3 className="font-bold text-base">Ready to test the assessment module?</h3>
            <p className="text-xs text-indigo-100 mt-1">
              Participate anonymously or explore the administrative intelligence dashboard.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/survey"
              className="px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-xs hover:bg-indigo-50 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 rounded-xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-medium text-xs border border-indigo-500 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
