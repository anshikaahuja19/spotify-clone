import React, { useState, useEffect } from 'react';
import styles from './RecentlyPlayed.module.css';

// List of artists to pick from randomly
const ARTISTS = ['taylor swift', 'the weeknd', 'drake', 'billie eilish', 'arijit singh'];

function RecentlyPlayed() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // Pick a random artist from our list
    const randomIndex = Math.floor(Math.random() * ARTISTS.length);
    const randomArtist = ARTISTS[randomIndex];

    // Fetch songs for that artist
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(randomArtist)}&media=music&entity=song&limit=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recently played:", error);
        setLoading(false);
      });
  }, []);

  // Helper function to get better quality images
  const getHighResImage = (url) => {
    if (!url) return '';
    return url.replace('100x100', '300x300');
  };

  // If loading, show a simple text message (easier than complex skeletons)
  if (loading) {
    return (
      <div className={styles.section}>
        <p style={{ color: '#a7a7a7' }}>Loading your history...</p>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recently Played</h2>
        <span className={styles.showAll}>Show all</span>
      </div>

      <div className={styles.row}>
        {songs.map((song) => (
          <div
            key={song.trackId}
            className={styles.card}
            onMouseEnter={() => setHoveredId(song.trackId)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={styles.imgWrap}>
              <img
                src={getHighResImage(song.artworkUrl100)}
                alt={song.trackName}
                className={styles.img}
              />
              
              {/* Show play button only when hovering over the specific card */}
              {hoveredId === song.trackId && (
                <button className={styles.playBtn}>▶</button>
              )}
            </div>
            
            <p className={styles.name}>{song.trackName}</p>
            <p className={styles.artist}>{song.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyPlayed;