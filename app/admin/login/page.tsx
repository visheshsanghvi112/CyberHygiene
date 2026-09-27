'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-24 relative">
      {/* Top ambient spotlight glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-40 bg-indigo-600/15 blur-3xl pointer-events-none rounded-full" />

      <div className="text-center mb-6 sm:mb-8 relative z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-600/30">
          <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Researcher Gateway
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Authenticate to inspect real-time survey metrics, comparative analytics, and CSV exports.
        </p>
      </div>

      <div className="intel-card-elevated p-5 sm:p-8 border border-slate-800 relative z-10">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Access Token Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Intelligence Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Development Helper Badge */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 shadow-inner">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5 mb-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Development Gateway Credentials:</span>
          </div>
          <div className="font-mono text-[11px] text-slate-300">
            Email: <code className="text-indigo-300">admin@college.edu</code>
          </div>
          <div className="font-mono text-[11px] text-slate-300 mt-0.5">
            Password: <code className="text-indigo-300">CyberHygiene2026!</code>
          </div>
        </div>
      </div>
    </div>
  );
}
