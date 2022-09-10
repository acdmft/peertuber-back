const mongoose = require("mongoose");
const Schema = mongoose;

const playlistSchema = Schema({
  title: { type: String },
  videoId: { type: Schema.Types.ObjectId, ref: 'Test_video' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Playlist = new mongoose.model('playlist', playlistSchema);
module.exports = Playlist;