'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSocialLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSocialLink.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  UserSocialLink.init({
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
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true,
    }
  }, {
    sequelize,
    modelName: 'UserSocialLink',
  });
  return UserSocialLink;
};