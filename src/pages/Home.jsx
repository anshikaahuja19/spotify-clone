import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import SongCard from "../components/SongCard.jsx";
import styles from "./Home.module.css";
import TopNav from "../components/TopNav.jsx";
import navStyles from "../components/TopNav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [songs, setSongs] = useState([]);

const randomQueries = ["love", "party", "sad", "dance", "lofi", "rock"];

useEffect(() => {
  const random = randomQueries[Math.floor(Math.random() * randomQueries.length)];

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${random}`)
    .then(res => res.json())
    .then(data => {
      setSongs(data.data);
    });
}, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Temporary data for your grid
  const mySongs = [
    { id: 1, title: "Lofi Study", artist: "Chill Cow", img: "https://picsum.photos/seed/1/200" },
    { id: 2, title: "Rock Anthems", artist: "Various Artists", img: "https://picsum.photos/seed/2/200" },
    { id: 3, title: "Morning Coffee", artist: "Jazz Trio", img: "https://picsum.photos/seed/3/200" },
    { id: 4, title: "Focus Flow", artist: "Deep Ambient", img: "https://picsum.photos/seed/4/200" },
  ];

  return(<div>
    <div className={styles.homeContainer}>
  <Sidebar />

  <div className={styles.mainView}>
    <TopNav />

    <div className={styles.filters}>
      <button className={styles.active}>All</button>
      <button>Music</button>
      <button>Podcasts</button>
    </div>

    <h1 className={styles.sectionTitle}>Good Morning</h1>

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
{/* added more cards */}
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


  </div>
</div>
  </div>)
}

export default Home;