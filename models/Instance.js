const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema({
  host: { type: String },
  name: { type: String },
  shortDescription: { type: String },
  languages: { type: [String] },
  totalUsers: { type: Number },
  totalLocalVideos: { type: Number }
});

const Instance = mongoose.model('instance', instanceSchema);
module.exports = Instance; 