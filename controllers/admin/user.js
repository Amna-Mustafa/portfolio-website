const User = require('../../models').User;
const { successResponse, errorResponse } = require("../../helpers/response");
const bcrypt = require("bcrypt");

module.exports = {
  async add(req, res, next) {
    try {
        if(req.file){
            const user = await User
            .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            about: req.body.about,
            image: {...req.file}.filename,
            email: req.body.email,
            password: req.body.password
            });
            return successResponse(req, res, "User added successfully", user);
        }else{
            return errorResponse(req, res, "Please attach project image", 400);
        }
      
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      // return res.send(id);
      const [updated] = await User.update(req.body, {
        where: { id },
      });
      // return res.send(updated);
      if (updated) {
        const updatedUser = await User.findOne({ where: { id } });
        return successResponse(req, res, "User has been updated", updatedProject);
      }
      return errorResponse(req, res, "No, user found to update", 400);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const check = await User.findOne({
        where: { id },
      });
      if (check) {
        const deleteUser = await User.destroy({
          where: { id },
        });
        if (deleteUser) {
          return successResponse(req, res, "User has been deleted", deleteUser);
        }
      }
      return errorResponse(req, res, "No, user found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};