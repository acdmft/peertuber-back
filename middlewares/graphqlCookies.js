const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// Server code
const secret = process.env.SECRET;

const getCookies = (req, res, next) => {
  req.data = jwt.verify(req.cookies.jwt, secret);
  console.log(req.data);
  next();
};

// Export
module.exports = getCookies;
