'use strict';
const {
  Model
} = require('sequelize');

// console.log(Project);
module.exports = (sequelize, DataTypes) => {
  class ProjectCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectCategory.hasMany(models.Project, {
        foreignKey: 'category_id',
        as: 'categories',
      });
    }
  }
  ProjectCategory.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "" ) {
            throw new Error("Please enter category title");
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'ProjectCategory',
   
  });
  return ProjectCategory;
};