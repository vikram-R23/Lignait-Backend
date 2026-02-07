const express = require('express');
const router = express.Router();
const passport = require('passport');

// ✅ Destructure imports to match Controller exports
const { 
    registerUser, 
    loginUser, 
    forgotPassword, 
    resetPassword, 
    googleCallback 
} = require('./authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);

// ✅ These lines caused the crash because functions were missing in controller
router.post('/forgot-password', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), googleCallback);

module.exports = router;