const express = require("express");
const router = express.Router();
// MODEL 
const Scheduled = require("../models/Scheduled");
// MIDDLEWARE 
const isLoggedIn = require('../middlewares/isLogged');

// ADD VIDEO TO WATCH LATER (POST) uses unique compound index
router.post("/", isLoggedIn, async (req, res)=> {
  const {videoId} = req.body;
  const userId = req.data.userId;
  try {
    await Scheduled.create({userId, videoId});
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  return res.status(201).json({ message: "Video was added to watch later!" });
});
// GET WATCH LATER VIDEOS
router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.data.userId;
  let wlVideos;
  try {
    wlVideos = await Scheduled.find({userId: userId})
      .populate('videoId');
  } catch (err) { 
    return res.status(400).json({ message: err });
  }
  return res.status(200).json(wlVideos);
});

module.exports = router;