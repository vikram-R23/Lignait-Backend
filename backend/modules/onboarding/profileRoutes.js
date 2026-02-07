const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('./profileController');

// Log when this file is loaded
console.log("✅ Profile Routes Loaded");

// Routes
router.get('/', getProfile);
router.post('/', updateProfile);

module.exports = router;