import React, { useState, useEffect } from 'react';
import { Heart, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SongCard from '../components/SongCard';
import { usePlayer } from '../context/PlayerContext';

const SORT_OPTIONS = ['Recently Added', 'By Mood', 'By Artist'];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Recently Added');
  const [toastMessage, setToastMessage] = useState('');

  const { playSong, currentSong, isPlaying } = usePlayer();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/favourites/');
      const data = await res.json();
      setFavorites(data.favourites || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSortedFavorites = () => {
    const list = [...favorites];
    if (sortOption === 'By Mood') list.sort((a, b) => (a.mood || '').localeCompare(b.mood || ''));
    else if (sortOption === 'By Artist') list.sort((a, b) => (a.artist || '').localeCompare(b.artist || ''));
    return list;
  };

  const sortedFavorites = getSortedFavorites();

  const handleRemove = (songId) => {
    setFavorites(prev => prev.filter(s => s.id !== songId));
  };

  const handleSongPlay = (song) => {
    playSong(song, sortedFavorites);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F9F9FB] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <Heart size={28} strokeWidth={2.5} className="text-gray-800" />
            </div>
            <div>
              <span className="inline-block bg-pink-500/10 text-pink-600 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-1">
                SAVED TRACKS
              </span>
              <h1 className="text-4xl md:text-5xl font-bold -tracking-[0.05em] text-zinc-900">Your Favourites</h1>
              <p className="font-instrument italic text-zinc-500 text-2xl mt-2">All the songs you have loved.</p>
            </div>
          </div>

          {!loading && favorites.length > 0 && (
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 tracking-wider mb-1">SONGS SAVED</p>
                <p className="text-lg font-bold text-zinc-800">{favorites.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 tracking-wider mb-1">GENRES</p>
                <p className="text-lg font-bold text-zinc-800">
                  {new Set(favorites.map(f => f.genre).filter(Boolean)).size}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SORT OPTIONS */}
        {!loading && favorites.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSortOption(opt)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  sortOption === opt
                    ? 'bg-zinc-900 text-white border border-zinc-900'
                    : 'border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 bg-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-3 rounded-xl animate-pulse bg-white border border-zinc-100 shadow-sm">
                <div className="w-full aspect-square bg-zinc-100 rounded-lg"></div>
                <div className="flex-1 space-y-2 mt-2">
                  <div className="h-4 bg-zinc-100 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50 shadow-sm">
            <div className="w-20 h-20 bg-[#F9F9FB] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-6">
              <Heart size={36} strokeWidth={2.5} className="text-zinc-700" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-800 mb-2">No favourites yet</h2>
            <p className="text-zinc-500 mb-6 font-medium">Heart any song while listening to save it here.</p>
            <a href="/generate" className="px-6 py-2.5 rounded-full font-semibold text-white bg-zinc-900 shadow-md hover:bg-black transition-all hover:scale-105">
              → Discover Songs
            </a>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {sortedFavorites.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={handleSongPlay}
                  onToast={showToast}
                  onRemove={handleRemove}
                  isFavoritePage={true}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Local toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
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
};

export default Favorites;
