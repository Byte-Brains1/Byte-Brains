const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Teammate Schema
const teammateSchema = new mongoose.Schema({
  name: String,
  position: String,
  section: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

// Teammate Model
const Teammate = mongoose.model('Teammate', teammateSchema);

// Create Teammate
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, position, section } = req.body;

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newTeammate = new Teammate({
      name,
      position,
      section,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newTeammate.save();
    res.status(201).json({ message: 'Teammate uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error storing teammate data' });
  }
});

// Fetch All Teammates
router.get('/home', async (req, res) => {
  try {
    const teammates = await Teammate.find();
    const updatedTeammates = teammates.map((teammate) => ({
      ...teammate._doc,
      image: teammate.image
        ? `data:${teammate.image.contentType};base64,${teammate.image.data.toString('base64')}`
        : null,
    }));
    res.status(200).json(updatedTeammates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching teammates' });
  }
});

// Update Teammate
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, section } = req.body;

    const updatedTeammate = { name, position, section };

    if (req.file) {
      updatedTeammate.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const teammate = await Teammate.findByIdAndUpdate(id, updatedTeammate, { new: true });
    if (!teammate) return res.status(404).json({ error: 'Teammate not found' });

    res.status(200).json({ message: 'Teammate updated successfully!', teammate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating teammate' });
  }
});

// Delete Teammate
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const teammate = await Teammate.findByIdAndDelete(id);

    if (!teammate) return res.status(404).json({ error: 'Teammate not found' });

    res.status(200).json({ message: 'Teammate deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting teammate' });
  }
});

module.exports = router;
