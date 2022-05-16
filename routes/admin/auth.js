const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const authController = require("../../controllers/admin/auth");
const testimonialController = require("../../controllers/admin/testimonial");

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
router.post("/testimonial", testimonialController.add);
router.put("/testimonial/:id", testimonialController.update)
router.delete('/testimonial/:id', testimonialController.delete);
module.exports = router;