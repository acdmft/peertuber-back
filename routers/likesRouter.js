const express = require("express");
const router = express.Router();
// LIKE MODEL 
const Like = require("../models/Like");
// MIDDLEWARE 
const isLoggedIn = require('../middlewares/isLogged');

//
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


router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.data.userId;
  let likedVideos;
  try {
    likedVideos = await Like.find({userId: userId})
      .populate('videoId');
  } catch (err) { 
    return res.status(400).json({ message: err });
  }
  return res.status(200).json(likedVideos);
});

module.exports = router;