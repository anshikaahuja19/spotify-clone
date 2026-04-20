import { useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import { useState, useEffect } from "react";

const TopNav = () => {
  const navigate = useNavigate();

  // ✅ state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ sync with localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(loggedIn);
    setUser(storedUser);
  }, []);

  // ✅ logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);   // 🔥 updates UI
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className={styles.topNav}>

      {/* LEFT (empty for spacing) */}
      <div></div>

      {/* CENTER (search) */}
      <div className={styles.center}>
        <div className={styles.searchBox}>
          <input
            placeholder="What do you want to play?"
            onFocus={() => navigate("/search")}
          />
        </div>
      </div>

      {/* RIGHT (auth buttons) */}
      <div className={styles.authButtons}>
        {isLoggedIn ? (
          <>
            <span className={styles.userName}>
              {user?.email?.split("@")[0]}
            </span>
            <button onClick={handleLogout} className={styles.loginBtn}>
              Logout
            </button>
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