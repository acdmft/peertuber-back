const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }, 
  playlists: {
    type: [{title: String, num: Number}]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;