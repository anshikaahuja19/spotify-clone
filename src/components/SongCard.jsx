import React from 'react';

function SongCard({ song }) {
  // Use the data passed from Home.jsx
  return (
    <div className="musicCard">
      <div className="cover">
        <img 
          src={song?.img || "https://picsum.photos/seed/spotify/200"} 
          alt={song?.title} 
          style={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }}
        />
      </div>
      <p className="title">{song?.title || "Untitled"}</p>
      <p className="artist">{song?.artist || "Unknown Artist"}</p>
    </div>
  );
}

export default SongCard;