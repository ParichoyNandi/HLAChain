// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        console.log('Received Token:', token); // Debugging token

        // Ensure JWT_SECRET is loaded correctly
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging decoded token

        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ message: 'Access Denied: Invalid token' });
        }

        next();
    } catch (err) {
        console.error('Token Error:', err); // Log detailed error
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
