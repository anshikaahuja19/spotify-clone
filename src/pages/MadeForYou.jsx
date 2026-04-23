import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

/* ─── Static playlist data ─────────────────────────────── */
const uniquelyYours = [
  {
    id: "daylist",
    title: "daylist",
    subtitle: "Your day in a playlist.",
    gradient: "linear-gradient(135deg, #b490ca 0%, #e8a87c 50%, #f6c94e 100%)",
    label: "daylist",
  },
  {
    id: "on-repeat",
    title: "On Repeat",
    subtitle: "Songs you love right now",
    bg: "#1f3087",
    icon: "on-repeat",
  },
  {
    id: "repeat-rewind",
    title: "Repeat Rewind",
    subtitle: "Your past favourites",
    bg: "#1f3087",
    icon: "repeat-rewind",
  },
];

const watchSection = [
  {
    id: "videos-for-you",
    title: "Videos For You",
    subtitle: "Discover music videos and live performance...",
    bg: "#000",
    icon: "videos",
  },
  {
    id: "concerts-near-you",
    title: "Concerts Near You",
    subtitle: "Find artists touring near you, for you....",
    bg: "#1a3a8f",
    icon: "concerts",
  },
];

const blends = [
  {
    id: "create",
    title: "Create a Blend",
    subtitle: "",
    bg: "#5a9e52",
    icon: "create",
  },
  {
    id: "blend-1",
    title: "Kanika+Anshika",
    subtitle: "A Blend of music for Kanika and Anshika...",
    bg: "#1a2a4a",
    icon: "blend-blue",
  },
  {
    id: "blend-2",
    title: "Kanika + Unnati",
    subtitle: "A Blend of music for Kanika and Unnati....",
    bg: "#2a1a0a",
    icon: "blend-orange",
  },
];

/* ─── Card artwork renderers ────────────────────────────── */
function DaylistArt() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #b490ca 0%, #e8a87c 50%, #f6c94e 100%)",
      borderRadius: "6px",
      display: "flex", alignItems: "flex-end", padding: "12px",
      position: "relative",
    }}>
      <SpotifyDot />
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: 1.1 }}>daylist</span>
    </div>
  );
}

function OnRepeatArt() {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#1f3087",
      borderRadius: "6px", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative",
    }}>
      <SpotifyDot />
      <svg viewBox="0 0 80 50" width="72%" fill="none">
        <path d="M20 25 C20 14 29 6 40 6 C51 6 60 14 60 25" stroke="#e91e8c" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M20 25 C20 36 29 44 40 44 C51 44 60 36 60 25" stroke="#e91e8c" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="25" r="5" fill="#e91e8c"/>
        <circle cx="60" cy="25" r="5" fill="#e91e8c"/>
      </svg>
      <div style={{ position: "absolute", bottom: "12px", left: "12px", color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>
        On<br/>Repeat
      </div>
    </div>
  );
}

function RepeatRewindArt() {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#1f3087",
      borderRadius: "6px", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative",
    }}>
      <SpotifyDot />
      <svg viewBox="0 0 90 55" width="80%" fill="none">
        <path d="M55 10 L25 28 L55 46 Z" fill="#e91e8c"/>
        <path d="M75 10 L45 28 L75 46 Z" fill="#e91e8c"/>
        <rect x="12" y="10" width="8" height="36" rx="2" fill="#e91e8c"/>
      </svg>
      <div style={{ position: "absolute", bottom: "12px", left: "12px", color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>
        Repeat<br/>Rewind
      </div>
    </div>
  );
}

function VideosArt() {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#111",
      borderRadius: "6px", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <SpotifyDot />
      <div style={{
        background: "#e91e8c", transform: "rotate(-8deg)",
        padding: "8px 14px", borderRadius: "4px",
        color: "#fff", fontWeight: 900, fontSize: "17px",
        textAlign: "center", lineHeight: 1.2, letterSpacing: "-0.5px",
      }}>
        VIDEOS<br/>FOR YOU
      </div>
    </div>
  );
}

function ConcertsArt() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #1a3a8f 0%, #3a6abf 60%, #6a9adf 100%)",
      borderRadius: "6px", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <SpotifyDot />
      {/* Stage lights */}
      <div style={{ position: "absolute", top: 0, left: "30%", width: "4px", height: "60%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
        transform: "rotate(-15deg)", transformOrigin: "top center" }} />
      <div style={{ position: "absolute", top: 0, left: "55%", width: "3px", height: "55%",
        background: "linear-gradient(to bottom, rgba(255,200,200,0.7), transparent)",
        transform: "rotate(10deg)", transformOrigin: "top center" }} />
      <div style={{ position: "absolute", bottom: "18px", left: "14px", color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>
        Concerts<br/>Near You
      </div>
    </div>
  );
}

function CreateBlendArt() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #5a9e52, #4caf50)",
      borderRadius: "6px", display: "flex", alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "50%",
        border: "3px solid #fff", display: "flex",
        alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: "28px", fontWeight: 300,
      }}>+</div>
    </div>
  );
}

