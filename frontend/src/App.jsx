import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Navbar from './components/Navbar';
import GlobalPlayerBar from './components/GlobalPlayerBar';

import Home from './pages/Home';
import GenerateMusic from './pages/GenerateMusic';
import MusicHistory from './pages/MusicHistory';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppInner() {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased">
      <Navbar />

      <Routes>
        {/* ── Public ── */}
        <Route path="/"       element={<Home />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ── Semi-protected: guests + logged-in ── */}
        <Route
          path="/generate"
          element={
            <ProtectedRoute pageName="studio">
              <GenerateMusic />
            </ProtectedRoute>
          }
        />

        {/* ── Fully protected: must be logged in ── */}
        <Route
          path="/history"
          element={
            <ProtectedRoute pageName="history">
              <MusicHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute pageName="favourites">
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute pageName="settings">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Global persistent player bar — survives navigation */}
      <GlobalPlayerBar toastFn={showToast} />

      {/* Global toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="global-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-2xl z-[100] font-medium text-sm flex items-center gap-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <AppInner />
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
