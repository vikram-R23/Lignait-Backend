const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
    unique: true
  },
  // --- Step 1 Data ---
  bio: { type: DataTypes.TEXT, allowNull: true },
  careerGoal: { type: DataTypes.STRING, allowNull: true },
  graduationYear: { type: DataTypes.STRING, allowNull: true },
  
  // --- Step 2 Data ---
  degree: { type: DataTypes.STRING, allowNull: true },
  university: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },

  // --- Step 3 Data ---
  // We store skills as a JSON array: [{name: 'Java', level: 'beginner'}, ...]
  skills: { 
    type: DataTypes.JSON, 
    defaultValue: [] 
  },

  // Professional fields (for later use)
  currentJobTitle: { type: DataTypes.STRING, allowNull: true },
  yearsExperience: { type: DataTypes.INTEGER, allowNull: true },
  targetIndustry: { type: DataTypes.STRING, allowNull: true }
}, {
  timestamps: true,
});

// Setup Relationship
User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;