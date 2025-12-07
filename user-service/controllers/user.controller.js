const User = require('../models/user.model');

async function getAllUsers(req, res) {
  const users = await User.findAll({ attributes: ["id", "email", "name"] });
  res.json({ success: true, users });
}

async function getUser(req, res) {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "email", "name"]
  });

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, user });
}

module.exports = { getAllUsers, getUser };
