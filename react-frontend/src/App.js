import React, { useEffect, useState } from 'react';
import './App.css';
import DownArrow from './darr.svg'; // Update the path as necessary
import Lottie from 'lottie-react';
import animationData from './fish.json'; // Adjust the path to your animation JSON file

function App() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
      <section className="landing-section">
        <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200 }} />
        <h1 className={`scroll-text ${scrollY > 5 ? 'fade-in' : ''}`}>QUORAL</h1>
        <p className={`scroll-text ${scrollY > 10 ? 'fade-in' : ''}`}>ML-Based Coral Monitoring</p>
        <div className="scroll-arrow" onClick={scrollDown}>
          <img src={DownArrow} alt="Scroll down" width="40" height="40" />
        </div>
      </section>

      <section className="content-section">
        <h2 className={`scroll-text ${scrollY > 300 ? 'fade-in' : ''}`}>Explore the beauty of Coral Reefs</h2>
        <p>
          Coral reefs are diverse underwater ecosystems held together by calcium carbonate structures secreted by corals.
        </p>
      </section>

      <section className="content-section">
        <h2 className={`scroll-text ${scrollY > 1000 ? 'fade-in' : ''}`}>Discover Marine Life</h2>
        <p>
          Marine life, or sea life, refers to the plants, animals, and other organisms that live in the salt water of the sea or ocean.
        </p>
      </section>
    </div>
  );
}

export default App;