function BlendArt({ colors }) {
  const [c1, c2] = colors;
  return (
    <div style={{
      width: "100%", height: "100%", background: "#1a2030",
      borderRadius: "6px", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <SpotifyDot />
      <div style={{ position: "relative", width: "80px", height: "60px" }}>
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          width: "44px", height: "44px", borderRadius: "50%",
          background: c1, opacity: 0.9,
        }} />
        <div style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          width: "44px", height: "44px", borderRadius: "50%",
          background: c2, opacity: 0.9,
        }} />
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "12px", color: "#fff", fontWeight: 700, fontSize: "14px" }}>
        Blend
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
        background: c1,
      }} />
    </div>
  );
}

function SpotifyDot() {
  return (
    <div style={{
      position: "absolute", top: "10px", left: "10px",
      width: "22px", height: "22px", borderRadius: "50%",
      background: "#000", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 2,
    }}>
      <svg viewBox="0 0 16 16" width="14" height="14" fill="#1db954">
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.7 11.5c-.2.3-.5.4-.8.2-2.2-1.3-4.9-1.6-8.1-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.5-.8 6.5-.5 8.9 1 .4.2.5.5.3.8zm1-2.3c-.2.3-.6.5-1 .2-2.5-1.5-6.3-2-9.3-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.4-1 7.6-.5 10.4 1.2.4.2.5.7.3 1.1zm.1-2.4C10.2 5.2 5.8 5 3 5.8c-.5.1-.9-.2-1-.6-.1-.5.2-.9.6-1C5.8 3.3 10.7 3.5 14 5.5c.4.2.5.7.3 1.1-.3.3-.8.5-1.2.2z"/>
      </svg>
    </div>
  );
}

/* ─── Section Card ──────────────────────────────────────── */
function PlaylistCard({ item, artComponent, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mfy-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="mfy-card-art" style={{ position: "relative" }}>
        {artComponent}
        {hovered && (
          <button className="mfy-play-btn" onClick={(e) => { e.stopPropagation(); }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#000">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        )}
      </div>
      <p className="mfy-card-title">{item.title}</p>
      {item.subtitle && <p className="mfy-card-subtitle">{item.subtitle}</p>}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function MadeForYou() {
  const navigate = useNavigate();
  const { playSong } = useMusic();

  return (
    <div className="app">

      <div className="main" style={{ overflowY: "auto" }}>
        {/* Hero */}
        <div className="mfy-hero">
          <h1 className="mfy-hero-title">Made For You</h1>
        </div>

        <div className="mfy-content">
          {/* Uniquely Yours */}
          <section className="mfy-section">
            <h2 className="mfy-section-heading">Uniquely yours</h2>
            <div className="mfy-row">
              <PlaylistCard item={uniquelyYours[0]} artComponent={<DaylistArt />} />
              <PlaylistCard item={uniquelyYours[1]} artComponent={<OnRepeatArt />} />
              <PlaylistCard item={uniquelyYours[2]} artComponent={<RepeatRewindArt />} />
            </div>
          </section>

          {/* Watch What You Love */}
          <section className="mfy-section">
            <h2 className="mfy-section-heading">Watch What You Love</h2>
            <div className="mfy-row">
              <PlaylistCard item={watchSection[0]} artComponent={<VideosArt />} />
              <PlaylistCard item={watchSection[1]} artComponent={<ConcertsArt />} />
            </div>
          </section>

          {/* Made For Us */}
          <section className="mfy-section">
            <h2 className="mfy-section-heading">Made For Us</h2>
            <div className="mfy-row">
              <PlaylistCard item={blends[0]} artComponent={<CreateBlendArt />} />
              <PlaylistCard
                item={blends[1]}
                artComponent={<BlendArt colors={["#1565c0", "#42a5f5"]} />}
              />
              <PlaylistCard
                item={blends[2]}
                artComponent={<BlendArt colors={["#e65100", "#ffd600"]} />}
              />
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .mfy-hero {
          background: #121212;
          padding: 80px 32px 40px;
        }

        .mfy-hero-title {
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
          margin: 0;
        }

        .mfy-content {
          padding: 0 32px 64px;
          background: #121212;
        }

        .mfy-section {
          margin-bottom: 40px;
        }

        .mfy-section-heading {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 18px 0;
        }

        .mfy-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .mfy-card {
          width: 180px;
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }

        .mfy-card:hover {
          transform: translateY(-2px);
        }

        .mfy-card-art {
          width: 180px;
          height: 180px;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }

        .mfy-card-art > * {
          width: 100%;
          height: 100%;
        }

        .mfy-play-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1db954;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: transform 0.1s ease, background 0.1s ease;
          animation: popIn 0.15s ease;
        }

        .mfy-play-btn:hover {
          transform: scale(1.08);
          background: #1ed760;
        }

        @keyframes popIn {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .mfy-card-title {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mfy-card-subtitle {
          color: #b3b3b3;
          font-size: 13px;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
