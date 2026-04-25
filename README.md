#  Spotify Clone

A full-featured Spotify-inspired music web app built with **React** and **Vite** — featuring a Spotify-style UI, playlist management, search, and authentication.

---

##  Live Demo

> Run locally at `http://localhost:5173`

---

##  Features

###  Home Page
- **Good Evening** — Personalized greeting section with quick-access cards
- **Recently Played** — Horizontal shelf of your recently played tracks
- **Made For You** — Curated playlist recommendations
- **Top Charts** — Trending tracks displayed in a scrollable shelf

###  Search Page
- **Start Browsing** — Landing state with prompt to explore music
- **Browse All** — Genre cards grid (Pop, Workout, Party, Hindi, etc.) with colorful category tiles

###  My Playlist
- View all your created playlists
- **Search and Filter Songs** — Search bar to find songs and add them directly to your playlist
- Dynamic playlist cover using a 2x2 grid of song artwork
- Song rows with hover-to-play interaction

### 🔐 Auth Pages (Spotify-style)
- **Sign Up** — Email, name, password fields with social signup via Google, Apple, and Phone
- **Login** — Email and password login with inline error validation and social login via Google, Apple, Facebook, and Phone
- Persistent login state using localStorage

---

##  Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool and Dev Server |
| React Router DOM | Client-side Routing |
| CSS (index.css) | Global Styling |
| localStorage | Auth and Data Persistence |

---

##  Project Structure

    spotify-clone/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── Player.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── SongCard.jsx
    │   │   ├── TopNav.jsx
    │   │   └── TopNav.module.css
    │   ├── context/
    │   │   └── MusicContext.jsx
    │   ├── data/
    │   │   └── musicData.jsx
    │   ├── pages/
    │   │   ├── authStyles.jsx
    │   │   ├── Home.jsx
    │   │   ├── Home.module.css
    │   │   ├── LiveEvents.jsx
    │   │   ├── Login.jsx
    │   │   ├── MadeForYou.jsx
    │   │   ├── Music.jsx
    │   │   ├── Playlist.jsx
    │   │   ├── Podcasts.jsx
    │   │   ├── Search.jsx
    │   │   └── Signup.jsx
    │   ├── sections/
    │   │   ├── FeaturedCharts.jsx
    │   │   ├── FeaturedCharts.module.css
    │   │   ├── LongTracks.jsx
    │   │   ├── LongTracks.module.css
    │   │   ├── MadeForYou.jsx
    │   │   ├── MadeForYou.module.css
    │   │   ├── RecentlyPlayed.jsx
    │   │   ├── RecentlyPlayed.module.css
    │   │   ├── SiteFooter.jsx
    │   │   └── SiteFooter.module.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── generate_songs.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

    git clone https://github.com/your-username/spotify-clone.git
    cd spotify-clone
    npm install
    npm run dev

Open `http://localhost:5173` in your browser.

---

## Authentication

This app uses localStorage for auth with no backend required.

1. Go to `/signup` and create an account with your name, email, and password
2. You will be redirected to `/login`
3. Log in with the same credentials
4. Your session persists until you log out

---

##  UI Highlights

- Dark theme matching Spotify design language 
- Sticky audio player bar fixed at the bottom
- Hover-to-reveal play buttons on song rows
- Responsive genre grid with colorful category cards
- Spotify logo and social login buttons on auth pages
- Profile icon showing user initial in the topbar

---

##  Acknowledgements

- Inspired by [Spotify](https://spotify.com)
- Built as a frontend practice project

---

##  License

This project is for educational purposes only and is not affiliated with or endorsed by Spotify.