import { useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import { useState, useEffect } from "react";

const TopNav = ({ search, setSearch }) => {
  const navigate = useNavigate();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(loggedIn);
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);  
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className={styles.topNav}>

     
      <div></div>

      
      <div className={styles.center}>
        <div className={styles.searchBox}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${search}`);
              }
            }}
            placeholder="What do you want to play?"
          />
        </div>
      </div>

     
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