import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

export const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [likedSongs, setLikedSongs] = useState(() => {
    try {
      const saved = localStorage.getItem("spotify_liked_songs");
      return saved && saved !== "undefined" ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [progress, setProgress] = useState(0);

  // Mock audio progress since we lack 160+ unique MP3 URLs
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            playNext();
            return 0;
          }
          return prev + (100 / 180); // Assume 3 minute length (180s)
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, queue]);

  // Persist liked songs
  useEffect(() => {
    localStorage.setItem("spotify_liked_songs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const playSong = (song) => {
    setCurrentSong(song);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const addToQueue = (song) => {
    setQueue(prev => [...prev, song]);
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const playPrevious = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleLike = (song) => {
    setLikedSongs(prev => {
      const exists = prev.some(s => s.title === song.title);
      if (exists) {
        return prev.filter(s => s.title !== song.title);
      }
      return [...prev, song];
    });
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      queue,
      progress,
      likedSongs,
      playSong,
      togglePlay,
      playNext,
      playPrevious,
      addToQueue,
      toggleLike
    }}>
      {children}
    </MusicContext.Provider>
  );
};