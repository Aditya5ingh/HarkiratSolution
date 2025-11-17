const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const  jwt  = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

   await Admin.create({ username, password });
    res.json({ message: 'Admin created successfully' });

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({username, password});
    if(!user){
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({username}, JWT_SECRET);
    res.json({token:token});

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    
    const title  = req.body.title;
    const description  = req.body.description;
    const price  = req.body.price;
    const imageLink  = req.body.imageLink;

    const course = await Course.create({title, description, price, imageLink});
    res.json({
        message: 'Course created successfully',
        courseId: course._id
    });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({courses: courses});
});

module.exports = router;