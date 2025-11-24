const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  password_hash: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      len: [20, 200] // bcryptjs hash panjangnya 60 karakter
    }
  },

  name: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }

}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    { fields: ['email'] }
  ]
});

module.exports = User;
