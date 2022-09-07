const express = require("express");
const router = express.Router();
// LIKE MODEL 
const Like = require("../models/Like");
// MIDDLEWARE 
const isLoggedIn = require('../middlewares/isLogged');

router.post("/", isLoggedIn, async (req, res) => {
  const {videoId} = req.body;
  const userId = req.data.userId;
  try {
    await Like.create({userId, videoId});
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  return res.status(201).json({ message: "Like was added!" });
});

module.exports = router;