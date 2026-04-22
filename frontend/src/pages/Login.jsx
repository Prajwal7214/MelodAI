import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login, tryForFree } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim())       return setError('Please enter your email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);
    await new Promise(r => setTimeout(r, 700));

    const accounts = JSON.parse(localStorage.getItem('melodai_accounts') || '[]');
    const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      setLoading(false);
      return setError('No account found with this email. Please sign up first.');
    }
    if (found.password !== password) {
      setLoading(false);
      return setError('Incorrect password. Please try again.');
    }

    const name = found.name || email.split('@')[0];
    const initials = name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
    login({ name, email, initials, plan: 'free', joinedAt: new Date().toISOString() });
    navigate('/generate');
  };

  const handleTryFree = () => {
    tryForFree();
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6 py-20 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo / Back link */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block text-sm font-semibold text-zinc-400 hover:text-zinc-700 tracking-tight transition-colors mb-10"
          >
            ← MelodAI
          </Link>

          {/* Big italic heading — homepage style */}
          <h1 className="font-instrument italic text-5xl text-zinc-900 leading-tight mb-2">
            Welcome back.
          </h1>
          <p className="text-zinc-500 font-medium tracking-tight text-sm">
            Log in to continue generating music.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-10">

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-start gap-2.5 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-5 text-sm text-zinc-600"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-zinc-400" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 pr-12 text-zinc-900 placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit — solid black */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-xl font-bold text-white text-sm bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.15)] mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Log In <span className="font-serif italic font-normal text-lg leading-none">→</span></>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-zinc-400 text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Try Studio for Free — outlined */}
          <motion.button
            onClick={handleTryFree}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 border border-zinc-200 rounded-xl text-zinc-600 text-sm font-semibold hover:border-zinc-300 hover:bg-zinc-50 transition-all"
          >
            Try Studio for Free →
          </motion.button>
        </div>

        {/* Footer link */}
        <p className="text-center text-zinc-500 text-sm mt-6 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-zinc-900 font-bold hover:underline transition-all">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
