import Link from 'next/link';
import { ShieldCheck, GraduationCap, Lock, ExternalLink, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950/90 border-t border-slate-800/80 mt-12 sm:mt-20 py-8 sm:py-12 text-slate-400 text-xs sm:text-sm relative overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-slate-100 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm">Cyber Hygiene Assessment & Analytics</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              An enterprise intelligence platform for measuring cybersecurity practices, identifying behavioural vulnerabilities, and generating actionable security awareness insights across higher education stakeholders.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Link href="/about" className="hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
                <span>View Academic Project Brief</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5 font-bold text-slate-100 mb-3">
              <div className="w-7 h-7 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm">Academic Authorship & Context</span>
            </div>
            <div className="text-slate-400 leading-relaxed text-xs space-y-1.5">
              <div>
                <strong className="text-slate-200">Degree Program:</strong> Bachelor of Science in Information Technology
              </div>
              <div>
                <strong className="text-slate-200">Candidate:</strong> Dhruv Gupta
              </div>
              <div>
                <strong className="text-slate-200">Topic:</strong> Cyber Hygiene Practices Among College Students and Faculty
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5 font-bold text-slate-100 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm">Privacy & Architecture Guarantee</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Assessment participation is 100% anonymous. The system does not collect passwords, contact numbers, email addresses, student IDs, or network IP addresses. Zero personal credentials are stored.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>Zero-Credential Storage Verified</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Cyber Hygiene Assessment System (CIA v1.0) • B.Sc. IT Final Year Project • Dhruv Gupta
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Next.js 14 • Prisma • SQLite</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-indigo-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
