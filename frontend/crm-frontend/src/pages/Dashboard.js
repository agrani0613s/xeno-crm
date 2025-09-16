import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [objective, setObjective] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns", { withCredentials: true })
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getSuggestions = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/suggest-messages",
        { objective },
        { withCredentials: true }
      );
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AI suggestions");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <h3>Past Campaigns</h3>
      <ul>
        {campaigns.map((c) => (
          <li key={c._id}>
            <b>{c.name}</b> — Audience: {c.audienceSize}
          </li>
        ))}
      </ul>

      <h3>AI Message Suggestions</h3>
      <input
        type="text"
        placeholder="Enter campaign objective"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
      />
      <button onClick={getSuggestions}>Get Suggestions</button>

      <ul>
        {suggestions.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
