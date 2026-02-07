const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create the Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'career_orbit',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Ragul@2006', // Replace with your real DB password if env is missing
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
  }
);

// ✅ EXPORT IT DIRECTLY
module.exports = sequelize;