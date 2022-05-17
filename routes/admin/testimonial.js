const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const testimonialController = require("../../controllers/admin/testimonial");



//// testimonial
router.post("/testimonial", verifyToken, testimonialController.add);
router.put("/testimonial/:id", testimonialController.update)
router.delete('/testimonial/:id', testimonialController.delete);



module.exports = router;