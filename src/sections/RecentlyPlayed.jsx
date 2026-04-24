import React, { useState, useEffect } from 'react';
import styles from './RecentlyPlayed.module.css';

// Random artists list
const ARTISTS = [
  "taylor swift",
  "the weeknd",
  "drake",
  "billie eilish",
  "arijit singh",
  "armaan malik",
  "ed sheeran",
  "lofi beats"
];

function RecentlyPlayed() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // pick random artist
    const randomArtist =
      ARTISTS[Math.floor(Math.random() * ARTISTS.length)];

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      randomArtist
    )}&entity=song&limit=10`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // optional shuffle (makes it feel more random)
        const shuffled = (data.results || []).sort(
          () => 0.5 - Math.random()
        );

        setSongs(shuffled);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // high quality image
  const getHighResImage = (url) => {
    if (!url) return "";
    return url.replace("100x100", "300x300");
  };

  // loading UI
  if (loading) {
    return (
      <div className={styles.section}>
        <p style={{ color: "#a7a7a7" }}>Loading your music...</p>
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