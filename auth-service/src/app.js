const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');
const authRoutes = require('./routes/auth.routes');
const User = require('./models/user.model');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get('/', (req, res) => res.json({ ok: true, service: 'auth-service' }));

// mount routes at root: /auth/register and /auth/login
app.use('/auth', authRoutes);

// sync DB (dev)
async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected & synced');
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
}
initDb();

module.exports = app;
