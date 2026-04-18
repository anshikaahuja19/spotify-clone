import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDEBAR (Teammates' Area) */}
      <aside style={{ width: '280px', backgroundColor: '#121212', margin: '8px', borderRadius: '8px', padding: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Your Library</h2>
        <div style={{ color: '#b3b3b3', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <span>Home</span>
          <span>Search</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, backgroundColor: '#121212', margin: '8px 8px 8px 0', borderRadius: '8px', overflowY: 'auto', position: 'relative' }}>
        
        {/* TOP NAV BAR */}
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(18,18,18,0.9)', padding: '15px 30px', display: 'flex', justifyContent: 'flex-end', gap: '20px', zIndex: 10 }}>
          <Link to="/signup" style={{ color: '#b3b3b3', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px' }}>Sign up</Link>
          <Link to="/login" style={{ backgroundColor: 'white', color: 'black', padding: '10px 25px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>Log in</Link>
        </div>

        {/* CONTENT SECTION */}
        <div style={{ padding: '0 30px 30px 30px' }}>
          <h1 style={{ fontSize: '2rem', margin: '20px 0' }}>Good Morning, Unnati</h1>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Picked for you</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
            
            {/* Song Card Example */}
            <div style={{ backgroundColor: '#181818', padding: '15px', borderRadius: '8px', transition: '0.3s' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#333', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}></div>
              <strong style={{ display: 'block', marginBottom: '5px' }}>Daily Mix 1</strong>
              <span style={{ fontSize: '0.85rem', color: '#b3b3b3' }}>Drake, J. Cole, Kendrick Lamar...</span>
            </div>

            {/* Repeat this card for more grid items */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;