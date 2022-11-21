const express = require("express");
const isLoggedIn = require("../middlewares/isLogged");
const router = express.Router();
// USER MODEL
const User = require("../models/User"); 

router.get("/", isLoggedIn, async (req, res) => {
  let userId = req.data.userId;
  let user;
  try {
    const projection = { _id: 0, password: 0, isAdmin: 0, isModerator: 0 }
    user = await User.findOne({ _id: userId }, projection )
  } catch (err) {
    return res.status(400).json({message: err});
  }
  return res.status(200).json(user);
});

router.delete("/", isLoggedIn, async (req, res) => {
  let userId = req.data.userId;
  let result;
  try {
    result = await User.deleteOne({ _id: userId });
  } catch (err) {
    return res.status(400).json( { error: err });
  }
  res.clearCookie("jwt");
  return res.status(200).json(result);
});

module.exports = router;