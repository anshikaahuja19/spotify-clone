import React, { useState, useEffect } from 'react';
import styles from './MadeForYou.module.css';

const MOODS = [
  { label: 'Chill Vibes',   term: 'lofi chill' },
  { label: 'Party Mode',    term: 'party dance' },
  { label: 'Focus Deep',    term: 'focus' },
  { label: 'Morning Boost', term: 'happy pop' },
  { label: 'Sad Hours',     term: 'sad hits' },
  { label: 'Desi Hits',     term: 'bollywood' },
];

function MoodCard({ mood }) {
  const [covers, setCovers] = useState([]);

  useEffect(() => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(mood.term)}&entity=song&limit=4`)
      .then(res => res.json())
      .then(data => {
        const images = (data.results || []).map(s => s.artworkUrl100.replace('100x100', '200x200'));
        setCovers(images);
      });
  }, [mood.term]);

  return (
    <div className={styles.card}>
      <div className={styles.imageGrid}>
        {covers.map((url, i) => (
          <img key={i} src={url} alt="" className={styles.miniCover} />
        ))}
      </div>
      <p className={styles.cardLabel}>{mood.label}</p>
    </div>
  );
}

function MadeForYou() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Made For You</h2>
        <span className={styles.showAll}>Show all</span>
      </div>
      <div className={styles.grid}>
        {MOODS.map(m => <MoodCard key={m.label} mood={m} />)}
      </div>
    </div>
  );
}

export default MadeForYou;