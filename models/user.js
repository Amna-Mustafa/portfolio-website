'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserEducationalBackground, {
        foreignKey: 'user_id',
        as: 'educational_backgrounds',
      });
      User.hasMany(models.UserSocialLink, {
        foreignKey: 'user_id',
        as: 'social_links',
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        notNull: {
          msg: 'Please enter your last name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        notNull: {
          msg: 'Please enter your last name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: [true, "email already exists in database!"],
      lowercase: true,
      trim: true,
      noUpdate : true,
      required: [true, "email not provided"],
      validate: {
        isEmail: {
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
      validate: {
        notEmpty: true,
        len: [8],
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};