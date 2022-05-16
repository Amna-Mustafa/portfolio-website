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
      onDelete: 'cascade',
      references: {
        model: 'Category',
        key: 'id',
        as: 'category_id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      isUrl: true,
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};