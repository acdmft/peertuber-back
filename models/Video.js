const mongoose = require('mongoose');
const video_collection = process.env.VIDEO_COLL;

const Instance = new mongoose.Schema({
  host: { type: String },
  name: { type: String },
  shortDescription: { type: String },
  languages: { type: [String] },
  totalUsers: { type: Number },
  totalLocalVideos: { type: Number }
});

const videoSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  url: { type: String },
  instance:{type: Instance },
  name: { type: String },
  category:{ type: String },
  language: { type: String },
  description: { type: String },
  duration: { type: Number },
  thumbnailImg: { type: String },
  previewImg: { type: String },
  publishedAt: { type: String },
  likes: { type: Number, default: 0 }
});

const Video = mongoose.model(video_collection, videoSchema);

module.exports = Video;