const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ FIX 1: Import sequelize DIRECTLY (No curly braces!)
const sequelize = require('./config/database'); 

const passport = require('passport');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Import Configuration
require('./config/passport'); 

// Import Routes
const authRoutes = require('./modules/auth/authRoutes');
const profileRoutes = require('./modules/onboarding/profileRoutes');
const aiRoutes = require('./modules/ai/aiRoutes');

// Import Middleware
const { protect } = require('./middleware/authMiddleware'); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());

// Session Config 
app.use(session({
  secret: process.env.SESSION_SECRET || 'career_orbit_secret_key', 
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- ✅ USE ROUTES (Fixed Paths) ---

// 1. Auth: /api/auth/signup, /api/auth/login
app.use('/api/auth', authRoutes); 

// 2. Profile: ✅ FIX 2: Changed from '/api' to '/api/profile'
// This matches the frontend request: http://localhost:5000/api/profile
app.use('/api/profile', protect, profileRoutes); 

// 3. AI: /api/ai/roadmap
app.use('/api/ai', protect, aiRoutes);   

// Test DB Connection and Sync Models
const startServer = async () => {
  try {
    // Check connection
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully.');
    
    // Sync models (creates tables if missing)
    await sequelize.sync({ alter: true }); 
    console.log('✅ Database Synced.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();