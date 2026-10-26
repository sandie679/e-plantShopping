
import { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'hidden' : ''}`}>
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button
            className="get-started-button"
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
          <AboutUs />
        </div>
      </div>

      {showProductList && (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
