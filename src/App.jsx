import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Playlist from "./pages/Playlist";
import { MusicProvider } from "./context/MusicContext";
import Player from "./components/Player";
import MadeForYou from "./pages/MadeForYou";


function App() {
  return (
 <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/made-for-you" element={<MadeForYou />} />
        </Routes>
        <Player />
      </Router>
    </MusicProvider>
  );
}

export default App;