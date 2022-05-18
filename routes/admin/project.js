const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const categoryController = require("../../controllers/admin/category");
const projectController = require("../../controllers/admin/project");
const path = require("path");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: './upload/projects',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
})

//// project category
router.post("/category", categoryController.add);
router.put("/category/:id", categoryController.update)
router.delete('/category/:id', categoryController.delete);

//// project 
router.post("/project", upload.single('image'), projectController.add);
router.put("/project/:id", upload.single('image'), projectController.update)
router.delete('/project/:id', projectController.delete);


module.exports = router;