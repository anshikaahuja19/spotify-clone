import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

const ITUNES = "https://itunes.apple.com/search?media=music&entity=song&";

const genres = [
  { label: "Pop", color: "#5179a1", term: "pop music" },
  { label: "Hip-Hop", color: "#1a1a2e", term: "hip hop" },
  { label: "Bollywood", color: "#e8115b", term: "hindi bollywood" },
  { label: "Tamil", color: "#ba5d07", term: "tamil hits" },
  { label: "Punjabi", color: "#9c27b0", term: "punjabi songs" },
  { label: "Romance", color: "#c2185b", term: "romantic songs" },
  { label: "Workout", color: "#d84315", term: "workout music" },
  { label: "Party", color: "#f57f17", term: "party hits" },
];

function useFetch(term, limit = 8) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${ITUNES}term=${encodeURIComponent(term)}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) =>
        setItems(
          (d.results || [])
            .filter((i) => i.artworkUrl100 && i.trackName)
            .slice(0, limit)
        )
      )
      .catch(() => {});
  }, [term, limit]);
  return items;
}

function SongCard({ item, onClick }) {
  const img = (item.artworkUrl100 || "").replace("100x100bb", "300x300bb");
  return (
    <div className="music-card" onClick={() => onClick && onClick(item)}>
      <div className="music-card-img-wrap">
        <img src={img} alt={item.trackName} />
        <div className="play-btn">
          <svg viewBox="0 0 24 24" fill="#000" width="18" height="18">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <p className="music-card-name">{item.trackName}</p>
      <p className="music-card-sub">{item.artistName}</p>
    </div>
  );
}

function GenreCard({ label, color, term }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch(`${ITUNES}term=${encodeURIComponent(term)}&limit=3`)
      .then((r) => r.json())
      .then((d) => {
        const item = (d.results || []).find((i) => i.artworkUrl100);
        if (item) setImg(item.artworkUrl100.replace("100x100bb", "200x200bb"));
      })
      .catch(() => {});
  }, [term]);

  return (
    <div
      className="genre-card"
      style={{ background: color }}
      onClick={() => navigate(`/search?q=${encodeURIComponent(label)}`)}
    >
      <span className="genre-label">{label}</span>
      {img && <img src={img} className="genre-thumb" alt="" />}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="music-card">
      <div className="music-card-img-wrap skeleton-box" />
      <div className="skeleton-text" style={{ width: "70%" }} />
      <div className="skeleton-text" style={{ width: "50%" }} />
    </div>
  );
}

export default function Music() {
  const { playSong } = useMusic();
  const discover = useFetch("new music india friday", 3);
  const editors = useFetch("hindi bollywood hits", 8);
  const hot = useFetch("top hits 2025", 8);

  return (
    <div className="app">
      <div className="main music-page">

        {/* HERO */}
        <div className="music-hero">
          <h1 className="music-hero-title">Music</h1>
        </div>
        <div className="music-fade-bar" />

        <div className="music-content">

          {/* DISCOVER */}
          <h2 className="music-section-title">Discover new music</h2>
          <div className="music-scroll-row">
            {discover.length === 0
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
              : discover.map((item, i) => (
                  <SongCard key={i} item={item} onClick={playSong} />
                ))}
          </div>

          {/* EDITORS */}
          <h2 className="music-section-title">Playlists from our editors</h2>
          <div className="music-scroll-row">
            {editors.length === 0
              ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
              : editors.map((item, i) => (
                  <SongCard key={i} item={item} onClick={playSong} />
                ))}
          </div>

          {/* HOT NOW */}
          <h2 className="music-section-title">Hot right now</h2>
          <div className="music-scroll-row">
            {hot.length === 0
              ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
              : hot.map((item, i) => (
                  <SongCard key={i} item={item} onClick={playSong} />
                ))}
          </div>

          {/* GENRES */}
          <h2 className="music-section-title">Browse by genre</h2>
          <div className="genre-grid">
            {genres.map((g) => (
              <GenreCard key={g.label} {...g} />
            ))}
          </div>

        </div>

        <style>{`
          .music-page { overflow-y: auto; }

          .music-hero {
            background: linear-gradient(135deg, #c0186a 0%, #8a0050 40%, #3a003a 100%);
            padding: 48px 32px 40px;
            position: relative;
            overflow: hidden;
          }
          .music-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 80% 50%, rgba(255,60,120,0.18), transparent 70%);
          }
          .music-hero-title {
            font-size: 72px;
            font-weight: 900;
            letter-spacing: -2px;
            color: #fff;
            position: relative;
            z-index: 1;
            line-height: 1;
          }

          .music-fade-bar {
            height: 72px;
            background: linear-gradient(to bottom, #3a003a, #121212);
          }

          .music-content { padding: 0 28px 64px; }

          .music-section-title {
            font-size: 22px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 16px;
            letter-spacing: -0.3px;
          }

          /* SCROLL ROW */
          .music-scroll-row {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
            margin-bottom: 36px;
          }
          .music-scroll-row::-webkit-scrollbar { display: none; }

          /* ALL CARDS — fixed identical size */
          .music-card {
            flex: 0 0 160px;
            width: 160px;
            box-sizing: border-box;
            background: #181818;
            border-radius: 8px;
            padding: 12px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .music-card:hover { background: #282828; }

          /* IMAGE — fixed square, same for every card */
          .music-card-img-wrap {
            width: 136px;
            height: 136px;
            border-radius: 4px;
            overflow: hidden;
            background: #333;
            margin-bottom: 10px;
            position: relative;
            flex-shrink: 0;
          }
          .music-card-img-wrap img {
            width: 136px;
            height: 136px;
            object-fit: cover;
            display: block;
          }

          .music-card-name {
            font-size: 13px;
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 4px;
          }
          .music-card-sub {
            font-size: 11px;
            color: #b3b3b3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* PLAY BUTTON */
          .play-btn {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 38px;
            height: 38px;
            background: #1db954;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateY(4px);
            transition: opacity 0.2s, transform 0.2s;
            box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          }
          .music-card-img-wrap:hover .play-btn { opacity: 1; transform: translateY(0); }

          /* GENRE GRID */
          .genre-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 40px;
          }
          .genre-card {
            border-radius: 8px;
            padding: 18px 14px;
            height: 90px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: flex-start;
            transition: filter 0.2s, transform 0.15s;
          }
          .genre-card:hover { filter: brightness(1.12); transform: scale(1.02); }
          .genre-label {
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 1px 6px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
          }
          .genre-thumb {
            position: absolute;
            bottom: -4px;
            right: -4px;
            width: 62px;
            height: 62px;
            border-radius: 4px;
            object-fit: cover;
            transform: rotate(22deg);
            box-shadow: -3px 3px 12px rgba(0,0,0,0.55);
            z-index: 1;
          }

          /* SKELETONS */
          .skeleton-box {
            background: linear-gradient(90deg,#282828 25%,#333 50%,#282828 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
          }
          .skeleton-text {
            height: 12px;
            border-radius: 4px;
            margin-bottom: 6px;
            background: linear-gradient(90deg,#282828 25%,#333 50%,#282828 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
          }
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          @media (max-width: 900px) {
            .genre-grid { grid-template-columns: repeat(3, 1fr); }
            .music-hero-title { font-size: 52px; }
          }
          @media (max-width: 600px) {
            .genre-grid { grid-template-columns: repeat(2, 1fr); }
          }
        `}</style>
      </div>
    </div>
  );
}