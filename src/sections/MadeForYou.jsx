import React, { useState, useEffect } from 'react';
import styles from './MadeForYou.module.css';

const MOODS = [
  { label: 'Chill Vibes' },
  { label: 'Party Mode' },
  { label: 'Focus Deep' },
  { label: 'Morning Boost' },
  { label: 'Sad Hours' },
  { label: 'Desi Hits' },
];

function MadeForYou() {
  const [allCovers, setAllCovers] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=trending&entity=song&limit=24")
      .then(res => res.json())
      .then(data => {
        const images = (data.results || []).map(s =>
          s.artworkUrl100.replace("100x100", "200x200")
        );
        setAllCovers(images);
      })
      .catch(err => console.error("Fetch failed:", err));
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Made For You</h2>
        <span className={styles.showAll}>Show all</span>
      </div>

      <div className={styles.grid}>
        {MOODS.map((m, index) => {
          const start = index * 4;
          const moodCovers = allCovers.slice(start, start + 4);

          return (
            <div key={m.label} className={styles.card}>
              <div className={styles.imageGrid}>
                {moodCovers.map((url, i) => (
                  <img key={i} src={url} alt="" className={styles.miniCover} />
                ))}
              </div>
              <p className={styles.cardLabel}>{m.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MadeForYou;