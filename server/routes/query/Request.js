/* eslint-disable no-unused-vars */
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Load environment variables
const gemini_api_key = process.env.GEMINI_API;
const googleAI = new GoogleGenAI({ apiKey: gemini_api_key });

const geminiConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 1,
  maxOutputTokens: 1024,
};

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { message: "Rate limit exceeded. Please try again later." },
});

// POST route for handling queries
router.post("/request", limiter, async (req, res) => {
  try {
    const { searchQuery } = req.body;
    console.log("server was provided query:", searchQuery);

    if (!searchQuery || typeof searchQuery !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const prompt = `
      You are an AI that provides structured information about NGOs and charities.
      Based on the user's query: "${searchQuery}", generate a **valid JSON** response following this strict format:

      {
        "summary": "A concise overview of relevant NGOs and their missions.",
        "data": [
          {
            "title": "NGO Name",
            "description": "A short, compelling summary of its mission.",
            "content": "A detailed explanation of its activities and impact.",
            "footer": "Any concluding remarks or calls to action.",
            "link": "A valid and clickable website URL."
          },
          ...
        ]
      }

      **Rules:**
      - Provide exactly 5 NGO entries.
      - Use proper JSON syntax. Do not return Markdown or extra text.
      - Ensure URLs are valid and related to NGOs.
      - Ensure factual, structured, and relevant information.
      - Make sure that NGOs are only related to what the searchQuery asks above. Not other than what the user asks.

      Return ONLY valid JSON. No extra formatting, no preamble, no explanations.
    `;

    const response = await googleAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      generationConfig: geminiConfig,
    });

    const fullText = response.text;
    const cleanedText = fullText.replace(/^```json\n/, "").replace(/\n```$/, "").trim();

    try {
      const actualJson = JSON.parse(cleanedText);
      res.status(200).json(actualJson);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      res.status(500).json({ message: "Error parsing AI response.", rawResponse: cleanedText });
    }
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;