const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

console.log(`Using port: ${PORT}`);

const server = app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Choose another port.`);
    process.exit(1);
  } else {
    throw err;
  }
});
