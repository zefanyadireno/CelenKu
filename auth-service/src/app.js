const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'auth-service' });
});

// Routing
app.use('/auth', authRoutes);

// DB Sync
async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected & synced');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
}

initDb();

module.exports = app;
