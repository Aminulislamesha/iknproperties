import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('iknadmin2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      showToast('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandDark flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative emerald glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
        {/* Brand header */}
        <div className="text-center space-y-2 mb-8">
          <img
            src="/logo.png"
            alt="IKN Properties Logo"
            className="w-16 h-16 object-contain mx-auto drop-shadow-xl"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            IKN <span className="text-gold">PROPERTIES</span>
          </h1>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Control Management Portal
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>

          {/* Demo credential badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="font-bold text-slate-700 block">Default Credentials:</span>
            <div className="flex justify-between">
              <span>User: <strong className="text-slate-800">admin</strong></span>
              <span>Pass: <strong className="text-slate-800">iknadmin2026</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
