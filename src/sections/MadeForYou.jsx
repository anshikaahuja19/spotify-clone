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
  const fetchWithRetry = (retries = 3) => {
    const itunesUrl = `https://itunes.apple.com/search?term=trending&entity=song&limit=24`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(itunesUrl)}`;

    fetch(proxyUrl)
      .then(res => {
        if (!res.ok) throw new Error('Proxy Busy'); // Catch 500 or 429 errors
        return res.json();
      })
      .then(data => {
        const parsed = JSON.parse(data.contents);
        const images = (parsed.results || []).map(s => s.artworkUrl100.replace('100x100', '200x200'));
        setAllCovers(images);
      })
      .catch(err => {
        if (retries > 0) {
          console.log(`Retry attempt: ${4 - retries}`);
          setTimeout(() => fetchWithRetry(retries - 1), 1500); // Wait 1.5s then try again
        } else {
          console.error("All retries failed:", err);
        }
      });
  };

  fetchWithRetry();
}, []);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Made For You</h2>
        <span className={styles.showAll}>Show all</span>
      </div>
      <div className={styles.grid}>
        {MOODS.map((m, index) => {
          // Distribute 4 images to each card from the single fetch result
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