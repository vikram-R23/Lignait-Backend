const express = require('express');
const router = express.Router();

// Import BOTH functions from the controller
const { generateRoadmap, chatWithAI } = require('./aiController');

// 1. Route for Roadmap
router.post('/roadmap', generateRoadmap); 

// 2. Route for Chatbot (This is what is returning 404 right now!)
router.post('/chat', chatWithAI);

module.exports = router;