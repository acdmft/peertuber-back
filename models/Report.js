// model to complain on the video content/desciption (Report abusive content)
const mongoose = require('mongoose');
const { Schema } = mongoose; 

const reportSchema = Schema({
  videoId: { type: Schema.Types.ObjectId, ref: 'Test_video' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  kind: { type: String }
});

const Report = mongoose.model('report', reportSchema);
module.exports = Report;