const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/" , async(req,res) =>{
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({message:"Error saving contact"});
        
    }
});


router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

module.exports = router;

