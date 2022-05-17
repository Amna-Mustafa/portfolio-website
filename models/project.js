'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.ProjectCategory, {
        foreignKey: 'category_id',
        as: 'project'
      });
    }
  }
  Project.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "" ) {
            throw new Error("Please enter category id");
          }
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "" ) {
            throw new Error("Please enter project title");
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "" ) {
            throw new Error("Please enter project description");
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Please enter url, must be a url"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};