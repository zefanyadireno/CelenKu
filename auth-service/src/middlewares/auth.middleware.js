const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // No header
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header missing'
    });
  }

  // Format check
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization format. Use: Bearer <token>'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded properties
    req.user = payload;
    req.userId = payload.sub;

    return next();

  } catch (err) {
    console.error('[AUTH ERROR]', err.message);

    return res.status(401).json({
      success: false,
      message:
        err.name === 'TokenExpiredError'
          ? 'Token expired'
          : 'Invalid or malformed token'
    });
  }
}

module.exports = authMiddleware;
