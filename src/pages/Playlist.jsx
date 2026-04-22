import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useMusic } from "../context/MusicContext";

function Playlist() {
  const { playSong } = useMusic();
  const [playlist, setPlaylist] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

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

        <div className="topbar">
          {isLoggedIn && user ? (
            <div className="profileIcon">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          ) : (
            <>
              <Link to="/signup" className="signupBtn">Sign up</Link>
              <Link to="/login" className="loginBtn">Log in</Link>
            </>
          )}
        </div>
        <div className="playlistHeader">
          <div className="playlistCover">❤️</div>

          <div>
            <p className="playlistType">Public Playlist</p>
            <h1 className="playlistTitle">My Playlist</h1>
            <p className="playlistMeta">
              {user?.name || "User"} • {playlist.length} songs
            </p>
          </div>
        </div>
        <div className="playlistActions">
          <button className="playBtn">▶</button>
          <input
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search in playlist..."
          />
        </div>
        <div className="songRow header">
          <span>#</span>
          <span>Title</span>
          <span>Artist</span>
          <span></span>
        </div>

        {filtered.map((song, index) => (
          <div
            key={song.id}
            className="songRow"
            onClick={() => playSong(song)}
          >
            <span className="index">{index + 1}</span>
            <button
              className="rowPlayBtn"
              onClick={() => playSong(song)}
            >
              ▶
            </button>
            <div className="songInfo">
              <img
                src={
                  song.image ||
                  `https://picsum.photos/seed/${encodeURIComponent(song.title)}/60/60`
                }
                alt={song.title}
                className="songImage"
              />


              <div>
                <p className="title">{song.title}</p>
                <p className="artist">{song.artist}</p>
              </div>
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

  );
}

export default Playlist;