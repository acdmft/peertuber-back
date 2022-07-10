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

  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "User created" });
});

module.exports = router;