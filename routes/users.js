const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get('/post', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "Random data"
    }
  });
});
module.exports = router;