import React, { useState, useEffect } from 'react';
import styles from './LongTracks.module.css';

function LongTracks() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const apiUrl = `https://itunes.apple.com/search?term=trending+hits&media=music&entity=song&limit=10`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setSongs(data.results || []);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

  if (loading) return null;

  return (
    <div className={styles.section}>
      {/* Added the Heading here */}
      <h2 className={styles.mainHeading}>Made For You</h2>
      
      <div className={styles.bigCardGrid}>
        {songs.map((song) => (
          <div key={song.trackId} className={styles.bigCard}>
            {/* Using the 600x600 replacement logic for high-res images */}
            <img 
              src={song.artworkUrl100.replace('100x100', '600x600')} 
              alt={song.trackName} 
              className={styles.cardImg}
            />
            
            <div className={styles.overlay}>
              <p className={styles.subtitle}>Playlist • Spotify</p>
              <h2 className={styles.songTitle}>{song.trackName}</h2>
              <p className={styles.artistName}>{song.artistName}</p>
              <button className={styles.playBtn}>▶</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LongTracks;