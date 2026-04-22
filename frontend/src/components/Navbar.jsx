import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Settings, LogOut, User, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate  = useNavigate();
  const { user, isGuest, isLoggedIn, logout, tryForFree } = useAuth();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isLightPage = ['/login', '/signup', '/generate', '/favorites', '/settings', '/history'].includes(location.pathname);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Studio',    path: '/generate' },
    { name: 'History',   path: '/history' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Settings',  path: '/settings' },
  ];

  const textColor   = scrolled || isLightPage ? 'text-gray-600'   : 'text-zinc-300';
  const hoverColor  = scrolled || isLightPage ? 'hover:text-black' : 'hover:text-white';
  const logoColor   = scrolled || isLightPage ? 'text-black'       : 'text-white';
  const activeStyle = scrolled || isLightPage
    ? 'bg-black text-white'
    : 'bg-white text-black';

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className={`text-xl font-bold tracking-tight ${logoColor} transition-colors`}>
              MelodAI
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <motion.span
                    whileHover={!isActive ? { scale: 1.05 } : {}}
                    className={`text-sm font-semibold transition-colors relative inline-block ${
                      isActive
                        ? `px-5 py-2 rounded-full shadow-md tracking-wide ${activeStyle}`
                        : `px-3 py-2 ${textColor} ${hoverColor}`
                    }`}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* Right side — auth state */}
          <div className="hidden md:flex items-center gap-3">

            {/* Guest banner pill */}
            {isGuest && !isLoggedIn && (
              <span className="text-xs font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 hidden lg:inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Free Preview
              </span>
            )}

            {isLoggedIn ? (
              /* ── LOGGED IN — Avatar + Dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    scrolled || isLightPage
                      ? 'hover:bg-zinc-100'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {/* Avatar circle */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-md shrink-0">
                    <span className="text-white text-xs font-bold">{user?.initials || 'ME'}</span>
                  </div>
                  <span className={`text-sm font-semibold hidden lg:block ${scrolled || isLightPage ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled || isLightPage ? 'text-zinc-500' : 'text-zinc-400'}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-1.5 z-50"
                    >
                      {/* User info */}
                      <div className="px-3 py-2.5 mb-1 border-b border-zinc-800">
                        <p className="text-xs font-bold text-zinc-200 truncate">{user?.name}</p>
                        <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
                      </div>

                      {[
                        { icon: User,     label: 'My Profile', path: '/settings' },
                        { icon: Settings, label: 'Settings',   path: '/settings' },
                      ].map(item => (
                        <Link key={item.label} to={item.path}>
                          <button
                            onClick={() => setDropdownOpen(false)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                          >
                            <item.icon size={15} className="text-zinc-500" />
                            {item.label}
                          </button>
                        </Link>
                      ))}

                      <div className="h-px bg-zinc-800 my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={15} />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            ) : isGuest ? (
              /* ── GUEST — Upgrade + Login ── */
              <>
                <Link to="/login">
                  <button className={`text-sm font-semibold transition-colors ${textColor} ${hoverColor}`}>
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className={`px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                    scrolled || isLightPage
                      ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md'
                      : 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                  }`}>
                    Upgrade →
                  </button>
                </Link>
              </>

            ) : (
              /* ── NOT LOGGED IN ── */
              <>
                <Link to="/login">
                  <button className={`text-sm font-semibold transition-colors ${textColor} ${hoverColor}`}>
                    Log in
                  </button>
                </Link>
                <Link to="/generate">
                  <button
                    onClick={() => tryForFree()}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                      scrolled || isLightPage
                        ? 'bg-black text-white hover:bg-gray-800 shadow-md'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    Try for Free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen
              ? <X color={scrolled || isLightPage ? 'black' : 'white'} />
              : <Menu color={scrolled || isLightPage ? 'black' : 'white'} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-zinc-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-zinc-100 space-y-2 mt-2">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Log out
                    </button>
                  ) : (
                    <>
                      <Link to="/login" className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
                        Log in
                      </Link>
                      <Link to="/signup" className="block py-2.5 px-3 rounded-lg text-sm font-bold text-white bg-zinc-900 text-center">
                        Create Free Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
