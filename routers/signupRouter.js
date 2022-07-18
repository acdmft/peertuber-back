const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SERVER_CODE;
const cookieParser = require("cookie-parser");

// USER model 
const User = require("../models/User");

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  let user;
  try {
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  const token = jwt.sign({userId: user.id, isAdmin: user.isAdmin}, secret);
  res.cookie("jwt", token, { httpOnly: true, secure: false, expires: new Date(Date.now() + 1000 * 60 * 600)});
  res.status(201).json({ message: "User created" });
});

module.exports = router;