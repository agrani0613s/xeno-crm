import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SegmentBuilder from "../components/SegmentBuilder";
import { AuthContext } from "../context/AuthContext";

function CampaignPage() {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [rules, setRules] = useState([]);

  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/campaigns", { withCredentials: true })
      .get(`${process.env.REACT_APP_API_URL}/api/campaigns`, { withCredentials: true })
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  const createCampaign = async () => {
    try {
      // Convert array of rules into Mongo query
      const query = {};
      rules.forEach((rule) => {
        query[rule.field] = { [rule.operator]: Number(rule.value) };
      });

      // const res = await axios.post(
      //   "http://localhost:5000/api/campaigns",
      //   { name, rules: query },
      //   { withCredentials: true }
      // );

      const res = await axios.post(
     `${process.env.REACT_APP_API_URL}/api/campaigns`,
     { name, rules: query },
     { withCredentials: true }
    );

      alert("✅ Campaign created!");
      setCampaigns([res.data.campaign, ...campaigns]);
      setName("");
      setRules([]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create campaign");
    }
  };

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ Please log in to access campaigns.
      </p>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎯 Campaigns</h2>

      {/* Create Campaign */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">Create New Campaign</h3>
        <input
          type="text"
          placeholder="Campaign name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <SegmentBuilder onChange={setRules} />

<button
  onClick={createCampaign}
  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-4"
>
  ➕ Create Campaign
</button>

      </div>

      {/* Campaign History */}
      <h3 className="text-xl font-semibold mb-4">Past Campaigns</h3>
      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns created yet.</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="bg-white border rounded p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <h4 className="font-bold text-lg">{c.name}</h4>
                <p className="text-sm text-gray-600">
                  Audience: {c.audienceSize}
                </p>
              </div>
              <Link
                to={`/campaigns/${c._id}/logs`}
                className="text-blue-500 hover:underline"
              >
                View Logs
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignPage;
