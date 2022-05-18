const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const authController = require("../../controllers/admin/auth");

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




module.exports = router;