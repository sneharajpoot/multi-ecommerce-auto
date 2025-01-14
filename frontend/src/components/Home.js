import React from "react";
import "./Home.css"; // Import the new CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our E-commerce Site</h1>
      <p>Discover our wide range of products and enjoy shopping with us!</p>
      
      <div className="slider">
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
      </div>
      
      <footer className="footer">
        <p>&copy; 2023 E-commerce Site. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
