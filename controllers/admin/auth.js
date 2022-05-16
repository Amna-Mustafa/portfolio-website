const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require( '../../models').User;
const { loginValidation } = require('../../validation/validation');
const { successResponse, errorResponse } = require("../../helpers/response");

exports.signin=async(req,res,next)=>{
  
  try{
    const { error } = loginValidation(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    const { email, password } = req.body;
    // Validate if user exist 
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "8h",
        }
      );
      return successResponse(req, res, "Login Successfully", user, token);
    }
    return errorResponse(req, res, "Invalid Credentials", 400);
  }
  catch(e){
    return errorResponse(req, res, err.message, 400);
  }
}


