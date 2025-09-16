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
      .get("http://localhost:5000/api/campaigns", { withCredentials: true })
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

      const res = await axios.post(
        "http://localhost:5000/api/campaigns",
        { name, rules: query },
        { withCredentials: true }
      );

      alert("Campaign created!");
      setCampaigns([res.data.campaign, ...campaigns]);
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>⚠️ Please log in to access campaigns.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Campaigns</h2>

      <h3>Create Campaign</h3>
      <input
        type="text"
        placeholder="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SegmentBuilder onChange={setRules} />
      <button onClick={createCampaign}>Create</button>

      <h3>Campaign History</h3>
      <ul>
        {campaigns.map((c) => (
          <li key={c._id}>
            <b>{c.name}</b> — Audience: {c.audienceSize} —{" "}
            <Link to={`/campaigns/${c._id}/logs`}>View Logs</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignPage;
