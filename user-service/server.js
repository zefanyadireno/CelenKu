const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();
require('./utils/db'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "User Service Running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
