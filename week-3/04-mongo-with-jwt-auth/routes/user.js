const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");

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

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
   
    const response = await Course.find({});
    res.json({courses: response});
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic

    const username = req.username;
    const user = User.findOne({username});
    const courseId = req.params.courseId;
    const course = Course.findById(courseId);
    if(course){
        user.purchasedCourses.push(course);
        user.save();
        res.json({message: 'Course purchased successfully'});
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router