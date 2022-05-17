const Category = require('../../models').ProjectCategory;
const { successResponse, errorResponse } = require("../../helpers/response");

module.exports = {
  async add(req, res, next) {
    try {
      const category = await Category
        .create({
          title: req.body.title,
        });
    //   return res.status(201).json({
    //     data: category
    //   });
    return successResponse(req, res, "Project Category added successfully", category);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Category.update(req.body, {
        where: { id },
      }); 
      if (updated) {
        const updatedCategory = await Category.findOne({ where: { id } });
        return successResponse(req, res, "Category has been updated", updatedCategory);
      }
      return errorResponse(req, res, "No, category found to update", 400);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: { id },
      });
      if (category) {
          try {
            await category.destroy();
            return successResponse(req, res, "Category has been deleted", category);
          } catch (error) {
              return res.status(500).json({
                  message: 'Something went wrong'
              })
          }
        
      }
      return errorResponse(req, res, "No, category found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};