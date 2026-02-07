const express = require('express');
const router = express.Router();

// ✅ Ensure this filename matches exactly: 'aiController.js'
const { generateRoadmap } = require('./aiController');

router.post('/roadmap', generateRoadmap); 

module.exports = router;