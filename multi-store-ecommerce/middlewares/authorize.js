// middleware/authorize.js

exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access forbidden: Insufficient permissions.' });
        }
        next();
    };
};
