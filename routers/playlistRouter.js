const express = require("express");
const router = express.Router();
// MIDDLEWARE
const isLoggedIn = require("../middlewares/isLogged");
// MODELS
const User = require("../models/User");
const Playlist = require("../models/Playlist");
// EXPRESS VALIDATOR
const { check, validationResult } = require("express-validator");

// GET LIST OF THE USER PLAYLISTS
router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.data.userId;
  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  return res.status(200).json(user.playlists);
});
// ADD PLAYLIST
router.post(
  "/",
  [check("title").isLength({ min: 2, max: 32 })],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }
    const userId = req.data.userId;
    const { title, videoId } = req.body;
    let result;
    try {
      // use $addToSet instead of $push to keep values in array unique
      result = await User.updateOne(
        { _id: userId, "playlists.title": title },
        { $inc: { "playlists.$.num": 1 } }
      );
      if (!result.nMatched) {
        await User.updateOne(
          { _id: userId },
          { $push: { playlists: { title: title, num: 1 } } }
        );
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }
    try {
      await Playlist.create({ userId, videoId, title });
    } catch (err) {
      return res.status(400).json(err);
    }
    // res.modifiedCount; // Number of documents modified
    return res.status(200).json(result.acknowledged);
  }
);

// ADD VIDEO TO PLAYLIST
router.post("/", isLoggedIn, async (req, res) => {
  const { plTitle, videoId } = req.body;
  const userId = req.data.userId;
  try {
  } catch (err) {}
});

module.exports = router;
