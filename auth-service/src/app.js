const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
require('./utils/db'); // initialize DB

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auth Service Running' });
});

module.exports = app;
