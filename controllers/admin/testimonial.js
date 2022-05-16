const Testimonial = require('../../models').Testimonial;
const { successResponse, errorResponse } = require("../../helpers/response");

module.exports = {
  async add(req, res, next) {
    try {
      const testimonial = await Testimonial
        .create({
          name: req.body.name,
          email: req.body.email,
          description: req.body.description,
          rating: req.body.rating
        });
      return res.status(201).json({
        data: testimonial
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return errorResponse(req, res, "req body cannot be empty", 400);
      }
      const { id } = req.params;
      // return res.send(id);
      const [updated] = await Testimonial.update(req.body, {
        where: { id },
      });
      // return res.send(updated);
      if (updated) {
        const updatedTestimonial = await Testimonial.findOne({ where: { id } });
        return successResponse(req, res, "Testimonial has been updated", updatedTestimonial);
      }
      return errorResponse(req, res, "No, testimonial found to update", 400);
    } catch (err) {
      return errorResponse(req, res, err.message, 400);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const check = await Testimonial.findOne({
        where: { id },
      });
      if (check) {
        const deleteTest = await Testimonial.destroy({
          where: { id },
        });
        if (deleteTest) {
          return successResponse(req, res, "Testimonial has been deleted", deleteTest);
        }
      }
      return errorResponse(req, res, "No, Testimonial found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};