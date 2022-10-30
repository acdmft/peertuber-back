const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SERVER_CODE;

// USER MODEL 
const User = require("../models/User");
// EXPRESS VALIDATOR
const { check, validationResult } = require("express-validator");

// POST /SIGNUP 
router.post("/", [
  check('name').isLength({min: 2 }),
  check('email').isEmail(),
  check('password').isLength({
    min: 6
  })
], async (req, res) => {
  // check if request body is valid with express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  };
  // check if email is unique
  const emailIsNotUnique = await User.findOne({email: req.body.email});
  if (emailIsNotUnique) {
    return res.status(400).json({ message: "Such email already exist" });
  };
  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  let user;
  try {
    user = await User.create({
      // _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  const token = jwt.sign({userId: user.id, isAdmin: user.isAdmin}, secret);
  res.cookie("jwt", token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 1000 * 60 * 600)});
  res.status(201).json({ message: "User created" });
});

module.exports = router;