const User = require('../../models').User;
const UserSocialLink = require('../../models').UserSocialLink;
const UserEducationalBackground = require('../../models').UserEducationalBackground;
const { successResponse, errorResponse } = require("../../helpers/response");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const usereducationalbackground = require('./usereducationalbackground');

module.exports = {
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: UserSocialLink,
          as: 'social_links'
        },
        {
          model: UserEducationalBackground,
          as: 'educational_backgrounds'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: UserSocialLink, as: 'social_links' }, 'createdAt', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  async add(req, res, next) {
    try {
        if(req.file){
            const user = await User
            .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            about: req.body.about,
            image: {...req.file}.path,
            email: req.body.email,
            password: req.body.password
            });
            return successResponse(req, res, "User added successfully", user);
        }else{
            return errorResponse(req, res, "Please attach your profile picture", 400);
        }
      
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    try {  
      const user = await User.findOne({ where: { id } });
      const oldImage = user.image;
      user.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        about: req.body.about,
        image: {...req.file}.path,
        password: req.body.password
      });
      await user.save();

      if(req.file) {
        fs.unlink(path.join(dirname(require.main.filename), oldImage), error => {
          if(error) {
            throw error;
          }
  
          return res.status(200).json({
            message: 'User has been updated successfulluy',
            data: user
          });
        });
      } else {
        return res.status(200).json({
          message: 'User has been updated successfulluy',
          data: user
        });
      }

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