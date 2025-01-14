function authenticate(req, res, next) {
    // ...authentication logic...
    next();
}

function authorize(...roles) {
    return (req, res, next) => {
        // ...authorization logic...
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

module.exports = { authenticate, authorize };
