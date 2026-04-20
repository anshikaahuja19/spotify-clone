import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("spotify_playlist");
      if (data && data !== "undefined") setPlaylist(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const removeSong = (id) => {
    const updated = playlist.filter((s) => s.id !== id);
    setPlaylist(updated);
    localStorage.setItem("spotify_playlist", JSON.stringify(updated));
  };

  const filtered = playlist.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
        <Sidebar />
      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <Link to="/signup" className="signupBtn">Sign up</Link>
          <Link to="/login" className="loginBtn">Log in</Link>
        </div>

        <div className="container">
          <h1>My Playlist</h1>

          <input
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search playlist..."
          />

          {filtered.map((song) => (
            <div key={song.id} className="card">
              <div>
                <p className="title">{song.title}</p>
                <p className="artist">{song.artist}</p>
              </div>

              <button
                className="btn danger"
                onClick={() => removeSong(song.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;