import Link from 'next/link';
import { ShieldCheck, GraduationCap, Lock, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Cyber Hygiene Assessment & Analytics System</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              An information system for assessing cybersecurity practices, identifying behavioural vulnerabilities, and generating actionable security awareness insights across higher education stakeholders.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-indigo-700 font-medium">
              <Link href="/about" className="hover:underline flex items-center gap-1">
                <span>View Academic Project Brief</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Academic Authorship & Context</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              <strong>B.Sc. Information Technology Project</strong><br />
              <strong>Candidate:</strong> Dhruv Gupta<br />
              <strong>Project Topic:</strong> Cyber Hygiene Practices Among College Students and Faculty
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>Security & Privacy Architecture</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Assessment participation is 100% anonymous. The system does not collect passwords, contact numbers, email addresses, student IDs, or network IP addresses. Zero personal credentials are stored.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Cyber Hygiene Assessment & Analytics System • B.Sc. Information Technology Project • Dhruv Gupta
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js & SQLite</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-slate-600 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
