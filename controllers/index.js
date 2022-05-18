const authController = require('./admin/auth');
const categoryController = require('./admin.category');
const projectController = require('./admin.project');
const testimonialController = require('./admin.testimonial');
const userController = require('./admin.user');
const socialController = require('./admin.usersociallinks');
const educationController = require('./admin.usereducationalbackground');

module.exports = {
    authController,
    categoryController,
    projectController,
    testimonialController,
    userController,
    socialController,
    educationController
};