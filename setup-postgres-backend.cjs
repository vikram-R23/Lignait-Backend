const fs = require('fs');
const path = require('path');

// The name of the backend folder
const ROOT_DIR = 'backend';

// Define the folder structure
const folders = [
  'config',
  'models',
  'routes',
  'controllers',
  'middleware',
  'services'
];

// Define essential starting files and their content
const files = {
  'index.js': `
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection and Sync Models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully.');
    
    // Sync models (creates tables if they don't exist)
    // In production, use migrations instead of { force: false }
    await sequelize.sync({ force: false });
    console.log('✅ Database Synced.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();

// Basic Route
app.get('/', (req, res) => res.send('Career Orbit API (Postgres) is running...'));
`,

  '.env': `PORT=5000
# Update these with your local Postgres details
DB_NAME=career_orbit_db
DB_USER=postgres
DB_PASS=your_password_here
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=your_super_secret_key_change_this`,

  'config/database.js': `
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Set to console.log to see raw SQL queries
  }
);

module.exports = sequelize;
`,

  // Example User Model for Postgres
  'models/User.js': `
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'professional', 'admin'),
    defaultValue: 'student',
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = User;
`,

  'package.json': `
{
  "name": "career-orbit-backend",
  "version": "1.0.0",
  "description": "PostgreSQL Backend for Career Orbit",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
`
};

// --- Execution Logic ---

// 1. Create Root Directory
if (!fs.existsSync(ROOT_DIR)) {
  fs.mkdirSync(ROOT_DIR);
  console.log(`✅ Created root folder: ${ROOT_DIR}`);
} else {
  console.log(`ℹ️  Folder '${ROOT_DIR}' already exists.`);
}

// 2. Create Sub-folders
folders.forEach(folder => {
  const folderPath = path.join(ROOT_DIR, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`   📂 Created folder: ${folder}`);
  }
});

// 3. Create Files
Object.keys(files).forEach(fileName => {
  const filePath = path.join(ROOT_DIR, fileName);
  // Ensure directory exists for nested files (like config/database.js)
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, files[fileName].trim());
    console.log(`   📄 Created file: ${fileName}`);
  }
});

console.log('\n✨ PostgreSQL Backend structure created successfully!');
console.log('👉 Next Steps:');
console.log('1. cd backend');
console.log('2. npm install');
console.log('3. Create a database named "career_orbit_db" in pgAdmin');
console.log('4. Update .env with your Postgres password');
console.log('5. npm run dev');