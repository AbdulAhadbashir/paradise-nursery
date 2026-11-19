import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  // 'home' | 'plants' | 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') {
    return <ProductList onNavigate={setPage} />;
  }

  if (page === 'cart') {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="hero-content">
          <h1>Paradise Nursery</h1>
          <p className="hero-tagline">Where green things come home.</p>
          <button className="get-started-button" onClick={() => setPage('plants')}>
            Get Started
          </button>
        </div>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
