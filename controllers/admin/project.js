const Project = require('../../models').Project;
const { successResponse, errorResponse } = require("../../helpers/response");
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');

module.exports = {
  async add(req, res, next) {
    // console.log(req.file);
    //   console.log({...req.file}.filename);
    //   return '';
    try {
      if (req.file) {
        const project = await Project
          .create({
            category_id: req.body.category_id,
            title: req.body.title,
            description: req.body.description,
            image: { ...req.file }.path,
            url: req.body.url
          });
        return successResponse(req, res, "Project added successfully", project);
      } else {
        return errorResponse(req, res, "Please attach project image", 400);
      }

    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    try {  
      const project = await Project.findOne({ where: { id } });
      const oldImage = project.image;
      project.set({
        category_id: req.body.category_id,
        title: req.body.title,
        description: req.body.description,
        image: { ...req.file }.path,
        url: req.body.url
      });
      await project.save();

      if(req.file) {
        fs.unlink(path.join(dirname(require.main.filename), oldImage), error => {
          if(error) {
            throw error;
          }
          return res.status(200).json({
            message: 'Project has been updated successfulluy',
            data: project
          });
        });
      } else{
          return res.status(200).json({
            message: 'Project has been updated successfulluy',
            data: project
          });
      }
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