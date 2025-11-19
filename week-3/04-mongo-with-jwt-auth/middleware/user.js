const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    const words = token.split(' ');
    const jwtToken1 = words[1];
    const decodedValue1 = jwt.verify(jwtToken1, JWT_SECRET);
    
    if (decodedValue1.username) {
        req.username = decodedValue1.username; // Attach username to request object
        next();
    } else
        res.status(403).json({
            msg: "You are not authenticated. by user"
        })
}

module.exports = userMiddleware;