// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Implement authentication logic
  next();
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = decoded; // Attach decoded user data to the request
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  // Implement admin check logic
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

/**
 * Middleware to check if the user is an admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

module.exports = { isAdmin, authenticate, verifyToken };