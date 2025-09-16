import dotenv from "dotenv";
import { VertexAI } from "@google-cloud/vertexai";

dotenv.config();

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLIENT_ID,
  location: "us-central1", // most common region
});

const model = vertexAI.preview.getGenerativeModel({
  model: "gemini-pro", // Vertex AI’s text model
});

// Suggest campaign messages
export async function suggestMessages(objective) {
  try {
    const prompt = `Suggest 3 short personalized campaign messages for this objective: "${objective}"`;
    const resp = await model.generateContent(prompt);

    // Extract text from response
    return resp.response.candidates.map(c => c.content.parts[0].text);
  } catch (err) {
    console.error("❌ Vertex AI error:", err.message);
    return ["[AI suggestion failed]"];
  }
}

// Parse natural language into Mongo query
export async function parseSegmentRule(description) {
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
    return {};
  }
}

