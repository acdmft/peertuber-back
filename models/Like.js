const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  videoId: { type: mongoose.ObjectId, ref: 'Test_video' },
  userId: { type: mongoose.ObjectId, ref: 'User' }
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;