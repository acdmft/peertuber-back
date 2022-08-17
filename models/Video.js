const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: { type: String },
  instance:{ type: String },
  name: { type: String },
  category:{ type: String },
  language: { type: String },
  description: { type: String },
  duration: { type: Number },
  thumbnailImg: { type: String },
  previewImg: { type: String },
  publishedAt: { type: String },
});

const Video = mongoose.model('Test_video', videoSchema);

module.exports = Video;