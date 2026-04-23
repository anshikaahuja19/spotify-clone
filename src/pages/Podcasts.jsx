import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

const ITUNES = "https://itunes.apple.com/search?media=podcast&entity=podcastEpisode&";
const ITUNES_POD = "https://itunes.apple.com/search?media=podcast&entity=podcast&";

function usePodcastFetch(term, limit = 8) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${ITUNES}term=${encodeURIComponent(term)}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) =>
        setItems(
          (d.results || [])
            .filter((i) => i.artworkUrl160 || i.artworkUrl100)
            .slice(0, limit)
        )
      )
      .catch(() => {});
  }, [term, limit]);
  return items;
}

function usePodcastShowFetch(term, limit = 8) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${ITUNES_POD}term=${encodeURIComponent(term)}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) =>
        setItems(
          (d.results || [])
            .filter((i) => i.artworkUrl600 || i.artworkUrl100)
            .slice(0, limit)
        )
      )
      .catch(() => {});
  }, [term, limit]);
  return items;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatDuration(ms) {
  if (!ms) return "";
  const min = Math.round(ms / 60000);
  return `${min} min`;
}

function EpisodeCard({ item }) {
  const img = item.artworkUrl160 || item.artworkUrl100 || "";
  const title = item.trackName || item.collectionName || "";
  const date = formatDate(item.releaseDate);
  const duration = formatDuration(item.trackTimeMillis);
  const isLive = Math.random() > 0.5;

  return (
    <div className="episode-card">
      <div className="episode-img-wrap">
        <img src={img} alt={title} />
        <div className="play-btn">
          <svg viewBox="0 0 24 24" fill="#000" width="18" height="18">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <p className="episode-title">{title}</p>
      <p className="episode-meta">
        {isLive && <span className="live-dot" />}
        {date}{duration ? ` • ${duration}` : ""}
      </p>
    </div>
  );
}

function ShowCard({ item }) {
  const img = item.artworkUrl600 || item.artworkUrl100 || "";
  const name = item.collectionName || item.trackName || "";
  const author = item.artistName || "";
  return (
    <div className="show-card">
      <div className="show-img-wrap">
        <img src={img} alt={name} />
        <div className="play-btn">
          <svg viewBox="0 0 24 24" fill="#000" width="18" height="18">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <p className="music-card-name">{name}</p>
      <p className="music-card-sub">{author}</p>
    </div>
  );
}

function SkeletonEpisode() {
  return (
    <div className="episode-card">
      <div className="episode-img-wrap skeleton-box" />
      <div className="skeleton-text" style={{ width: "80%" }} />
      <div className="skeleton-text" style={{ width: "50%" }} />
    </div>
  );
}

function SkeletonShow() {
  return (
    <div className="show-card">
      <div className="show-img-wrap skeleton-box" />
      <div className="skeleton-text" style={{ width: "75%" }} />
      <div className="skeleton-text" style={{ width: "55%" }} />
    </div>
  );
}

const podcastCategories = [
  { label: "Comedy", color: "#e8a923", term: "comedy podcast india" },
  { label: "True Crime", color: "#1a1a2e", term: "true crime podcast" },
  { label: "Business", color: "#1e7a3e", term: "business startup podcast india" },
  { label: "Tech", color: "#1565c0", term: "technology podcast" },
  { label: "Sports", color: "#c62828", term: "sports podcast india cricket" },
  { label: "Health", color: "#6a1b9a", term: "health wellness podcast" },
  { label: "News", color: "#37474f", term: "news daily podcast india" },
  { label: "Education", color: "#2e7d32", term: "education learning podcast" },
];

function GenreCard({ label, color, term }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch(`${ITUNES_POD}term=${encodeURIComponent(term)}&limit=3`)
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
      onClick={() => navigate(`/search?q=${encodeURIComponent(label + " podcast")}`)}
    >
      <span className="genre-label">{label}</span>
      {img && <img src={img} className="genre-thumb" alt="" />}
    </div>
  );
}

