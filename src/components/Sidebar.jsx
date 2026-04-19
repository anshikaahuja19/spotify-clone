import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#121212",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Your Library</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
          Search
        </Link>

        <Link to="/playlist" style={{ color: "white", textDecoration: "none" }}>
          Playlist
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;