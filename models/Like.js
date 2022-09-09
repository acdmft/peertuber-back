const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = Schema({
  videoId: { type: Schema.Types.ObjectId, ref: 'Test_video' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;