export default function Podcasts() {
  const bestEpisodes = usePodcastFetch("india podcast best 2024", 5);
  const freshFinds = usePodcastShowFetch("india podcast new", 8);
  const trending = usePodcastShowFetch("trending india podcast hindi", 8);

  return (
    <div className="app">
      <div className="main podcast-page">

        {/* HERO */}
        <div className="podcast-hero">
          <h1 className="podcast-hero-title">Podcasts</h1>
        </div>
        <div className="podcast-fade-bar" />

        <div className="podcast-content">

          {/* BEST EPISODES */}
          <h2 className="podcast-section-title">Best episodes of the week</h2>
          <div className="episodes-row">
            {bestEpisodes.length === 0
              ? [0,1,2,3,4].map((i) => <SkeletonEpisode key={i} />)
              : bestEpisodes.map((item, i) => <EpisodeCard key={i} item={item} />)}
          </div>

          {/* FRESH FINDS */}
          <h2 className="podcast-section-title">Fresh Finds</h2>
          <div className="podcast-scroll-row">
            {freshFinds.length === 0
              ? [0,1,2,3,4,5,6,7].map((i) => <SkeletonShow key={i} />)
              : freshFinds.map((item, i) => <ShowCard key={i} item={item} />)}
          </div>

          {/* TRENDING */}
          <h2 className="podcast-section-title">Trending in India</h2>
          <div className="podcast-scroll-row">
            {trending.length === 0
              ? [0,1,2,3,4,5,6,7].map((i) => <SkeletonShow key={i} />)
              : trending.map((item, i) => <ShowCard key={i} item={item} />)}
          </div>

          {/* CATEGORIES */}
          <h2 className="podcast-section-title">Browse categories</h2>
          <div className="genre-grid">
            {podcastCategories.map((g) => (
              <GenreCard key={g.label} {...g} />
            ))}
          </div>

        </div>

        <style>{`
          .podcast-page { overflow-y: auto; }

          .podcast-hero {
            background: linear-gradient(135deg, #1a5c47 0%, #0d3d2e 40%, #071f18 100%);
            padding: 48px 32px 40px;
            position: relative;
            overflow: hidden;
          }
          .podcast-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 70% 40%, rgba(30,180,100,0.15), transparent 70%);
          }
          .podcast-hero-title {
            font-size: 72px;
            font-weight: 900;
            letter-spacing: -2px;
            color: #fff;
            position: relative;
            z-index: 1;
            line-height: 1;
          }

          .podcast-fade-bar {
            height: 72px;
            background: linear-gradient(to bottom, #071f18, #121212);
          }

          .podcast-content { padding: 0 28px 64px; }

          .podcast-section-title {
            font-size: 22px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 16px;
            letter-spacing: -0.3px;
          }

          /* EPISODES ROW */
          .episodes-row {
            display: flex;
            gap: 16px;
            margin-bottom: 36px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .episodes-row::-webkit-scrollbar { display: none; }

          .episode-card {
            flex: 0 0 160px;
            cursor: pointer;
          }
          .episode-card:hover .episode-title { color: #1db954; }

          .episode-img-wrap {
            width: 160px;
            height: 160px;
            border-radius: 6px;
            overflow: hidden;
            background: #282828;
            margin-bottom: 10px;
            position: relative;
          }
          .episode-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .episode-title {
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 4px;
            transition: color 0.2s;
          }
          .episode-meta {
            font-size: 11px;
            color: #b3b3b3;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .live-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #1db954;
            display: inline-block;
            flex-shrink: 0;
          }

          /* SCROLL ROW */
          .podcast-scroll-row {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
            margin-bottom: 36px;
          }
          .podcast-scroll-row::-webkit-scrollbar { display: none; }

          /* SHOW CARD */
          .show-card {
            flex: 0 0 160px;
            background: #181818;
            border-radius: 8px;
            padding: 14px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .show-card:hover { background: #282828; }

          .show-img-wrap {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 6px;
            overflow: hidden;
            background: #333;
            margin-bottom: 12px;
            position: relative;
          }
          .show-img-wrap img {
            width: 100%;
            height: 100%;
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
          .episode-img-wrap:hover .play-btn,
          .show-img-wrap:hover .play-btn { opacity: 1; transform: translateY(0); }

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
            width: 100%;
            aspect-ratio: 1;
            border-radius: 6px;
            background: linear-gradient(90deg,#282828 25%,#333 50%,#282828 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            margin-bottom: 12px;
          }
          .episode-img-wrap.skeleton-box {
            width: 160px;
            height: 160px;
            aspect-ratio: unset;
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
            .podcast-hero-title { font-size: 52px; }
          }
          @media (max-width: 600px) {
            .genre-grid { grid-template-columns: repeat(2, 1fr); }
            .podcast-hero-title { font-size: 40px; }
          }
        `}</style>
      </div>
    </div>
  );
}