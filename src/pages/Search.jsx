import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([])
  const { playSong, addToQueue, toggleLike, likedSongs, recentSongs } = useMusic();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    setSearch(query);
  }, [location.search]);

  // Load playlist from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("spotify_playlist");
      if (data && data !== "undefined") {
        setPlaylist(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  // Fetch songs from iTunes API
  useEffect(() => {
    if (search === "") {
      setSongs([]);
      return;
    }

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        search
      )}&media=music&entity=song&limit=8`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((item) => ({
          title: item.trackName,
          artist: item.artistName,
          image: item.artworkUrl100,
        }));
        setSongs(formatted);
      })
      .catch((err) => console.error(err));
  }, [search]);
  // Add to playlist
  const addToPlaylist = (song) => {
    const exists = playlist.some(
      (s) => s.title === song.title && s.artist === song.artist
    );
    if (exists) return;

    const updated = [...playlist, { ...song, id: Date.now() }];
    setPlaylist(updated);
    localStorage.setItem("spotify_playlist", JSON.stringify(updated));
  };



  // const filtered = songs.filter((s) =>
  //   s.title.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbarLeft">
            <div className="searchContainer">
              <svg
                aria-hidden="true"
                className="searchIcon"
                viewBox="0 0 24 24"
              >
                <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" />
              </svg>

              <input
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What do you want to listen to?"
              />
            </div>
          </div>

          <div className="topbarRight">
            <Link to="/signup" className="signupBtn">
              Sign up
            </Link>
            <Link to="/login" className="loginBtn">
              Log in
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container">
          {search !== "" ? (
            <div className="searchSection">
              <h2 className="sectionTitle">Songs</h2>

              <div className="songsList">
                {songs.length === 0 ? (
                  <p style={{ color: "#b3b3b3" }}>No results found</p>
                ) : (
                  songs.map((song, i) => {
                    const isAdded = playlist.some(
                      (p) =>
                        p.title === song.title &&
                        p.artist === song.artist
                    );

                    return (
                      <div
                        key={i}
                        className="card"
                        onClick={() => playSong(song)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="songInfo">
                          <img
                            src={song.image}
                            alt={song.title}
                            className="songImage"
                          />

                          <div className="songText">
                            <p className="title">{song.title}</p>
                            <p className="artist">{song.artist}</p>
                          </div>
                        </div>

                        <div
                          className="card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="like-btn"
                            onClick={() => toggleLike(song)}
                          >
                            {likedSongs.some(
                              (s) => s.title === song.title
                            )
                              ? "❤️"
                              : "🤍"}
                          </button>

                          <button
                            className="btn primary"
                            onClick={() => addToPlaylist(song)}
                            disabled={isAdded}
                            style={{ marginLeft: "10px" }}
                          >
                            {isAdded ? "✔ Playlist" : "+ Playlist"}
                          </button>

                          <button
                            className="btn primary"
                            onClick={() => addToQueue(song)}
                            style={{ marginLeft: "10px" }}
                          >
                            + Queue
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="browseSection">
              <h2 className="sectionTitle">Start searching for songs</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;