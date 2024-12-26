import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create-group");
  };

  return (
    <div className="hero-section">
      <h1>Welcome to Expense-Splitter</h1>
      <p>Effortlessly track and split expenses with your group!</p>
      <p>Simplify the calculation
of splitting group expenses</p>
<p>Ever get confused about who owes whom how much money when you're traveling with friends and dealing with expenses like rental cars and tolls? Spliito is a free service that simplifies the hassle of splitting bills on trips.</p>
      <button className="cta-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;
