import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import TopNav from "../components/TopNav.jsx";

import RecentlyPlayed from "../sections/RecentlyPlayed.jsx";
import FeaturedCharts from "../sections/FeaturedCharts.jsx";
import MadeForYou from "../sections/MadeForYou.jsx";
import LongTracks from "../sections/LongTracks.jsx";

import styles from "./Home.module.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  // 🔍 Search state
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // 🎯 Fetch search results
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        search
      )}&media=music&entity=song&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.results || []).map((item) => ({
          title: item.trackName,
          artist: item.artistName,
          image: item.artworkUrl100,
          audio: item.previewUrl
        }));
        setResults(formatted);
      })
      .catch((err) => console.error(err));
  }, [search]);


  const [activeFilter, setActiveFilter] = useState("All");

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={styles.homeContainer}>
      <Sidebar />

      <div className={styles.mainView}>

        <TopNav search={search} setSearch={setSearch} />


        {search && (
          <div className={styles.searchDropdown}>
            {results.length === 0 ? (
              <p className={styles.noResult}>No results found</p>
            ) : (
              results.map((song, i) => (
                <div
                  key={i}
                  className={styles.searchItem}
                  onClick={() => navigate(`/search?q=${search}`)}
                >
                  <img src={song.image} alt={song.title} />
                  <div className={styles.searchText}>
                    <p className={styles.songTitle}>{song.title}</p>
                    <span className={styles.songArtist}>
                      {song.artist}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className={styles.filters}>
          {["All", "Music", "Podcasts"].map((f) => (
            <button
              key={f}
              className={activeFilter === f ? styles.active : ""}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>


        <h1 className={styles.sectionTitle}>
          {user?.name ? `${getGreeting()}, ${user.name}` : getGreeting()}
        </h1>


        <div className={styles.quickGrid}>
          <div
            className={styles.quickCard}
            onClick={() => navigate("/playlist")}
          >
            <i className="fa-regular fa-bookmark"></i>
            <p>Your Playlist</p>
          </div>

          <div
            className={styles.quickCard}
            onClick={() => navigate("/search")}
          >
            <i className="fa-solid fa-heart"></i>
            <p>Favorites</p>
          </div>

          <div
            className={styles.quickCard}
            onClick={() => navigate("/search")}
          >
            <i className="fa-solid fa-headphones"></i>
            <p>Your Queue</p>
          </div>

          <div className={styles.quickCard}>
            <i className="fa-solid fa-music"></i>
            <p>Recently Played</p>
          </div>

          <div className={styles.quickCard}>
            <i className="fa-solid fa-star"></i>
            <p>Top Hits</p>
          </div>

          <div className={styles.quickCard}>
            <i className="fa-solid fa-clock"></i>
            <p>Watch Later</p>
          </div>
        </div>


        <RecentlyPlayed />
        <MadeForYou />
        <FeaturedCharts />



        <LongTracks />

        <div style={{ height: "40px" }} />

      </div>
    </div>
  );
}

export default Home;