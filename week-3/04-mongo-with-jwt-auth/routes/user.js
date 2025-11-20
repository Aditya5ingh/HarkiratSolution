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

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    const user = await User.findOne({username, password});
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

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic

    const username = req.username;
    const courseId = req.params.courseId;
    // const course = await Course.findById(courseId);
    // if(course){
    //     user.purchasedCourses.push(course);
    //     user.save();
    //     res.json({message: 'Course purchased successfully'});
    // } else {
    //     res.status(404).json({message: 'Course not found'});
    // }
        await User.updateOne({ username: username }, { "$push": { purchasedCourses: courseId } });
        res.json( { message: 'Course purchased successfully' } )
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic

    const username = req.username;
     const user = await User.findOne({ username: username });
        const courses = await Course.find({ _id: { $in: user.purchasedCourses } });
        res.json({ purchasedCourses: courses });
});

module.exports = router