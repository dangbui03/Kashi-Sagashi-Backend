const roles = require('./');

const checkRole = (requiredRole) => (req, res, next) => {
    const userRole = req.user.role;

    if (!roles[userRole].can.includes(requiredRole)) {
        return res.status(403).send('Forbidden');
    }

    next();
};

module.exports = checkRole;
