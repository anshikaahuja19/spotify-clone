import React, { useState, useEffect } from "react";


const CONCERT_DATA = [
  {
    name: "Darshan Raval",
    venue: "Pethkar Grounds, Pune",
    month: "May",
    day: "10",
    searchTerm: "Darshan Raval",
    genre: "Bollywood",
  },
  {
    name: "Armaan Malik",
    venue: "Mayfield Eva Garden, Pune",
    month: "May",
    day: "31",
    searchTerm: "Armaan Malik",
    genre: "Bollywood",
  },
  {
    name: "Nucleya",
    venue: "Shivaji Stadium, Pune",
    month: "Apr",
    day: "27",
    searchTerm: "Nucleya bass",
    genre: "Electronic",
  },
  {
    name: "Prateek Kuhad",
    venue: "Blue Frog, Pune",
    month: "May",
    day: "3",
    searchTerm: "Prateek Kuhad",
    genre: "Indie",
  },
];

const POPULAR_DATA = [
  { name: "Arijit Singh Live", month: "Jan", searchTerm: "arijit singh" },
  { name: "Neha Kakkar Tour", month: "Apr", searchTerm: "neha kakkar" },
  { name: "Sunidhi Chauhan", month: "Apr", searchTerm: "sunidhi chauhan" },
  { name: "A.R. Rahman", month: "Apr", searchTerm: "ar rahman concert" },
  { name: "Badshah Live", month: "Apr", searchTerm: "badshah rapper" },
  { name: "Dua Lipa", month: "May", searchTerm: "dua lipa" },
  { name: "Ed Sheeran", month: "May", searchTerm: "ed sheeran" },
  { name: "Coldplay", month: "May", searchTerm: "coldplay band" },
];

const VENUES_DATA = [
  {
    name: "antiSOCIAL",
    bgColor: "#e8a020",
    artists: "Garvit - Priyansh, Romain Garcia, Janisht...",
    searches: ["indie rock band", "electronic dj set", "jazz live"],
  },
  {
    name: "National Centre for Performing Arts",
    bgColor: "#4a90d9",
    artists: "Bhuwin, Shujaat Khan, Anurag Naidu and more",
    searches: ["classical music india", "hindustani vocal", "sitar concert"],
  },
];

const WEEKEND_DATA = [
  { name: "Glory To God India", venue: "Pune", month: "Apr", day: "24", events: "3 events", searchTerm: "gospel choir india", bgColor: "#1a3a5c" },
  { name: "Gajendra Pratap Singh", venue: "Raipur", month: "Apr", day: "24", events: null, searchTerm: "Gajendra Pratap Singh" },
  { name: "Sarvesh Mishra Gul Saxena", venue: "Pune", month: "Apr", day: "24", events: null, searchTerm: "Ram Naam bhajan" },
  { name: "Gul Saxena", venue: "Ram Ganesh Gadkari...", month: "Apr", day: "24", events: null, searchTerm: "Gul Saxena singer" },
  { name: "W.i.S.H.", venue: "Apple BKC, Mumbai", month: "Apr", day: "24", events: null, searchTerm: "kpop girl group" },
  { name: "Asha Bhosle", venue: "Kashinath Ghanekar...", month: "Apr", day: "25", events: null, searchTerm: "Asha Bhosle" },
  { name: "Bhuwin", venue: "National Centre for...", month: "Apr", day: "25", events: null, searchTerm: "Bhuwin singer" },
  { name: "Aditya Gadhvi", venue: "Pune", month: "Apr", day: "25", events: "2 events", searchTerm: "Aditya Gadhvi folk" },
];

