import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const PlayerContext = createContext(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
};

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);   // full song object
  const [queue, setQueue] = useState([]);                  // current playlist
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);

  const _attachListeners = useCallback((audio, song, songQueue) => {
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onended = () => {
      const idx = songQueue.findIndex(s => s.id === song.id);
      if (idx < songQueue.length - 1) {
        _playSong(songQueue[idx + 1], songQueue);
      } else {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    };
  }, []); // eslint-disable-line

  const _playSong = useCallback((song, songQueue) => {
    if (!song) return;

    // Stop existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onloadedmetadata = null;
      audioRef.current.onended = null;
    }

    if (!song.preview_url) {
      // Still update UI state so the bar shows the song info
      setCurrentSong(song);
      setQueue(songQueue || []);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    const audio = new Audio(song.preview_url);
    audio.volume = volume;
    audioRef.current = audio;

    _attachListeners(audio, song, songQueue || []);

    audio.play().catch(e => console.warn('Play error:', e));

    setCurrentSong(song);
    setQueue(songQueue || []);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  }, [volume, _attachListeners]);

  const playSong = useCallback((song, songQueue) => {
    _playSong(song, songQueue);
  }, [_playSong]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.warn(e));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    if (idx < queue.length - 1) _playSong(queue[idx + 1], queue);
  }, [currentSong, queue, _playSong]);

  const playPrevious = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    if (idx > 0) _playSong(queue[idx - 1], queue);
  }, [currentSong, queue, _playSong]);

  const seek = useCallback((pos) => {
    if (audioRef.current && duration) {
      audioRef.current.currentTime = pos * duration;
    }
  }, [duration]);

  const changeVolume = useCallback((val) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  }, []);

  const seekByClick = useCallback((e, trackEl) => {
    if (!audioRef.current || !duration) return;
    const rect = trackEl.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  }, [duration]);

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      queue,
      isPlaying,
      progress,
      duration,
      currentTime,
      volume,
      playSong,
      togglePlayPause,
      playNext,
      playPrevious,
      seek,
      seekByClick,
      changeVolume,
      formatTime,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
