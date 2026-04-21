import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import TopNav from "../components/TopNav.jsx";


import RecentlyPlayed from "../sections/RecentlyPlayed.jsx";
import FeaturedCharts from "../sections/FeaturedCharts.jsx";
import MadeForYou from "../sections/MadeForYou.jsx";

import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className={styles.homeContainer}>
      <Sidebar />

      <div className={styles.mainView}>
        <TopNav />

        {/* Filters */}
        <div className={styles.filters}>
          {['All', 'Music', 'Podcasts'].map(f => (
            <button
              key={f}
              className={activeFilter === f ? styles.active : ''}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Greeting */}
        <h1 className={styles.sectionTitle}>{getGreeting()}</h1>

        {/* Quick Cards */}
        <div className={styles.quickGrid}>
          <div className={styles.quickCard} onClick={() => navigate('/playlist')}>
            <i className="fa-regular fa-bookmark"></i>
            <p>Your Playlist</p>
          </div>
          <div className={styles.quickCard} onClick={() => navigate('/search')}>
            <i className="fa-solid fa-heart"></i>
            <p>Favorites</p>
          </div>
          <div className={styles.quickCard} onClick={() => navigate('/search')}>
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

        {/* SECTION 1 — Recently Played  */}
        <RecentlyPlayed />

        {/* SECTION 2 — Made For You  */}
        <MadeForYou />

        {/* SECTION 3 — Top Charts  */}
        <FeaturedCharts />

        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
}

export default Home;
