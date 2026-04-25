import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon, AppleIcon } from './authStyles.jsx';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    alert("Account created! Please login.");
    navigate('/login');
  };

  return (
    <div className="authPage">
      <div className="authBox">

        <svg className="authLogo" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>

        <h1 className="authHeading">Sign up to<br />start listening</h1>

        <div className="authInputGroup">
          <label className="authLabel">Your name</label>
          <input className="authInput" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="authInputGroup">
          <label className="authLabel">Email address</label>
          <input className="authInput" type="email" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="authInputGroup">
          <label className="authLabel">Create password</label>
          <input className="authInput" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="authGreenBtn" onClick={handleSignup}>Next</button>

        <div className="authDivider"><span className="authDividerText">or</span></div>

        <button className="authOutlineBtn">📱 Sign up with phone number</button>
        <button className="authOutlineBtn"><GoogleIcon /> Sign up with Google</button>
        <button className="authOutlineBtn"><AppleIcon /> Sign up with Apple</button>

        <p className="authFooter">
          Already have an account? <Link to="/login" className="authLink">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;