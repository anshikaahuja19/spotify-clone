import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Playlist from "./pages/Playlist";
import { MusicProvider } from "./context/MusicContext";
import Player from "./components/Player";
import MadeForYou from "./pages/MadeForYou";
import Music from "./pages/Music";
import Podcasts from "./pages/Podcasts";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import LiveEvents from "./pages/LiveEvents";


function App() {
  const [search, setSearch] = useState("");
  return (
    <MusicProvider>
      <Router>
<div className="appLayout">
  <Sidebar />

  <div className="mainContent">
    <TopNav search={search} setSearch={setSearch} />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search search={search} setSearch={setSearch} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/made-for-you" element={<MadeForYou />} />
      <Route path="/music" element={<Music />} />
      <Route path="/podcasts" element={<Podcasts />} />
      <Route path="/live-events" element={<LiveEvents />} />
    </Routes>
  </div>
</div>
        <Player />
      </Router>
    </MusicProvider>
  );
}

export default App; 