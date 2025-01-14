const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to authenticate users
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

// Middleware to authorize users based on roles
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access forbidden: Insufficient permissions.' });
        }
        next();
    };
};
