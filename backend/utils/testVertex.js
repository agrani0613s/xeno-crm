// utils/testVertex.js (ESM)
import dotenv from "dotenv";
import { suggestMessages } from "./vertexAiClient.js"; // ensure path
dotenv.config();

(async () => {
  try {
    const s = await suggestMessages("Bring back inactive users with a discount");
    console.log("Vertex test suggestions:", s);
  } catch (err) {
    console.error("Vertex test error:", err);
  }
})();
