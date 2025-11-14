const jwt = require('jsonwebtoken');
const JWT_SECRET = require('..');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.Authorization;

    const words = token.split(' ');
    const jwtToken = words[1];
    
    // Validate the token and extract admin details
    // If valid, call next()
    // If invalid, respond with 401 Unauthorized
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username){
        next();
    } else 
        res.status(403).json({
            msg: "You are not authenticated."
        })
     
}

module.exports = adminMiddleware;