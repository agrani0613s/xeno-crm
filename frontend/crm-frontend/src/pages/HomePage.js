import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (!user) {
      navigate("/login?message=Please log in first");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="h-3/4 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">XENO-CRM</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Manage your customer campaigns, get AI-powered suggestions, and
          supercharge your engagement — all in one place.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => handleClick("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => handleClick("/campaigns")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-green-600 transition"
          >
            Manage Campaigns
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="h-1/4 bg-white border-t flex justify-around items-center px-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-600">📊 Analytics</h3>
          <p className="text-sm text-gray-500">
            Track performance of your campaigns in real-time.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-green-600">🤖 AI Suggestions</h3>
          <p className="text-sm text-gray-500">
            Get personalized messaging ideas powered by AI.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-600">⚡ Automation</h3>
          <p className="text-sm text-gray-500">
            Save time with smart segmentation and automation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
