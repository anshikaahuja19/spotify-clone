import React, { useState, useEffect } from 'react';
import styles from './FeaturedCharts.module.css';

// 1. Data stay outside the component so it doesn't get re-created on every render
const GENRES = [
  { name: 'Pop',    term: 'pop hits 2024',      color: '#e13300' },
  { name: 'Hip-Hop',term: 'hip hop rap 2024',   color: '#8400e7' },
  { name: 'Lofi',   term: 'lofi chill study',   color: '#006450' },
  { name: 'Hindi',  term: 'arijit singh hindi', color: '#e8115b' },
  { name: 'Punjabi',term: 'ap dhillon punjabi',  color: '#1e3264' },
];

function FeaturedCharts() {
  // State management
  const [activeGenre, setActiveGenre] = useState(GENRES[0]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const [audio, setAudio] = useState(null);

  // Fetch songs whenever the activeGenre changes
  useEffect(() => {
    setLoading(true);
    
    // Using standard fetch with then/catch
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(activeGenre.term)}&media=music&entity=song&limit=8`;
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setLoading(false);
      });
  }, [activeGenre]);

  // Handle Play/Pause logic
  const handlePreview = (song) => {
    // If something is already playing, stop it first
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // If clicking the same song that is currently playing, just stop (toggle off)
    if (playingId === song.trackId) {
      setPlayingId(null);
      setAudio(null);
      return;
    }

    // Play new song if preview exists
    if (song.previewUrl) {
      const newAudio = new Audio(song.previewUrl);
      newAudio.volume = 0.5;
      newAudio.play();
      
      // When song ends, reset the "playing" icon
      newAudio.onended = () => {
        setPlayingId(null);
      };

      setAudio(newAudio);
      setPlayingId(song.trackId);
    }
  };

  // Helper function to get better quality images
  const getHighResImage = (url) => {
    if (!url) return '';
    return url.replace('100x100', '300x300');
  };

  // Convert milliseconds to M:SS format
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Adds a leading zero to seconds if they are less than 10
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Charts</h2>
        {/* <span className={styles.showAll}>Show all</span> */}
      </div>

      {/* Genre Filter Tabs */}
      <div className={styles.tabs}>
        {GENRES.map((genre) => (
          <button
            key={genre.name}
            className={`${styles.tab} ${activeGenre.name === genre.name ? styles.tabActive : ''}`}
            style={activeGenre.name === genre.name ? { backgroundColor: genre.color } : {}}
            onClick={() => setActiveGenre(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Song List Area */}
      <div className={styles.list}>
        {loading ? (
          // Simple loading state
          <p>Loading tracks...</p>
        ) : (
          songs.map((song, index) => (
            <div
              key={song.trackId}
              className={`${styles.row} ${playingId === song.trackId ? styles.rowActive : ''}`}
              onClick={() => handlePreview(song)}
            >
              <div className={styles.num}>
                {playingId === song.trackId ? '▶' : index + 1}
              </div>
              
              <img 
                src={getHighResImage(song.artworkUrl100)} 
                alt={song.trackName} 
                className={styles.thumb} 
              />
              
              <div className={styles.info}>
                <p className={styles.name}>{song.trackName}</p>
                <p className={styles.artist}>{song.artistName}</p>
              </div>
              
              <p className={styles.album}>{song.collectionName}</p>
              <p className={styles.dur}>{formatTime(song.trackTimeMillis)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeaturedCharts;