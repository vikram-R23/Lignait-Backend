const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// ✅ FIX 1: Initialize API Client (This was missing before)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRoadmap = async (req, res) => {
  try {
    const { goal, currentRole, skills } = req.body; 

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Server Error: API Key missing" });
    }

    const skillsList = skills && Array.isArray(skills) 
      ? skills.map(s => s.name).join(', ') 
      : 'None';

    // ✅ FIX 2: Use the working Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a career counselor. 
      User Role: ${currentRole}
      User Goal: ${goal}
      Current Skills: ${skillsList}
      
      Generate a 3-step learning roadmap.
      IMPORTANT: Return ONLY valid JSON.
      
      The JSON structure must be:
      {
        "title": "Roadmap to ${goal}",
        "description": "Brief summary",
        "steps": [
          { "phase": "Phase 1: Foundation", "actions": ["Task 1", "Task 2"], "duration": "1 Month" },
          { "phase": "Phase 2: Deep Dive", "actions": ["Task 3", "Task 4"], "duration": "2 Months" },
          { "phase": "Phase 3: Mastery", "actions": ["Build Portfolio", "Apply"], "duration": "1 Month" }
        ]
      }
    `;

    console.log("🤖 Sending request to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response
    text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    const roadmapData = JSON.parse(text);
    res.json({ success: true, data: roadmapData });

  } catch (error) {
    console.error("❌ AI Controller Error:", error);
    res.status(500).json({ message: "Failed to generate roadmap" });
  }
};

const chatWithAI = async (req, res) => {
    res.json({ message: "Chat logic pending" });
};

module.exports = { generateRoadmap, chatWithAI };