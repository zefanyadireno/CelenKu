const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');   // <--- ini harus ada
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'auth-service' });
});

// Prefix: /auth
app.use('/auth', authRoutes);

// Connect & sync DB
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
