const UserSocialLink = require('../../models').UserSocialLink;
const { successResponse, errorResponse } = require("../../helpers/response");

module.exports = {
  async add(req, res, next) {
    try {
        const social = await UserSocialLink
        .create({
        user_id: req.body.user_id,
        title: req.body.title,
        url: req.body.url
        });
        return successResponse(req, res, "Social link added successfully", social);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const [updated] = await UserSocialLink.update(req.body, {
        where: { id },
      });
      console.log(updated);
      if (updated) {
        const updatedSocialLink = await UserSocialLink.findOne({ where: { id } });

        return successResponse(req, res, "Social link has been updated", updatedSocialLink);
      }
      return errorResponse(req, res, "No, social link found to update", 400);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const check = await UserSocialLink.findOne({
        where: { id },
      });
      if (check) {
        const deleteSocial = await UserSocialLink.destroy({
          where: { id },
        });
        if (deleteSocial) {
          return successResponse(req, res, "Social link has been deleted", deleteSocial);
        }
      }
      return errorResponse(req, res, "No, social link found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};