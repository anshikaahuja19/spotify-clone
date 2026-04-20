import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userData = { email, password };
  localStorage.setItem('user', JSON.stringify(userData));

  alert("Account created! Please login.");
  navigate('/login');
};

  return (
    <div className='authPage'>
      <form onSubmit={handleSignup} className='authBox'>
        <h2 className = 'authTitle' >Sign Up</h2>
        <input type="email" className = 'authInput' placeholder="Email" onChange={(e) => setEmail(e.target.value)}  />
        <input type="password" className = 'authInput' placeholder="Create Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn primary authBtn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;