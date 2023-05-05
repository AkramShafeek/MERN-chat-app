
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        throw new Error('Not authorized to access this route');
    }

}

module.exports = authenticationMiddleware;