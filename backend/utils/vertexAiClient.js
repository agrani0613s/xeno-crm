import dotenv from "dotenv";
import { VertexAI } from "@google-cloud/vertexai";

dotenv.config();

let model = null;

// Only set up real Vertex AI client if not in mock mode
if (process.env.MOCK_AI !== "true") {
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_PROJECT_ID,
    location: "us-central1",
    googleAuthOptions: {
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
  });

  model = vertexAI.preview.getGenerativeModel({
    model: "gemini-pro",
  });
}

// ✅ Suggest campaign messages
export async function suggestMessages(objective) {
  // Always use mock when MOCK_AI is true
  if (process.env.MOCK_AI === "true" || !model) {
    return [
      `Reminder: Don’t forget about ${objective}!`,
      `Exclusive offer related to ${objective} just for you.`,
      `We noticed your interest in ${objective} — here’s a deal.`,
    ];
  }

  try {
    const prompt = `Suggest 3 short personalized campaign messages for this objective: "${objective}"`;
    const resp = await model.generateContent(prompt);

    return resp.response?.candidates?.map(c => c.content.parts[0].text) || [];
  } catch (err) {
    console.error("❌ Vertex AI error:", err.message);

    // Fallback gracefully to mock responses
    return [
      `[AI unavailable, mock suggestion] Reminder about ${objective}`,
      `[AI unavailable, mock suggestion] Special offer: ${objective}`,
      `[AI unavailable, mock suggestion] Explore ${objective} with us!`,
    ];
  }
}

// ✅ Parse natural language into Mongo query
export async function parseSegmentRule(description) {
  if (process.env.MOCK_AI === "true" || !model) {
    // Return a fake rule in mock mode
    return { spend: { $gt: 1000 }, visits: { $lt: 5 } };
  }

  const prompt = `
  Convert this description into a MongoDB query filter (JSON only, no explanation):
  "${description}"
  
  Example:
  Input: "customers who spent more than 5000 and visited less than 3 times"
  Output: { "spend": { "$gt": 5000 }, "visits": { "$lt": 3 } }
  `;

  try {
    const resp = await model.generateContent(prompt);
    const text = resp.response.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Vertex AI parse error:", err.message);

    // Safe fallback
    return {};
  }
}
