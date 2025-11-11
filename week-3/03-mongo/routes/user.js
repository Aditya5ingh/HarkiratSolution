const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    await User.create({ username, password })

    res.json( { message: 'User created successfully' })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then(function(courses){
            res.json({ courses: courses });
        });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.headers.username;
    const password=req.headers.password;

    User.findOne({ username: username, password: password }).then(function(user){
        if(user){
            res.json({ purchasedCourses: user.purchasedCourses || [] });
        } else {
            res.status(403).json( { message: 'User not found' } )
        }
    });
});

module.exports = router