function useMultipleImages(searches) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!searches?.length) return;
    Promise.all(
      searches.slice(0, 3).map((term) =>
        fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            term
          )}&media=music&entity=song&limit=5`
        )
          .then((r) => r.json())
          .then((data) => {
            const item = data.results.find((i) => i.artworkUrl100);
            return item ? item.artworkUrl100.replace("100x100bb", "200x200bb") : null;
          })
          .catch(() => null)
      )
    ).then((imgs) => setImages(imgs.filter(Boolean)));
  }, []);
  return images;
}

function VenueCard({ venue }) {
  const images = useMultipleImages(venue.searches);
  return (
    <div style={styles.venueCard}>
      <div style={{ ...styles.venueImgBox, background: venue.bgColor }}>
        <span style={styles.venueBadge}>VENUE</span>
        <div style={styles.venueCircles}>
          {images.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{
                ...styles.venueCircleImg,
                width: i === 1 ? 70 : 55,
                height: i === 1 ? 70 : 55,
                zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
                left: i === 0 ? "10%" : i === 1 ? "30%" : "55%",
                top: i === 1 ? "18%" : "28%",
              }}
            />
          ))}
        </div>
        <p style={styles.venueName}>{venue.name}</p>
      </div>
      <p style={styles.venueArtists}>{venue.artists}</p>
    </div>
  );
}

function WeekendCard({ item }) {
  const img = useArtistImage(item.searchTerm);
  return (
    <div style={styles.weekendCard}>
      <div style={styles.weekendImgWrap}>
        {img ? (
          <img src={img} alt={item.name} style={styles.weekendImg} />
        ) : (
          <div style={{ ...styles.weekendImg, background: item.bgColor || "#2a2a2a" }} />
        )}
        {item.month && (
          <div style={styles.weekendBadge}>
            <span style={styles.dateBadgeMonth}>{item.month}</span>
            <span style={styles.dateBadgeDay}>{item.day}</span>
          </div>
        )}
      </div>
      <p style={styles.weekendName}>{item.name}</p>
      <p style={styles.weekendVenue}>
        {item.venue}
        {item.events && ` • ${item.events}`}
      </p>
    </div>
  );
}

function useArtistImage(searchTerm) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!searchTerm) return;
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchTerm
      )}&media=music&entity=song&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.results
          .filter((item) => item.artworkUrl100)
          .slice(0, 1)
          .map((item) => item.artworkUrl100.replace("100x100bb", "300x300bb"));
        if (imgs[0]) setImage(imgs[0]);
      })
      .catch(() => {});
  }, [searchTerm]);
  return image;
}

function ConcertCard({ artist }) {
  const img = useArtistImage(artist.searchTerm);

  return (
    <div style={styles.concertCard}>
      <div style={styles.concertImgWrap}>
        {img ? (
          <img src={img} alt={artist.name} style={styles.concertImg} />
        ) : (
          <div style={{ ...styles.concertImg, background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 32, color: "#999" }}>🎵</span>
          </div>
        )}
        <div style={styles.dateBadge}>
          <span style={styles.dateBadgeMonth}>{artist.month}</span>
          <span style={styles.dateBadgeDay}>{artist.day}</span>
        </div>
      </div>
      <div style={styles.concertInfo}>
        <p style={styles.concertName}>{artist.name}</p>
        <p style={styles.concertVenue}>{artist.venue}</p>
      </div>
    </div>
  );
}

function PopularCard({ item }) {
  const img = useArtistImage(item.searchTerm);
  return (
    <div style={styles.popularCard}>
      <div style={styles.popularImgWrap}>
        {img ? (
          <img src={img} alt={item.name} style={styles.popularImg} />
        ) : (
          <div style={{ ...styles.popularImg, background: "#2a2a2a" }} />
        )}
        <div style={{ ...styles.dateBadge, top: 6, left: 6, padding: "3px 6px" }}>
          <span style={{ ...styles.dateBadgeMonth, fontSize: 9 }}>{item.month}</span>
        </div>
      </div>
      <p style={styles.popularName}>{item.name}</p>
    </div>
  );
}

function LiveEvents() {
  const [activeFilter, setActiveFilter] = useState("All genres");
  const [locationSet, setLocationSet] = useState(false);
  const [activeTime, setActiveTime] = useState(null);

  const filters = ["This weekend", "Next weekend"];
  const genres = ["All genres", "Bollywood", "Electronic", "Indie", "Pop", "Hip-Hop"];

  return (
    <div className="app">
      <div className="main" style={{ overflowY: "auto", background: "#121212" }}>
        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.heroOverlay} />
          <h1 style={styles.heroTitle}>Live Events</h1>
        </div>

        {/* FILTER CHIPS */}
        <div style={styles.filterBar}>
          <button style={styles.locationChip}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Pune
          </button>

          <button style={styles.calendarChip}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5 }}>
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
            Select dates
          </button>

          {filters.map((f) => (
            <button
              key={f}
              style={activeTime === f ? styles.activeChip : styles.chip}
              onClick={() => setActiveTime(activeTime === f ? null : f)}
            >
              {f}
            </button>
          ))}

          {genres.map((g) => (
            <button
              key={g}
              style={activeFilter === g ? styles.activeChip : styles.chip}
              onClick={() => setActiveFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {/* SET LOCATION PROMPT */}
          {!locationSet && (
            <div style={styles.locationPrompt}>
              <p style={styles.locationTitle}>Set your location</p>
              <p style={styles.locationSub}>Setting a location lets us show you the best concerts around you.</p>
              <button style={styles.chooseLocationBtn} onClick={() => setLocationSet(true)}>
                Choose location
              </button>
            </div>
          )}

          {/* VENUES WE THINK YOU'LL LIKE */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Venues we think you'll like</h2>
            <div style={styles.venueRow}>
              {VENUES_DATA.map((v) => (
                <VenueCard key={v.name} venue={v} />
              ))}
            </div>
          </div>

          {/* STREAM IT NOW */}
          <div style={styles.section}>
            <p style={styles.sectionMeta}>Updates every Wednesday, personalised for you.</p>
            <h2 style={styles.sectionTitle}>Stream it now, enjoy it live</h2>
            <div style={styles.playlistBanner}>
              <div style={styles.playlistCover}>
                <div style={styles.playlistSpotifyDot} />
                <p style={styles.playlistCoverText}>{"Concerts\nNear You"}</p>
              </div>
              <div style={styles.playlistInfo}>
                <p style={styles.playlistLabel}>Playlist</p>
                <p style={styles.playlistName}>Concerts Near You</p>
                <p style={styles.playlistDesc}>{"Find artists touring near you, for you.\nUpdates every Wednesday."}</p>
                <div style={styles.playlistActions}>
                  <button style={styles.playBtn}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#000">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button style={styles.addBtn}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ON THIS WEEKEND */}
          <div style={styles.section}>
            <p style={styles.sectionMeta}>Updates every Thursday</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>On this weekend</h2>
              <button style={styles.showAllBtn}>Show all</button>
            </div>
            <div style={styles.weekendRow}>
              {WEEKEND_DATA.map((item) => (
                <WeekendCard key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* JUST FOR YOU */}
          <div style={styles.section}>
            <p style={styles.sectionMeta}>Concerts we think you'll like</p>
            <h2 style={styles.sectionTitle}>Just for you</h2>
            <div style={styles.concertRow}>
              {CONCERT_DATA.filter((a) =>
                activeFilter === "All genres" ? true : a.genre === activeFilter
              ).map((artist) => (
                <ConcertCard key={artist.name} artist={artist} />
              ))}
            </div>
          </div>

          {/* POPULAR IN PUNE */}
          <div style={styles.section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={styles.sectionMeta}>What's trending right now</p>
                <h2 style={styles.sectionTitle}>Popular in Pune</h2>
              </div>
              <button style={styles.showAllBtn}>Show all</button>
            </div>
            <div style={styles.popularRow}>
              {POPULAR_DATA.map((item) => (
                <PopularCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .app { display: flex; height: 100vh; }
        .main { flex: 1; overflow-y: auto; }
      `}</style>
    </div>
  );
}

