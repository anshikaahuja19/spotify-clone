import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // 1. These "states" hold what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // 2. Create a user object
    const userData = { email, password };
    
    // 3. Save it to Local Storage (The Browser's Memory)
    localStorage.setItem('user', JSON.stringify(userData));
    
    alert("Account created successfully! Now please login.");
    navigate('/login'); // Send them to the login page
  };

  return (
    <div style={{ backgroundColor: '#121212', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: 'black', padding: '40px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        
        {/* onChange updates our state every time a key is pressed */}
        <input 
          type="email" 
          placeholder="Email" 
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: 'none' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: 'none' }} 
        />
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1DB954', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;