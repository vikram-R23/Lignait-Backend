const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// --- 1. ROADMAP GENERATOR ---
const generateRoadmap = async (req, res) => {
  try {
    const { goal, currentRole, skills } = req.body; 

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: "Server Error: API Key missing" });
    }

    const skillsList = skills && Array.isArray(skills) ? skills.map(s => s.name).join(', ') : 'None';

    const prompt = `
      User Role: ${currentRole}
      User Goal: ${goal}
      Current Skills: ${skillsList}
      Generate a 3-step learning roadmap. 
      The output MUST be pure JSON matching this structure:
      {
        "title": "Roadmap to Goal",
        "description": "Brief summary",
        "steps": [
          { "phase": "Phase 1: Foundation", "actions": ["Task 1", "Task 2"], "duration": "1 Month" },
          { "phase": "Phase 2: Deep Dive", "actions": ["Task 3", "Task 4"], "duration": "2 Months" },
          { "phase": "Phase 3: Mastery", "actions": ["Build Portfolio", "Apply"], "duration": "1 Month" }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", 
        response_format: { type: "json_object" }, 
        messages: [{ role: "system", content: "You are an expert career counselor. Always return valid JSON." }, { role: "user", content: prompt }],
    });

    const roadmapData = JSON.parse(response.choices[0].message.content);
    res.json({ success: true, data: roadmapData });

  } catch (error) {
    console.error("AI Roadmap Error:", error);
    res.status(500).json({ message: "AI Generation Failed", error: error.message });
  }
};

// --- 2. PERSONALIZED CHATBOT ---
const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body; 
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a personalized, helpful AI career mentor named Career Orbit Assistant. Respond directly to the user's questions." },
            { role: "user", content: message }
        ],
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ message: "Chat Failed", error: error.message });
  }
};

module.exports = { generateRoadmap, chatWithAI };