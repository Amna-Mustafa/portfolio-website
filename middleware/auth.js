const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/response");
const dotenv = require("dotenv").config();
const User = require("../models").User;

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if(!authorizationHeader) {
    return res.status(403).json({
      message: 'unauthorized'
    });
  }

  const [name, token] = authorizationHeader.split(' ');

  if (!token) {
    return errorResponse(req, res, "unauthorized", 403);
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return errorResponse(req, res, err.message, 401);
  }
  return next();
};

module.exports = verifyToken;