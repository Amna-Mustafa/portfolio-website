'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      lowercase: true,
      trim: true,
      required: [true, "Please enter your email"],
      validate: {
        isEmail: {
          msg: "Please enter a valid email"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      required: [true, "Please enter description"],
    },
    rating: {
      type: DataTypes.INTEGER,
      required: [true, "Please enter rating"],
      validate: {
        isInt: {
          msg: "Must be an integer"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Testimonial',
  });
  return Testimonial;
};