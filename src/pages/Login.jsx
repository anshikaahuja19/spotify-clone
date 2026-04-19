import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); 
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="authPage">
      <form onSubmit={handleLogin} className="authBox">
        <h2 className="authTitle">Login to Spotify</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="authInput" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="authInput"/>
        <button type="submit"className="btn primary authBtn">Log In</button>
      </form>
    </div>
  );
};

export default Login;