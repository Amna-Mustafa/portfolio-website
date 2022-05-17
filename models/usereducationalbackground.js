'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEducationalBackground extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserEducationalBackground.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  UserEducationalBackground.init({
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'UserEducationalBackground',
  });
  return UserEducationalBackground;
};