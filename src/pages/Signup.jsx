import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const userData = { email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    alert("Account created! Please login.");
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#121212', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: 'black', padding: '40px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
        <input type="password" placeholder="Create Password" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1DB954', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;