const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('student', 'professional', 'admin'),
    defaultValue: 'student',
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOnboarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // ✅ NEW FIELDS FOR PASSWORD RESET
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = User;