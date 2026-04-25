import React from 'react';
import { useMusic } from '../context/MusicContext';
import styles from "./Player.module.css";

function Player() {

  const { currentSong, isPlaying, progress, togglePlay, playNext, playPrevious, toggleLike, likedSongs } = useMusic();

  if (!currentSong) return null;

  const isLiked = likedSongs.some(s => s.title === currentSong.title);

  return (
    <div className={styles.playerContainer}>
      <audio
        src={currentSong?.audio}
        autoPlay
      />
      <div className={styles.playerLeft}>
        <img
          src={currentSong.image || `https://picsum.photos/seed/${encodeURIComponent(currentSong.title)}/64/64`}
          alt={currentSong.title}
          className={styles.playerCover}
        />
        <div className={styles.playerInfo}>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
        <button className="like-btn" onClick={() => toggleLike(currentSong)}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.playerCenter}>
        <div className={styles.playerControls}>
          <button className={styles.controlBtn} onClick={playPrevious}>⏮</button>
          <button className={styles.playBtn} onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className={styles.controlBtn} onClick={playNext}>⏭</button>
        </div>
        <div className={styles.playerProgress}>
          <span className={styles.time}>0:00</span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className="time">3:00</span>
        </div>
      </div>

      <div className={styles.playerRight}>
        <span>🎧</span>
        <div className={styles.volumeBar}>
          <div className={styles.volumeFill}></div>
        </div>
      </div>
    </div>
  );
}

export default Player;