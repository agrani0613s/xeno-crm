import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (!user) {
      // If not logged in → redirect to login with message
      navigate("/login?message=Please log in first");
    } else {
      navigate(path);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to Xeno CRM 🚀</h1>
      <p>This is your personalized marketing automation platform.</p>

      <button onClick={() => handleClick("/dashboard")}>Go to Dashboard</button>
      <button onClick={() => handleClick("/campaigns")} style={{ marginLeft: "10px" }}>
        Manage Campaigns
      </button>
    </div>
  );
}

export default HomePage;
