const jwt = require('jsonwebtoken');

// Secrets for JWT (should be in your .env file)
const SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Access token secret
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key'; // Refresh token secret

// Generate Access Token
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

// Verify Access Token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

// Generate Refresh Token
exports.generateRefreshToken = (payload, expiresIn = '7d') => {
  console.log("payload", payload)
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
};

// Verify Refresh Token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
