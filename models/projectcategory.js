'use strict';
const {
  Model
} = require('sequelize');
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
    hooks: {
      afterDestroy: (category, options) => {
        console.log("deleted:");
        console.log('categoryid',category.id);
        console.log(category.title);
      },
    },
  });
  return ProjectCategory;
};