const styles = {
  hero: {
    position: "relative",
    height: 280,
    background: "linear-gradient(135deg, #5b3fb5 0%, #7b5cc5 40%, #9b7de0 100%)",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 24px 32px",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 40%, rgba(18,18,18,0.5) 100%)",
  },
  heroTitle: {
    position: "relative",
    fontSize: 64,
    fontWeight: 900,
    color: "#fff",
    margin: 0,
    letterSpacing: "-2px",
    lineHeight: 1,
    zIndex: 1,
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "20px 24px",
    flexWrap: "wrap",
    background: "#121212",
  },
  chip: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 20,
    color: "#fff",
    fontSize: 13,
    padding: "6px 16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.15s",
  },
  activeChip: {
    background: "#fff",
    border: "1px solid #fff",
    borderRadius: 20,
    color: "#000",
    fontSize: 13,
    fontWeight: 700,
    padding: "6px 16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  locationChip: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 20,
    color: "#fff",
    fontSize: 13,
    padding: "6px 14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  calendarChip: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 20,
    color: "#fff",
    fontSize: 13,
    padding: "6px 14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  content: {
    padding: "0 24px 48px",
  },
  locationPrompt: {
    textAlign: "center",
    padding: "32px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 32,
  },
  locationTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 8px",
  },
  locationSub: {
    color: "#b3b3b3",
    fontSize: 14,
    margin: "0 0 20px",
  },
  chooseLocationBtn: {
    background: "#1db954",
    color: "#000",
    border: "none",
    borderRadius: 24,
    padding: "12px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  section: {
    marginBottom: 40,
  },
  sectionMeta: {
    color: "#b3b3b3",
    fontSize: 12,
    margin: "0 0 4px",
    textTransform: "none",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    margin: "0 0 20px",
  },
  concertRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  concertCard: {
    width: 160,
    cursor: "pointer",
  },
  concertImgWrap: {
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  concertImg: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    display: "block",
  },
  dateBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    background: "rgba(0,0,0,0.75)",
    borderRadius: 4,
    padding: "4px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1.1,
  },
  dateBadgeMonth: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  dateBadgeDay: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
  },
  concertInfo: {},
  concertName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    margin: "0 0 4px",
  },
  concertVenue: {
    color: "#b3b3b3",
    fontSize: 12,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  popularRow: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 8,
  },
  popularCard: {
    flexShrink: 0,
    width: 140,
    cursor: "pointer",
  },
  popularImgWrap: {
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  popularImg: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    display: "block",
  },
  popularName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  showAllBtn: {
    background: "transparent",
    border: "none",
    color: "#b3b3b3",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "underline",
  },
  venueRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  venueCard: {
    width: 200,
    cursor: "pointer",
  },
  venueImgBox: {
    borderRadius: 8,
    height: 180,
    position: "relative",
    overflow: "hidden",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 12,
  },
  venueBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: "1px",
    padding: "3px 7px",
    borderRadius: 3,
  },
  venueCircles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 40,
  },
  venueCircleImg: {
    position: "absolute",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.3)",
  },
  venueName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    position: "relative",
    zIndex: 5,
    textShadow: "0 1px 4px rgba(0,0,0,0.7)",
  },
  venueArtists: {
    color: "#b3b3b3",
    fontSize: 12,
    margin: 0,
  },
  playlistBanner: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    background: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    maxWidth: 520,
  },
  playlistCover: {
    width: 160,
    height: 160,
    flexShrink: 0,
    background: "linear-gradient(135deg, #1a237e 0%, #5c35c9 60%, #7b52d4 100%)",
    borderRadius: 6,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 12,
    overflow: "hidden",
  },
  playlistSpotifyDot: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#1db954",
  },
  playlistCoverText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 900,
    margin: 0,
    lineHeight: 1.15,
    whiteSpace: "pre-line",
  },
  playlistInfo: {
    flex: 1,
  },
  playlistLabel: {
    color: "#b3b3b3",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    margin: "0 0 4px",
    textTransform: "uppercase",
  },
  playlistName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 8px",
  },
  playlistDesc: {
    color: "#b3b3b3",
    fontSize: 13,
    margin: "0 0 16px",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
  },
  playlistActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#1db954",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.4)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  weekendRow: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 8,
  },
  weekendCard: {
    flexShrink: 0,
    width: 150,
    cursor: "pointer",
  },
  weekendImgWrap: {
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  weekendImg: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    display: "block",
  },
  weekendBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    background: "rgba(0,0,0,0.75)",
    borderRadius: 4,
    padding: "3px 7px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1.1,
  },
  weekendName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    margin: "0 0 3px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  weekendVenue: {
    color: "#b3b3b3",
    fontSize: 11,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

export default LiveEvents;