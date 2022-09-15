const express = require("express");
const isLoggedIn = require("../middlewares/isLogged");
const router = express.Router();
// REPORT MODEL 
const Report = require("../models/Report");

router.post("/", isLoggedIn, async (req, res) => {
  const userId = req.data.userId;
  const {videoId, conType}  = req.body;
  try {
    await Report.create({userId, videoId, conType});
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  return res.status(201).json({ message: "Report was added!" });
});



module.exports = router;