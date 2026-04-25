import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import Footer from "../components/Footer";

const browseCategories = [
  { label: "Music", color: "#e91e8c", searchTerm: "top hits", route: "/music" },
  { label: "Podcasts", color: "#006450", searchTerm: "podcast music", route: "/podcasts" },
  { label: "Live Events", color: "#8400e7", searchTerm: "live concert", route: "/live-events" },
];

const allCategories = [
  { label: "Made For You", color: "#1e3264", searchTerm: "pop mix playlist", route: "/made-for-you" },
  { label: "New Releases", color: "#608108", searchTerm: "new music 2024", route: null },
  { label: "Summer", color: "#1f6b35", searchTerm: "summer hits", route: null },
  { label: "Hindi", color: "#e8115b", searchTerm: "hindi bollywood", route: null },
  { label: "Tamil", color: "#ba5d07", searchTerm: "tamil kollywood", route: null },
  { label: "Charts", color: "#8d67ab", searchTerm: "top songs global", route: null },
  { label: "Podcast Charts", color: "#2d46b9", searchTerm: "podcast charts", route: null },
  { label: "Podcast New Releases", color: "#c87d55", searchTerm: "new podcast", route: null },
  { label: "Video Podcasts", color: "#c62828", searchTerm: "video show", route: null },
  { label: "Business & Technology", color: "#1e7a3e", searchTerm: "business tech", route: null },
  { label: "Pop", color: "#5179a1", searchTerm: "pop music", route: null },
  { label: "Punjabi", color: "#9c27b0", searchTerm: "punjabi music", route: null },
  { label: "Hip-Hop", color: "#1a1a2e", searchTerm: "hip hop rap", route: null },
  { label: "Romance", color: "#c2185b", searchTerm: "romantic love songs", route: null },
  { label: "Workout", color: "#d84315", searchTerm: "workout gym music", route: null },
  { label: "Party", color: "#f57f17", searchTerm: "party dance music", route: null },
];

function useCategoryImages(searchTerm) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchTerm
      )}&media=music&entity=song&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.results
          .filter((item) => item.artworkUrl100)
          .slice(0, 2)
          .map((item) => item.artworkUrl100.replace("100x100bb", "200x200bb"));
        setImages(imgs);
      })
      .catch(() => setImages([]));
  }, [searchTerm]);

  return images;
}

function BrowseCard({ label, color, searchTerm, large, route }) {
  const images = useCategoryImages(searchTerm);
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) navigate(route);
  };

  return (
    <div
      className={`browse-card ${large ? "browse-card-large" : ""}`}
      style={{ backgroundColor: color, cursor: route ? "pointer" : "default" }}
      onClick={handleClick}
    >
      <span className="browse-card-label">{label}</span>
      <div className="browse-card-images">
        {images[1] && (
          <img src={images[1]} alt="" className="browse-card-img browse-card-img-back" />
        )}
        {images[0] && (
          <img src={images[0]} alt="" className="browse-card-img browse-card-img-front" />
        )}
      </div>
    </div>
  );
}

function Search({ search, setSearch }) {
  const location = useLocation();
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const { playSong, addToQueue, toggleLike, likedSongs } = useMusic();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    if (query) {
    setSearch(query);
  } else {
    setSearch("");
  }
  }, [location.search]);

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
          audio: item.previewUrl,
          duration: item.trackTimeMillis,
        }));
        setSongs(formatted);
      })
      .catch((err) => console.error(err));
  }, [search]);

  const addToPlaylist = (song) => {
    const exists = playlist.some(
      (s) => s.title === song.title && s.artist === song.artist
    );
    if (exists) return;
    const updated = [...playlist, { ...song, id: Date.now() }];
    setPlaylist(updated);
    localStorage.setItem("spotify_playlist", JSON.stringify(updated));
  };

  return (



    <div className="main">


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
                    (p) => p.title === song.title && p.artist === song.artist
                  );
                  return (
                    <div
                      key={i}
                      className="card"
                      onClick={() => playSong(song)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="songInfo">
                        <img src={song.image} alt={song.title} className="songImage" />
                        <div className="songText">
                          <p className="title">{song.title}</p>
                          <p className="artist">{song.artist}</p>
                        </div>
                      </div>
                      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                        <button className="like-btn" onClick={() => toggleLike(song)}>
                          {likedSongs.some((s) => s.title === song.title) ? "❤️" : "🤍"}
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
            <h2 className="sectionTitle">Start browsing</h2>
            <div className="browse-grid browse-grid-top">
              {browseCategories.map((cat) => (
                <BrowseCard key={cat.label} {...cat} large />
              ))}
            </div>
          
            <h2 className="sectionTitle" style={{ marginTop: "32px" }}>Browse all</h2>
            <div className="browse-grid">
              {allCategories.map((cat) => (
                <BrowseCard key={cat.label} {...cat} />
              ))}
            </div>
          </div>
        )}
      </div>
        <Footer />


      <style>{`
        .browseSection { padding-bottom: 48px; }

        .browse-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 8px;
        }

        .browse-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .browse-card {
          position: relative;
          border-radius: 8px;
          padding: 16px;
          height: 120px;
          overflow: hidden;
          transition: transform 0.15s ease, filter 0.15s ease;
          display: flex;
          align-items: flex-start;
        }

        .browse-card-large { height: 160px; }

        .browse-card:hover {
          transform: scale(1.03);
          filter: brightness(1.1);
        }

        .browse-card-label {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          z-index: 2;
          max-width: 52%;
          word-break: break-word;
          position: relative;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .browse-card-large .browse-card-label { font-size: 20px; }

        .browse-card-images {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 120px;
          height: 120px;
          pointer-events: none;
        }

        .browse-card-large .browse-card-images { width: 150px; height: 150px; }

        .browse-card-img {
          position: absolute;
          width: 75px;
          height: 75px;
          border-radius: 4px;
          object-fit: cover;
          box-shadow: -3px 3px 14px rgba(0,0,0,0.55);
        }

        .browse-card-large .browse-card-img { width: 100px; height: 100px; }

        .browse-card-img-back {
          bottom: 14px;
          right: 40px;
          transform: rotate(-18deg);
          z-index: 1;
          opacity: 0.88;
        }

        .browse-card-img-front {
          bottom: 6px;
          right: 8px;
          transform: rotate(22deg);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .browse-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
          .browse-grid-top,
          .browse-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}

export default Search;
