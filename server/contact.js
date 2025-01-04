const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

// Multer Setup (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber1: { type: String, required: true },
  phoneNumber2: { type: String },
  email1: { type: String, required: true },
  email2: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);

// Create Contact
router.post('/upload', async (req, res) => {
  try {
    const { name, phoneNumber1, phoneNumber2, email1, email2, instagram, linkedin } = req.body;

    const newContact = new Contact({
      name,
      phoneNumber1,
      phoneNumber2,
      email1,
      email2,
      instagram,
      linkedin,
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating contact' });
  }
});

// Get All Contacts
router.get('/home', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// Update Contact
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber1, phoneNumber2, email1, email2, instagram, linkedin } = req.body;

    const updatedContact = { name, phoneNumber1, phoneNumber2, email1, email2, instagram, linkedin };

    const contact = await Contact.findByIdAndUpdate(id, updatedContact, { new: true });

    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json({ message: 'Contact updated successfully!', contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating contact' });
  }
});

// Delete Contact
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

module.exports = router;
