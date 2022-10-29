const express = require("express");
const router = express.Router();
// LIKE MODEL 
const Like = require("../models/Like");
// VIDEO MODEL
const Video = require("../models/Video");
// MIDDLEWARE 
const isLoggedIn = require('../middlewares/isLogged');

// ADD LIKE
router.post("/", isLoggedIn, async (req, res) => {
  const {videoId} = req.body;
  const userId = req.data.userId;
  try {
    await Like.create({userId, videoId});
    await Video.updateOne({_id: videoId}, { $inc: { "likes": 1 } });
  } catch (err) {
    return res.status(400).json({ error: err.code });
  }
  return res.status(201).json({ message: "Like was added!" });
});

// GET LIKED VIDEOS
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