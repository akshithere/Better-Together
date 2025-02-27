/* eslint-disable no-unused-vars */
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Load environment variables
const gemini_api_key = process.env.GEMINI_API;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

const geminiConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 1,
  maxOutputTokens: 1024, // Keeping token usage reasonable
};

// Define the Gemini model
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

// Rate limiting to avoid exceeding free-tier restrictions
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // 15 requests per minute
  message: { message: "Rate limit exceeded. Please try again later." },
});

// Route for handling search queries
router.post("/request", limiter, async (req, res) => {
  try {
    const { searchQuery } = req.body;
    console.log("server was provided query:", searchQuery);

    if (!searchQuery || typeof searchQuery !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    // AI Prompt: Forces structured JSON response
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
      - Make sure that NGO's are only related to what the searchQuery asks above. Not other then what the user asks.
        However still don't forget the valid JSON syntax but make the output valid to the user query.

      Return ONLY valid JSON. No extra formatting, no preamble, no explanations.
    `;

    const result = await geminiModel.generateContent(prompt);
    console.log("Raw AI output:", JSON.stringify(result, null, 2));

    // Extract AI response safely
    let responseText;
    try {
      responseText = result.response.candidates[0].content.parts[0].text;
    } catch (extractionError) {
      console.error("Error extracting text from AI response:", extractionError);
      return res.status(500).json({ message: "Failed to extract AI response." });
    }

    // Clean accidental Markdown formatting
    const cleanedResponseText = responseText.replace(/^```json\n/, "").replace(/\n```$/, "").trim();

    try {
      const actualJson = JSON.parse(cleanedResponseText);
      res.status(200).json(actualJson);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      res.status(500).json({ message: "Error parsing AI response.", rawResponse: cleanedResponseText });
    }
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
