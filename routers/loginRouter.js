const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SERVER_CODE;
// USER MODEL
const User = require("../models/User");
// EXPRESS VALIDATOR
const { check, validationResult } = require("express-validator");

// POST /LOGIN
router.post(
  "/",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    // validate request body with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    // verify that user with such email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    // check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    //create token
    const token = jwt.sign({ userId: user.id }, secret);
    // put token in the cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 600),
    });
    // send cookie to the client
    res.json({
      message: "Here is your cookie",
    });
  }
);

module.exports = router;
