const express = require("express");
const { isRequiredInputField } = require("graphql");
const router = express.Router();
// VIDEO MODEL
const Video = require("../models/Video");

router.get("/", async (req, res) => {
  const category = req.query.cat;
  console.log(category);
  // let query = { category: category};
  // let vidCount = await Video.countDocuments(query);
  // let vidCount = await Video.distinct("language")
  let vidCount = await Video.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  // let arr = vidCount.sort((a, b) => {
  //   return b.count - a.count;
  // });
  // console.log(arr[0]);
  return res.status(200).json({ message: vidCount });
});

router.get("/vid", async (req, res) => {
  let cat = req.query.cat;
  let cursor = await Video.find({"category": cat, "_id": {"$nin": req.body.videoId}}).count();
  // let cursor = await Video.find({"category": cat}).count();
  // console.log(req.body)
  // cursor.stream().on("data", (data) => console.log(data));
  // console.log(cursor)

  return res.status(200).json({message: cursor})
});

module.exports = router;
