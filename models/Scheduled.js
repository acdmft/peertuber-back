const mongoose = require('mongoose');
const { Schema } = mongoose; 
// SCHEMA FOR VIDEOS IN WATCH LATER LIST
const scheduledSchema = Schema ({
  videoId: { type: Schema.Types.ObjectId, ref: 'Test_video' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Scheduled = mongoose.model('scheduled', scheduledSchema);
module.exports = Scheduled;