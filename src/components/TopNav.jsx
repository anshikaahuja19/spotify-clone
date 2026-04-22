import { useNavigate, useLocation } from "react-router-dom";
import styles from "./TopNav.module.css";
import { useState, useEffect } from "react";


const TopNav = ({ search, setSearch }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    setIsLoggedIn(loggedIn);
    setUser(storedUser);
  }, []);
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles.profileWrapper}`)) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearch("");
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    setIsLoggedIn(false);
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className={styles.topNav}>

      <div className={styles.center}>
        <div className={styles.searchBox}>
          <input
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (!value.trim()) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
              }

              setShowSuggestions(true);

              fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(
                  value
                )}&media=music&entity=song&limit=5`
              )
                .then((res) => res.json())
                .then((data) => {
                  setSuggestions(
                    data.results.map((item) => ({
                      title: item.trackName,
                      artist: item.artistName,
                      image: item.artworkUrl60,
                    }))
                  );
                })
                .catch(() => setSuggestions([]));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${search}`);
                setShowSuggestions(false);
                setSuggestions([]);
                setSearch("");
              }
            }}
            placeholder="What do you want to play?"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.dropdown}>
              {suggestions.map((song, i) => (
                <div
                  key={i}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSearch(song.title);
                    setShowSuggestions(false);
                    navigate(`/search?q=${song.title}`);
                  }}
                >
                  <img src={song.image} alt="" className={styles.songImg} />
                  <div className={styles.songText}>
                    <div className={styles.songTitle}>{song.title}</div>
                    <div className={styles.songArtist}>{song.artist}</div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>



      <div className={styles.authButtons}>
        {isLoggedIn ? (
          <>
            <div className={styles.profileWrapper}>
              <div
                className={styles.profileIcon}
                onClick={() => setDropdownOpen((prev) => !prev)}>
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase()}
              </div>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownUser}>
                    {user?.name || user?.email}
                  </div>

                  <button
                    className={styles.dropdownLogout}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}



            </div>

          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/signup")}
              className={styles.signupBtn}
            >
              Sign up
            </button>
            <button
              onClick={() => navigate("/login")}
              className={styles.loginBtn}
            >
              Log in
            </button>
          </>
        )}
      </div>

    </nav>
  );
};

export default TopNav;