import React from 'react';
import { useMusic } from '../context/MusicContext';

function Player() {

  const { currentSong, isPlaying, progress, togglePlay, playNext, playPrevious, toggleLike, likedSongs } = useMusic();

  if (!currentSong) return null;

  const isLiked = likedSongs.some(s => s.title === currentSong.title);

  return (
    <div className="player-container">
      <audio
        src={currentSong?.audio}
        autoPlay
      />
      <div className="player-left">
        <img
          src={currentSong.image || `https://picsum.photos/seed/${encodeURIComponent(currentSong.title)}/64/64`}
          alt={currentSong.title}
          className="player-cover"
        />
        <div className="player-info">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
        <button className="like-btn" onClick={() => toggleLike(currentSong)}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" onClick={playPrevious}>⏮</button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn" onClick={playNext}>⏭</button>
        </div>
        <div className="player-progress">
          <span className="time">0:00</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="time">3:00</span>
        </div>
      </div>

      <div className="player-right">
        <span>🎧</span>
        <div className="volume-bar">
          <div className="volume-fill"></div>
        </div>
      </div>
    </div>
  );
}

export default Player;