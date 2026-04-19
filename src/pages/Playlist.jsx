import React, { useState, useEffect } from "react";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [search, setSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem("spotify_playlist");
    if (data) {
      setPlaylist(JSON.parse(data));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("spotify_playlist", JSON.stringify(playlist));
  }, [playlist]);

  // Remove song
  const removeSong = (id) => {
    const updated = playlist.filter((song) => song.id !== id);
    setPlaylist(updated);
  };

  // Simple search filter
  const filteredSongs = playlist.filter((song) => {
    return (
      (song.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (song.artist || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>My Playlist</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      />

      {/* Empty state */}
      {playlist.length === 0 ? (
        <p>No songs in playlist</p>
      ) : filteredSongs.length === 0 ? (
        <p>No matching songs</p>
      ) : (
        <ul>
          {filteredSongs.map((song) => (
            <li key={song.id} style={{ marginBottom: "10px" }}>
              <strong>{song.title}</strong> - {song.artist}
              <button
                onClick={() => removeSong(song.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlist;