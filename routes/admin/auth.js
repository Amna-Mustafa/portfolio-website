const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const authController = require("../../controllers/admin/auth");
const testimonialController = require("../../controllers/admin/testimonial");
const categoryController = require("../../controllers/admin/category");
const projectController = require("../../controllers/admin/project");
const userController = require("../../controllers/admin/user");
const socialController = require("../../controllers/admin/usersociallinks");
const educationController = require("../../controllers/admin/usereducationalbackground");
const path = require("path");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
})

// Admin Login
router.post("/login", authController.signin);
/// check middleware
router.get('/post', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "Random data"
    }
  });
});


//// testimonial
router.post("/testimonial", verifyToken, testimonialController.add);
router.put("/testimonial/:id", testimonialController.update)
router.delete('/testimonial/:id', testimonialController.delete);

//// project category
router.post("/category", categoryController.add);
router.put("/category/:id", categoryController.update)
router.delete('/category/:id', categoryController.delete);

//// project 
router.post("/project", upload.single('image'), projectController.add);
router.put("/project/:id", upload.single('image'), projectController.update)
router.delete('/project/:id', projectController.delete);

//// user 
router.post("/user", upload.single('image'), userController.add);
router.put("/user/:id", userController.update)
router.delete('/user/:id', userController.delete);

//// user social links
router.post("/social-link", socialController.add);
router.put("/social-link/:id", socialController.update)
router.delete('/social-link/:id', socialController.delete);

//// user educational background
router.post("/education-record", educationController.add);
router.put("/education-record/:id", educationController.update)
router.delete('/education-record/:id', educationController.delete);


module.exports = router;