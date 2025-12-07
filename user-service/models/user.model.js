const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING
}, {
  tableName: "users"
});

module.exports = User;
