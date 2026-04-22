import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [showCPw, setShowCPw]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);

  const { signup, emailExists } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim())           return setError('Please enter your full name.');
    if (!isValidEmail(email))   return setError('Please enter a valid email address.');
    if (password.length < 6)    return setError('Password must be at least 6 characters.');
    if (password !== confirmPw) return setError('Passwords do not match.');
    if (emailExists(email))     return setError('An account with this email already exists. Please log in.');

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const trimmedName = name.trim();
    const initials = trimmedName.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
    const userData = {
      name: trimmedName,
      email,
      initials,
      plan: 'free',
      joinedAt: new Date().toISOString(),
      _password: password,
      password,
    };

    signup(userData);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 900));
    navigate('/generate');
  };

  // Password strength 0–4
  const strength = Math.min(4, Math.floor(password.length / 3));

  const inputBase = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-zinc-400 focus:bg-white transition-all";

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6 py-10 relative overflow-hidden">

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
            Join the rhythm.
          </h1>
          <p className="text-zinc-500 font-medium tracking-tight text-sm">
            Create your account to start generating.
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

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-5 text-sm text-zinc-700 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-zinc-500" />
                🎉 Welcome to MelodAI! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder="Alex Maestro"
                autoComplete="name"
                className={inputBase}
              />
            </div>

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
                className={inputBase}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Monochrome strength bar */}
              {password.length > 0 && (
                <div className="flex gap-1 pt-1">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < strength ? 'bg-zinc-600' : 'bg-zinc-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showCPw ? 'text' : 'password'}
                  value={confirmPw}
                  onChange={e => { setConfirmPw(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`${inputBase} pr-12 ${
                    confirmPw && confirmPw !== password ? 'border-zinc-400' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCPw(!showCPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showCPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit — solid black */}
            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-xl font-bold text-white text-sm bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.15)] mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>Create Account <span className="font-serif italic font-normal text-lg leading-none">→</span></>
              )}
            </motion.button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-zinc-500 text-sm mt-6 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-zinc-900 font-bold hover:underline transition-all">
              Log in
            </Link>
          </p>

          <p className="text-[11px] text-zinc-400 text-center mt-4 max-w-[220px] mx-auto leading-relaxed">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
