import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);

  const songs = [
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Perfect", artist: "Ed Sheeran" },
  ];

  useEffect(() => {
    const data = localStorage.getItem("spotify_playlist");
    if (data) setPlaylist(JSON.parse(data));
  }, []);

  const addToPlaylist = (song) => {
    const exists = playlist.some(
      (s) => s.title === song.title && s.artist === song.artist
    );
    if (exists) return;

    const updated = [...playlist, { ...song, id: Date.now() }];
    setPlaylist(updated);
    localStorage.setItem("spotify_playlist", JSON.stringify(updated));
  };

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="main">
       
        <div className="topbar">
          <Link to="/signup" className="signupBtn">Sign up</Link>
          <Link to="/login" className="loginBtn">Log in</Link>
        </div>

        <div className="container">
          <h1>Search</h1>

          <input
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search songs..."
          />

          {filtered.map((song, i) => {
            const isAdded = playlist.some(
              (s) => s.title === song.title && s.artist === song.artist
            );

            return (
              <div key={i} className="card">
                <div>
                  <p className="title">{song.title}</p>
                  <p className="artist">{song.artist}</p>
                </div>

                <button
                  className="btn primary"
                  disabled={isAdded}
                  onClick={() => addToPlaylist(song)}
                >
                  {isAdded ? "Added ✔" : "+ Add"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;