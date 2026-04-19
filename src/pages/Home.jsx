import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
      
        <div className="topbar">
          <Link to="/signup" className="signupBtn">Sign up</Link>
          <Link to="/login" className="loginBtn">Log in</Link>
        </div>

        <div className="container">
          <h1>Good Morning</h1>

          <div className="grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="musicCard" key={item}>
                <div className="cover"></div>
                <p className="title">Daily Mix {item}</p>
                <p className="artist">Artist Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;