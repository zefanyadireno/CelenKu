const express = require('express');
const cors = require('cors');
const routes = require('./routes/user.routes');
const sequelize = require('./utils/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', routes);

async function start() {
  try {
    await sequelize.sync();
    console.log("User-service DB synced");
    
    app.listen(process.env.PORT, () =>
      console.log(`User-service running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Init error:", err);
  }
}

start();
