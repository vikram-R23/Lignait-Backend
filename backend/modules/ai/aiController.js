const OpenAI = require('openai');
require('dotenv').config();

// 1. Point the OpenAI client to the FREE Groq servers!
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1" 
});

// --- ROADMAP GENERATOR ---
const generateRoadmap = async (req, res) => {
  try {
    const { goal, currentRole, skills } = req.body; 

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: "Server Error: Groq API Key missing" });
    }

    const skillsList = skills && Array.isArray(skills) ? skills.map(s => s.name).join(', ') : 'None';

    const prompt = `
      Act as a career counselor. 
      User Role: ${currentRole}
      User Goal: ${goal}
      Current Skills: ${skillsList}
      Generate a 3-step learning roadmap. 
      The output MUST be pure JSON matching this exact structure:
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

    console.log("🤖 Asking Groq for Roadmap...");
    
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", // Powerful, free open-source model
        response_format: { type: "json_object" }, 
        messages: [
            { role: "system", content: "You are an expert career counselor. Always return valid JSON." }, 
            { role: "user", content: prompt }
        ],
    });

    const roadmapData = JSON.parse(response.choices[0].message.content);
    res.json({ success: true, data: roadmapData });

  } catch (error) {
    console.error("🔥 AI Roadmap Error:", error.message);
    res.status(500).json({ message: "AI Generation Failed", error: error.message });
  }
};

// --- PERSONALIZED CHATBOT ---
const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body; 

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: "Server Error: Groq API Key missing" });
    }

    let systemInstruction = "You are a helpful AI career mentor named Career Orbit Assistant.";
    if (context === 'resume') systemInstruction = "You are an expert resume writer. Help the user rephrase bullet points.";
    else if (context === 'interview') systemInstruction = "You are a strict hiring manager conducting a mock interview.";

    console.log("🤖 Asking Groq for Chat...");

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: message }
        ],
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error("🔥 AI Chat Error:", error.message);
    res.status(500).json({ message: "Chat Failed", error: error.message });
  }
};

module.exports = { generateRoadmap, chatWithAI };