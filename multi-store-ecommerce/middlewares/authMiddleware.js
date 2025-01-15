// middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
const jwt = require('../utils/jwtHelper');

const db = require('../models');
const { Users } = db;
const { JWT_SECRET } = process.env;

/**
 * Middleware to authenticate the user using JWT.
 */
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verifyRefreshToken(token);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

/**
 * Middleware to authorize the user based on roles.
 * @param {...string} roles - Allowed roles.
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
    next();
  };
};

/**
 * Middleware to check if the user is a store admin.
 */
exports.isStoreAdmin = (req, res, next) => {
  if (req.user.role !== 'store_admin') {
    return res.status(403).json({ error: 'Access denied. You must be a store admin to perform this action.' });
  }
  next();
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = decoded; // Attach decoded user data to the request
    next();
  });
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
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
