import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [objective, setObjective] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      // .get("/api/campaigns")
      .get(`${process.env.REACT_APP_API_URL}/api/campaigns`, { withCredentials: true })
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getSuggestions = async () => {
    try {
      // const res = await axios.post("/api/ai/suggest-messages", { objective });
      const res = await axios.post(
     `${process.env.REACT_APP_API_URL}/api/ai/suggest-messages`,
       { objective },
       { withCredentials: true });
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("AI fetch error:", err.response?.data || err.message);
      alert("Failed to fetch AI suggestions — check server logs");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Recent Campaigns */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Campaigns</h3>

        {campaigns.length === 0 ? (
          <p className="text-gray-500 italic">
            No campaigns created yet. Start by creating one in the Campaigns section.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((c) => (
              <div key={c._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">{c.name}</h4>
                    <p className="text-sm text-gray-600">
                      Audience: {c.audienceSize}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI Suggestions */}
      <section className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">AI Message Suggestions</h3>
        <div className="flex gap-3 mb-4">
          <input
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="e.g. Bring back inactive users"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={getSuggestions}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="list-disc ml-5">
            {suggestions.map((s, i) => (
              <li key={i} className="py-1">
                {s}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
