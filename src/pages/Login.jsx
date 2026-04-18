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
    <div style={{ backgroundColor: '#121212', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'black', padding: '40px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Login to Spotify</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1DB954', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Log In</button>
      </form>
    </div>
  );
};

export default Login;