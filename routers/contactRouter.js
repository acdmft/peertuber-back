const express = require("express");
const router = express.Router();
// CONTACT MODEL 
const Contact = require("../models/Contact");

// POST MESSAGE FROM CONTACT FORM 
router.post("/", async(req, res)=> {
  const { email, name, subject, message} = req.body;
  try {
    await Contact.create({email: email, name: name, subject: subject, message: message});
  } catch (err) {
    return res.status(400).json({message: err});
  }
  return res.status(201).json({message: "Contact message was recorded."})
})

module.exports = router;
