import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CampaignLogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      // .get(`http://localhost:5000/api/campaigns/${id}/logs`, { withCredentials: true })
      .get(`${process.env.REACT_APP_API_URL}/api/campaigns/${id}/logs`, { withCredentials: true })
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const sent = logs.filter(l => l.status === "SENT").length;
  const failed = logs.filter(l => l.status === "FAILED").length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Campaign Delivery Logs</h2>
      <p>Total: {logs.length} | Sent: {sent} | Failed: {failed}</p>
      <ul>
        {logs.map(l => (
          <li key={l._id}>
            Customer: {l.customerId} — {l.status} — {l.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignLogsPage;
