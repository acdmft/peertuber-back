const express = require("express");
const router = express.Router();

const Video = require("../models/Video");

router.get("/", async (req, res) => {
  let category = req.query.category;
  try {
    videos =
      category === "all"
        ? await Video.aggregate([{ $sample: { size: 12 } }])
        : await Video.aggregate([
            { $match: { category: category } },
            { $sample: { size: 12 } },
          ]);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json(videos);
});

module.exports = router;
