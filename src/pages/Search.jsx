import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import Sidebar from "../components/Sidebar";

function Search() {
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);

    const { playSong, addToQueue, toggleLike, likedSongs } = useMusic();

  const songs = [
    // 1. Podcasts (10 items)
    { title: "The Joe Rogan Experience", artist: "Joe Rogan", category: "Podcasts", isPodcast: true },
    { title: "Call Her Daddy", artist: "Alex Cooper", category: "Podcasts", isPodcast: true },
    { title: "Crime Junkie", artist: "audiochuck", category: "Podcasts", isPodcast: true },
    { title: "Huberman Lab", artist: "Andrew Huberman", category: "Podcasts", isPodcast: true },
    { title: "The Daily", artist: "The New York Times", category: "Podcasts", isPodcast: true },
    { title: "Lex Fridman Podcast", artist: "Lex Fridman", category: "Podcasts", isPodcast: true },
    { title: "SmartLess", artist: "Jason Bateman, Sean Hayes", category: "Podcasts", isPodcast: true },
    { title: "Stuff You Should Know", artist: "iHeartPodcasts", category: "Podcasts", isPodcast: true },
    { title: "TED Radio Hour", artist: "NPR", category: "Podcasts", isPodcast: true },
    { title: "On Purpose", artist: "Jay Shetty", category: "Podcasts", isPodcast: true },

    // 2. Live Events (10 items)
    { title: "Tomorrowland 2024", artist: "Various Artists", category: "Live Events" },
    { title: "Coachella Music Festival", artist: "Various Artists", category: "Live Events" },
    { title: "Glastonbury Hits", artist: "Various Artists", category: "Live Events" },
    { title: "Lollapalooza Chicago", artist: "Various Artists", category: "Live Events" },
    { title: "Rolling Loud Miami", artist: "Various Artists", category: "Live Events" },
    { title: "Ultra Music Festival", artist: "Various Artists", category: "Live Events" },
    { title: "EDC Las Vegas", artist: "Various Artists", category: "Live Events" },
    { title: "Creamfields UK", artist: "Various Artists", category: "Live Events" },
    { title: "Bonnaroo Highlights", artist: "Various Artists", category: "Live Events" },
    { title: "Stagecoach Live", artist: "Various Artists", category: "Live Events" },

    // 3. Made For You (10 items)
    { title: "Your Daily Mix 1", artist: "Spotify", category: "Made For You" },
    { title: "Your Daily Mix 2", artist: "Spotify", category: "Made For You" },
    { title: "Your Daily Mix 3", artist: "Spotify", category: "Made For You" },
    { title: "Discover Weekly", artist: "Spotify", category: "Made For You" },
    { title: "Release Radar", artist: "Spotify", category: "Made For You" },
    { title: "On Repeat", artist: "Spotify", category: "Made For You" },
    { title: "Time Capsule", artist: "Spotify", category: "Made For You" },
    { title: "Repeat Rewind", artist: "Spotify", category: "Made For You" },
    { title: "Your Summer Rewind", artist: "Spotify", category: "Made For You" },
    { title: "Spotify Wrapped Hits", artist: "Spotify", category: "Made For You" },

    // 4. New Releases (10 items)
    { title: "Is It Over Now?", artist: "Taylor Swift", category: "New Releases" },
    { title: "Lovin On Me", artist: "Jack Harlow", category: "New Releases" },
    { title: "Water", artist: "Tyla", category: "New Releases" },
    { title: "Paint The Town Red", artist: "Doja Cat", category: "New Releases" },
    { title: "Greedy", artist: "Tate McRae", category: "New Releases" },
    { title: "Strangers", artist: "Kenya Grace", category: "New Releases" },
    { title: "My Love Mine All Mine", artist: "Mitski", category: "New Releases" },
    { title: "Dance The Night", artist: "Dua Lipa", category: "New Releases" },
    { title: "Vampire", artist: "Olivia Rodrigo", category: "New Releases" },
    { title: "What Was I Made For?", artist: "Billie Eilish", category: "New Releases" },

    // 5. Hindi (10 items)
    { title: "Kesariya", artist: "Arijit Singh", category: "Hindi" },
    { title: "Tum Hi Ho", artist: "Arijit Singh", category: "Hindi" },
    { title: "Chaleya", artist: "Arijit Singh, Shilpa Rao", category: "Hindi" },
    { title: "Jhoome Jo Pathaan", artist: "Arijit Singh", category: "Hindi" },
    { title: "Kabira", artist: "Tochi Raina", category: "Hindi" },
    { title: "Raabta", artist: "Arijit Singh", category: "Hindi" },
    { title: "Apna Bana Le", artist: "Arijit Singh", category: "Hindi" },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", category: "Hindi" },
    { title: "Agar Tum Saath Ho", artist: "Arijit Singh", category: "Hindi" },
    { title: "Kalank", artist: "Arijit Singh", category: "Hindi" },

    // 6. Punjabi (10 items)
    { title: "Brown Munde", artist: "AP Dhillon", category: "Punjabi" },
    { title: "Excuses", artist: "AP Dhillon", category: "Punjabi" },
    { title: "Lemonade", artist: "Diljit Dosanjh", category: "Punjabi" },
    { title: "Lover", artist: "Diljit Dosanjh", category: "Punjabi" },
    { title: "Levels", artist: "Sidhu Moose Wala", category: "Punjabi" },
    { title: "Summer High", artist: "AP Dhillon", category: "Punjabi" },
    { title: "No Love", artist: "Shubh", category: "Punjabi" },
    { title: "We Rollin", artist: "Shubh", category: "Punjabi" },
    { title: "295", artist: "Sidhu Moose Wala", category: "Punjabi" },
    { title: "Pasoori", artist: "Ali Sethi, Shae Gill", category: "Punjabi" },

    // 7. Tamil (10 items)
    { title: "Hukum", artist: "Anirudh Ravichander", category: "Tamil" },
    { title: "Naa Ready", artist: "Thalapathy Vijay", category: "Tamil" },
    { title: "Kavalayya", artist: "Shilpa Rao", category: "Tamil" },
    { title: "Arabic Kuthu", artist: "Anirudh Ravichander", category: "Tamil" },
    { title: "Vathi Coming", artist: "Anirudh Ravichander", category: "Tamil" },
    { title: "Rowdy Baby", artist: "Dhanush", category: "Tamil" },
    { title: "Why This Kolaveri Di", artist: "Dhanush", category: "Tamil" },
    { title: "Enjoy Enjaami", artist: "Dhee", category: "Tamil" },
    { title: "Chila Chila", artist: "Anirudh Ravichander", category: "Tamil" },
    { title: "Ranjithame", artist: "Thalapathy Vijay", category: "Tamil" },

    // 8. Telugu (10 items)
    { title: "Oo Antava", artist: "Indravathi Chauhan", category: "Telugu" },
    { title: "Naatu Naatu", artist: "Kala Bhairava", category: "Telugu" },
    { title: "Butta Bomma", artist: "Armaan Malik", category: "Telugu" },
    { title: "Samajavaragamana", artist: "Sid Sriram", category: "Telugu" },
    { title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni", category: "Telugu" },
    { title: "Srivalli", artist: "Sid Sriram", category: "Telugu" },
    { title: "Inkem Inkem", artist: "Sid Sriram", category: "Telugu" },
    { title: "Saranga Dariya", artist: "Mangli", category: "Telugu" },
    { title: "Nuvvunte Naa Jathaga", artist: "Sid Sriram", category: "Telugu" },
    { title: "Vachindamma", artist: "Sid Sriram", category: "Telugu" },

    // 9. Charts (10 items)
    { title: "Top 50 - Global", artist: "Spotify", category: "Charts" },
    { title: "Top 50 - USA", artist: "Spotify", category: "Charts" },
    { title: "Viral 50 - Global", artist: "Spotify", category: "Charts" },
    { title: "Top 50 - India", artist: "Spotify", category: "Charts" },
    { title: "Hot Hits India", artist: "Spotify", category: "Charts" },
    { title: "Top 50 - UK", artist: "Spotify", category: "Charts" },
    { title: "Today's Top Hits", artist: "Spotify", category: "Charts" },
    { title: "Mega Hit Mix", artist: "Spotify", category: "Charts" },
    { title: "Viral 50 - India", artist: "Spotify", category: "Charts" },
    { title: "Top 50 - Canada", artist: "Spotify", category: "Charts" },

    // 10. Pop (10 items)
    { title: "Blinding Lights", artist: "The Weeknd", category: "Pop" },
    { title: "Shape of You", artist: "Ed Sheeran", category: "Pop" },
    { title: "Someone You Loved", artist: "Lewis Capaldi", category: "Pop" },
    { title: "Dance Monkey", artist: "Tones And I", category: "Pop" },
    { title: "As It Was", artist: "Harry Styles", category: "Pop" },
    { title: "Stay", artist: "The Kid LAROI", category: "Pop" },
    { title: "Levitating", artist: "Dua Lipa", category: "Pop" },
    { title: "Don't Start Now", artist: "Dua Lipa", category: "Pop" },
    { title: "Watermelon Sugar", artist: "Harry Styles", category: "Pop" },
    { title: "Bad Guy", artist: "Billie Eilish", category: "Pop" },

    // 11. Indie (10 items)
    { title: "Sweater Weather", artist: "The Neighbourhood", category: "Indie" },
    { title: "Take Me to Church", artist: "Hozier", category: "Indie" },
    { title: "Creep", artist: "Radiohead", category: "Indie" },
    { title: "Do I Wanna Know?", artist: "Arctic Monkeys", category: "Indie" },
    { title: "Daddy Issues", artist: "The Neighbourhood", category: "Indie" },
    { title: "Riptide", artist: "Vance Joy", category: "Indie" },
    { title: "Pumped Up Kicks", artist: "Foster The People", category: "Indie" },
    { title: "Ho Hey", artist: "The Lumineers", category: "Indie" },
    { title: "Somebody That I Used To Know", artist: "Gotye", category: "Indie" },
    { title: "Kids", artist: "MGMT", category: "Indie" },

    // 12. Trending (10 items)
    { title: "Cruel Summer", artist: "Taylor Swift", category: "Trending" },
    { title: "Kill Bill", artist: "SZA", category: "Trending" },
    { title: "Boy's a Liar Pt. 2", artist: "PinkPantheress", category: "Trending" },
    { title: "Flowers", artist: "Miley Cyrus", category: "Trending" },
    { title: "Anti-Hero", artist: "Taylor Swift", category: "Trending" },
    { title: "Unholy", artist: "Sam Smith", category: "Trending" },
    { title: "Rich Flex", artist: "Drake", category: "Trending" },
    { title: "Escapism.", artist: "RAYE", category: "Trending" },
    { title: "Calm Down", artist: "Rema", category: "Trending" },
    { title: "Pink Venom", artist: "BLACKPINK", category: "Trending" },

    // 13. Romance (10 items)
    { title: "All of Me", artist: "John Legend", category: "Romance" },
    { title: "Perfect", artist: "Ed Sheeran", category: "Romance" },
    { title: "Just The Way You Are", artist: "Bruno Mars", category: "Romance" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", category: "Romance" },
    { title: "Let Me Love You", artist: "DJ Snake", category: "Romance" },
    { title: "A Thousand Years", artist: "Christina Perri", category: "Romance" },
    { title: "Say You Won't Let Go", artist: "James Arthur", category: "Romance" },
    { title: "You Are The Reason", artist: "Calum Scott", category: "Romance" },
    { title: "Make You Feel My Love", artist: "Adele", category: "Romance" },
    { title: "Photograph", artist: "Ed Sheeran", category: "Romance" },

    // 14. Discover (10 items)
    { title: "New Music Friday", artist: "Spotify", category: "Discover" },
    { title: "Discover Weekly", artist: "Spotify", category: "Discover" },
    { title: "Fresh Finds", artist: "Spotify", category: "Discover" },
    { title: "Radar Global", artist: "Spotify", category: "Discover" },
    { title: "Tastebreakers", artist: "Spotify", category: "Discover" },
    { title: "Indie Mix", artist: "Spotify", category: "Discover" },
    { title: "Chill Vibes", artist: "Spotify", category: "Discover" },
    { title: "Acoustic Covers", artist: "Spotify", category: "Discover" },
    { title: "Jazz Vibes", artist: "Spotify", category: "Discover" },
    { title: "Lofi Beats", artist: "Spotify", category: "Discover" },

    // 15. Mood (10 items)
    { title: "Happy Hits", artist: "Spotify", category: "Mood" },
    { title: "Sad Covers", artist: "Spotify", category: "Mood" },
    { title: "Deep Focus", artist: "Spotify", category: "Mood" },
    { title: "Chillout Lounge", artist: "Spotify", category: "Mood" },
    { title: "Peaceful Piano", artist: "Spotify", category: "Mood" },
    { title: "Songs to Sing in the Shower", artist: "Spotify", category: "Mood" },
    { title: "Confidence Boost", artist: "Spotify", category: "Mood" },
    { title: "Alone Time", artist: "Spotify", category: "Mood" },
    { title: "Late Night Drive", artist: "Spotify", category: "Mood" },
    { title: "Good Vibes", artist: "Spotify", category: "Mood" },

    // 16. Party (10 items)
    { title: "Party Hits", artist: "Spotify", category: "Party" },
    { title: "Dance Party", artist: "Spotify", category: "Party" },
    { title: "Friday Night", artist: "Spotify", category: "Party" },
    { title: "Throwback Party", artist: "Spotify", category: "Party" },
    { title: "House Party", artist: "Spotify", category: "Party" },
    { title: "Pre-Game", artist: "Spotify", category: "Party" },
    { title: "Club Mix", artist: "Spotify", category: "Party" },
    { title: "EDM Classics", artist: "Spotify", category: "Party" },
    { title: "Hip-Hop Party", artist: "Spotify", category: "Party" },
    { title: "Latin Party", artist: "Spotify", category: "Party" }
  ];

  const browseCategories = [
    { name: "Podcasts", color: "#E13300" },
    { name: "Live Events", color: "#7358FF" },
    { name: "Made For You", color: "#1E3264" },
    { name: "New Releases", color: "#E8115B" },
    { name: "Hindi", color: "#E1118C" },
    { name: "Punjabi", color: "#B3A2A8" },
    { name: "Tamil", color: "#A5673F" },
    { name: "Telugu", color: "#777777" },
    { name: "Charts", color: "#8D67AB" },
    { name: "Pop", color: "#148A08" },
    { name: "Indie", color: "#E1118C" },
    { name: "Trending", color: "#B02897" },
    { name: "Romance", color: "#8C1932" },
    { name: "Discover", color: "#8D67AB" },
    { name: "Mood", color: "#E1118C" },
    { name: "Party", color: "#537AA1" }
  ];

  useEffect(() => {
try {
      const data = localStorage.getItem("spotify_playlist");
      if (data && data !== "undefined") setPlaylist(JSON.parse(data));
    } catch(e) {
      console.error(e);
    }
  }, []);

  const addToPlaylist = (song) => {
    const exists = playlist.some(
      (s) => s.title === song.title && s.artist === song.artist
    );
    if (exists) return;

    const updated = [...playlist, { ...song, id: Date.now() }];
    setPlaylist(updated);
    localStorage.setItem("spotify_playlist", JSON.stringify(updated));
  };

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
       
        <div className="topbar">
          <div className="topbarLeft">
            <div className="searchContainer">
              <svg aria-hidden="true" className="searchIcon" viewBox="0 0 24 24" data-encore-id="icon">
                <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
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
            <Link to="/signup" className="signupBtn">Sign up</Link>
            <Link to="/login" className="loginBtn">Log in</Link>
          </div>
        </div>

        <div className="container">
{search !== "" ? (
            <div className="searchSection">
              <h2 className="sectionTitle">Songs</h2>
              <div className="songsList">
                {filtered.map((song, i) => {
                  const isAdded = playlist.some(
                      (p) => p.title === song.title && p.artist === song.artist
                  );

                  return (
                   <div key={i} className="card" onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
                      <div className="songInfo">
                        <img src={`https://picsum.photos/seed/${encodeURIComponent(song.title)}/64/64`} alt={song.title} className="songImage" />
                        <div className="songText">
                          <p className="title">{song.title}</p>
                          <p className="artist">{song.artist}</p>
                        </div>
                      </div>

                                            <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                        <button className="like-btn" onClick={() => toggleLike(song)}>
                          {likedSongs.some(s => s.title === song.title) ? '❤️' : '🤍'}
                        </button>
                        <button
                          className="btn primary"
                          onClick={() => addToPlaylist(song)}
                          disabled={isAdded}
                          style={{ marginLeft: '10px' }}
                        >
                          {isAdded ? "✔ Playlist" : "+ Playlist"}
                        </button>
                        <button
                          className="btn primary"
                          onClick={() => addToQueue(song)}
                          style={{ marginLeft: '10px' }}
                        >
                          + Queue
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeCategory ? (
            <div className="categorySection">
              <div className="categoryHeader" style={{ backgroundColor: browseCategories.find(c => c.name === activeCategory)?.color || '#333' }}>
                <button className="backBtn" onClick={() => setActiveCategory(null)}>← Back</button>
                <h1>{activeCategory}</h1>
              </div>
              
              <div className="songsList">
                {songs.filter(s => s.category === activeCategory).map((song, i) => {
                  const isAdded = playlist.some(
                    (p) => p.title === song.title && p.artist === song.artist
                  );

                  return (
                    <div key={i} className="card" onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
                      <div className="songInfo">
                        <img 
                          src={`https://picsum.photos/seed/${encodeURIComponent(song.title)}/64/64`} 
                          alt={song.title} 
                          className="songImage" 
                          style={song.isPodcast ? { borderRadius: '8px' } : {}}
                        />
                        <div className="songText">
                          <p className="title">{song.title}</p>
                          <p className="artist">{song.artist}</p>
                        </div>
                      </div>

                      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                        <button className="like-btn" onClick={() => toggleLike(song)}>
                          {likedSongs.some(s => s.title === song.title) ? '❤️' : '🤍'}
                        </button>
                        <button
                          className="btn primary"
                          onClick={() => addToPlaylist(song)}
                          disabled={isAdded}
                          style={{ marginLeft: '10px' }}
                        >
                          {isAdded ? "✔ Playlist" : "+ Playlist"}
                        </button>
                        <button
                          className="btn primary"
                          onClick={() => addToQueue(song)}
                          style={{ marginLeft: '10px' }}
                        >
                          + Queue
                        </button>
                      </div>
                    </div>
                  );
                })}
                {songs.filter(s => s.category === activeCategory).length === 0 && (
                  <p style={{ color: '#b3b3b3', marginTop: '20px' }}>No items found in this category.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="browseSection">
              <h2 className="sectionTitle">Browse all</h2>
              <div className="browseGrid">
                {browseCategories.map((cat, i) => (
                  <div key={i} className="browseCard" style={{ backgroundColor: cat.color }} onClick={() => setActiveCategory(cat.name)}>
                    <span className="browseTitle">{cat.name}</span>
                    <img src={`https://picsum.photos/seed/${encodeURIComponent(cat.name)}/100/100`} className="browseImage" alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;