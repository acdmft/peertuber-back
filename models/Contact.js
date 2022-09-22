const mongoose = require("mongoose");
const { Schema } = mongoose; 

const contactSchema = Schema({
  email: { type: String },
  name: { type: String },
  subject: { type: String },
  message: {type: String}
});

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;
