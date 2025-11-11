const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    await Admin.create({ username, password })

    res.json( { message: 'Admin created successfully' })
    
    // .catch(()=>{
    //     res.status(500).json({ message: 'Error creating admin' });
    // })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    
      const { title, description, imageLink, price } = req.body;
     
    const newCourse= await Course.create({ title, description, imageLink, price });
     res.json({ message: 'Course created successfully', courseId: newCourse._id })
      
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then(function(courses){
        res.json({ courses: courses });
    });
});

module.exports = router;