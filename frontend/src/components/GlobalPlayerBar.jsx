import React, { useRef } from 'react';
import { Play, Pause, Disc3, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import PlayerHeartButton from './PlayerHeartButton';

const GlobalPlayerBar = ({ toastFn }) => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    currentTime,
    volume,
    togglePlayPause,
    playNext,
    playPrevious,
    seekByClick,
    changeVolume,
    formatTime,
  } = usePlayer();

  const location = useLocation();
  const trackRef = useRef(null);

  // Show bar if: song is playing (any page) OR user is on /generate even if paused
  const isStudio = location.pathname === '/generate';
  const shouldShow = isPlaying || isStudio;

  // Fallback artwork — a proper musical note SVG, not a random image
  const ArtworkPlaceholder = () => (
    <div className="w-full h-full bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center">
      <Disc3 className="w-5 h-5 text-violet-400" />
    </div>
  );

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="global-player"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 border-t border-zinc-200 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] px-4 md:px-8 flex items-center justify-between z-50 backdrop-blur-xl"
        >
          {/* LEFT — Album art + song info + heart */}
          <div className="flex items-center gap-3 w-[30%] min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-200/60 shadow-sm">
              {currentSong?.artwork ? (
                <img
                  src={currentSong.artwork}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
              ) : null}
              <ArtworkPlaceholder />
            </div>

            <div className="hidden sm:flex flex-col min-w-0">
              <h4 className="text-sm font-bold tracking-tight text-zinc-900 truncate max-w-[140px]">
                {currentSong?.title || 'No track playing'}
              </h4>
              <p className="text-xs font-medium text-zinc-500 truncate max-w-[140px]">
                {currentSong?.artist || (isStudio ? 'Select a track to play' : '')}
              </p>
            </div>

            {currentSong && (
              <PlayerHeartButton
                song={currentSong}
                onToast={toastFn || (() => {})}
              />
            )}
          </div>

          {/* CENTER — Controls + progress bar */}
          <div className="flex flex-col items-center justify-center w-[40%] space-y-1.5">
            <div className="flex items-center gap-5">
              <button
                onClick={playPrevious}
                className="text-zinc-400 hover:text-zinc-700 transition-colors"
                aria-label="Previous"
              >
                <SkipBack size={18} />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-zinc-900 shadow-md text-white flex items-center justify-center hover:scale-105 hover:bg-black transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying
                  ? <Pause className="w-4 h-4" fill="currentColor" />
                  : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                }
              </button>

              <button
                onClick={playNext}
                className="text-zinc-400 hover:text-zinc-700 transition-colors"
                aria-label="Next"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="hidden md:flex items-center w-full max-w-md gap-2">
              <span className="text-[10px] font-bold text-zinc-400 font-mono w-8 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                ref={trackRef}
                className="h-1.5 flex-1 bg-zinc-200 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => seekByClick(e, trackRef.current)}
              >
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-75"
                  style={{ width: `${progress || 0}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 font-mono w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* RIGHT — Volume */}
          <div className="w-[30%] hidden sm:flex justify-end items-center gap-2 text-zinc-400">
            <Volume2 size={18} className="shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-24 h-1.5 accent-violet-500 bg-zinc-200 rounded-full cursor-pointer"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPlayerBar;
