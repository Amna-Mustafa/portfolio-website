const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const userController = require("../../controllers/admin/user");
const socialController = require("../../controllers/admin/usersociallinks");
const educationController = require("../../controllers/admin/usereducationalbackground");
const path = require("path");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: './upload/users/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
})

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