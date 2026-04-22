import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PAGE_LABELS = {
  history:    'Music History',
  favourites: 'Your Favourites',
  favorites:  'Your Favourites',
  settings:   'Settings',
  discover:   'Discover',
};

const LoginRequired = ({ pageName }) => {
  const { tryForFree } = useAuth();
  const navigate = useNavigate();

  const label = PAGE_LABELS[pageName] || pageName;

  const handleTryForFree = () => {
    tryForFree();
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6 py-20">

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Heading above the card — same position as login/signup */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block text-sm font-semibold text-zinc-400 hover:text-zinc-700 tracking-tight transition-colors mb-10"
          >
            ← MelodAI
          </Link>

          {/* Big italic heading */}
          <h1 className="font-instrument italic text-5xl text-zinc-900 leading-tight mb-2">
            Login Required
          </h1>
          <p className="text-zinc-500 font-medium tracking-tight text-sm">
            You need an account to access{' '}
            <span className="text-zinc-800 font-bold">{label}</span>.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-10">

          {/* Lock icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-14 h-14 bg-zinc-100 border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Lock className="w-7 h-7 text-zinc-700" />
          </motion.div>

          <p className="text-zinc-500 text-sm text-center leading-relaxed mb-7">
            Join MelodAI for free and unlock your full music experience — history, favourites, and more.
          </p>

          {/* Primary CTA — solid black button */}
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-bold text-white text-sm bg-zinc-900 hover:bg-black transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.15)]"
            >
              Create Free Account
              <span className="font-serif italic font-normal text-lg leading-none">→</span>
            </motion.button>
          </Link>

          {/* Already have account */}
          <p className="text-center text-zinc-500 text-sm mt-5 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-zinc-900 font-bold hover:underline transition-all">
              Log in
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-zinc-400 text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Guest option — ghost outlined */}
          <motion.button
            onClick={handleTryForFree}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 border border-zinc-200 rounded-xl text-zinc-500 text-sm font-semibold hover:border-zinc-300 hover:bg-zinc-50 transition-all flex items-center justify-center gap-1.5"
          >
            Continue with Studio only (free preview)
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRequired;
