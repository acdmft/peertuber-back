const express = require('express');
const router = express.Router();
// MIDDLEWARE 
const isLoggedIn = require('../middlewares/isLogged');
// USER MODEL 
const User = require('../models/User');
// EXPRESS VALIDATOR
const { check, validationResult } = require("express-validator");


// GET LIST OF THE USER PLAYLISTS
router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.data.userId;
  let user;
  try { 
    user = await User.findOne({_id: userId});
  } catch (err) {
    return res.status(400).json({message: err});
  }
  return res.status(200).json(user.playlists);
});
// ADD PLAYLIST
router.patch("/", [check('title').isLength({min: 2, max: 32})], isLoggedIn, async (req, res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  };
  const userId = req.data.userId;
  const title = req.body.title;
  try {
    console.log(title, userId);
    await User.updateOne({_id: userId}, {$push: { playlists: title }});
  } catch (err) {
    return res.status(400).json(err)
  }
  // res.modifiedCount; // Number of documents modified
  return res.status(200).json(res.acknowledged);
});

module.exports = router;