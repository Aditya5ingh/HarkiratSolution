const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    User.create({ username, password });
    res.json({ message: 'User created successfully' });                                                     
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = User.findOne({username, password});
    if(!user){
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({username}, JWT_SECRET);
    res.json({token:token});
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router