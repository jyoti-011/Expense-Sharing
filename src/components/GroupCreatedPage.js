import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GroupCreated.css";
import confetti from "canvas-confetti";

const GroupCreatedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId;

  const handleGoToGroupPage = () => {
    navigate("/group-page", { state: { groupId } });
  };

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#808000", "#6b8e23", "#556b2f", "#808000", "#9acd32"],
    });
  }, []);

  return (
    <div className="group-created-page">
      <div className="content">
        <h1 className="group-created-message">Group Created!</h1>
        <button onClick={handleGoToGroupPage} className="go-to-group-page-btn">
          Go to Group Page
        </button>
      </div>
    </div>
  );
};

export default GroupCreatedPage;
