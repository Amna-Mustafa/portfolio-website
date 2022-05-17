const Project = require('../../models').Project;
const { successResponse, errorResponse } = require("../../helpers/response");

module.exports = {
  async add(req, res, next) {
    //   console.log({...req.file}.filename);
    //   return '';
    try {
        if(req.file){
            const project = await Project
            .create({
            category_id: req.body.category_id,
            title: req.body.title,
            description: req.body.description,
            image: {...req.file}.filename,
            url: req.body.url
            });
            return successResponse(req, res, "Project added successfully", project);
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
      console.log(id);
      const [updated] = await Project.update(req.body, {
        where: { id },
      });
      //return res.send(updated);
      if (updated) {
        const updatedProject = await Project.findOne({ where: { id } });
        // console.log(updatedProject);
        return successResponse(req, res, "Project has been updated", updatedProject);
      }
      return errorResponse(req, res, "No, project found to update", 400);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, nest) {
    try {
      const { id } = req.params;
      const check = await Project.findOne({
        where: { id },
      });
      if (check) {
        const deleteProject = await Project.destroy({
          where: { id },
        });
        if (deleteProject) {
          return successResponse(req, res, "Project has been deleted", deleteProject);
        }
      }
      return errorResponse(req, res, "No, project found to delete", 400);
    } catch (error) {
      return errorResponse(req, res, error.message, 400);
    }
  },
};