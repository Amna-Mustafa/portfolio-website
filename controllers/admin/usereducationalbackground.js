const Education = require('../../models').UserEducationalBackground;
const { successResponse, errorResponse } = require("../../helpers/response");

module.exports = {
  async add(req, res, next) {
    try {
        const education = await Education
        .create({
        user_id: req.body.user_id,
        title: req.body.title,
        });
        return successResponse(req, res, "Record added successfully", education); 
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Education.update(req.body, {
        where: { id },
      });
      if (updated) {
        const updatedProject = await Education.findOne({ where: { id } });
        return successResponse(req, res, "Record has been updated", updatedProject);
      }
      return errorResponse(req, res, "No, record found to update", 400);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const check = await Education.findOne({
        where: { id },
      });
      if (check) {
        const deleteEducation = await Education.destroy({
          where: { id },
        });
        if (deleteEducation) {
          return successResponse(req, res, "Record has been deleted", deleteEducation);
        }
      }
      return errorResponse(req, res, "No, record found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};