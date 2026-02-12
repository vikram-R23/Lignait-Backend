const express = require('express');
const router = express.Router();

const { generateRoadmap, chatWithAI } = require('./aiController');

router.post('/roadmap', generateRoadmap); 
router.post('/chat', chatWithAI);

module.exports = router;