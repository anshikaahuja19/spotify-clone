import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Spotify</h2>

      <Link to="/" className="navItem">Home</Link>
      <Link to="/search" className="navItem">Search</Link>
      <Link to="/playlist" className="navItem">Your Playlist</Link>
    </div>
  );
}

export default Sidebar;