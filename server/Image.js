const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image Schema
const imageSchema = new mongoose.Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

// Image Model
const Image = mongoose.model('Image', imageSchema);

// Create Image (Upload)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { title } = req.body;

    const newImage = new Image({
      title,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Fetch All Images
router.get('/image', async (req, res) => {
  try {
    const images = await Image.find();
    const updatedImages = images.map((image) => ({
      ...image._doc,
      image: image.image
        ? `data:${image.image.contentType};base64,${image.image.data.toString('base64')}`
        : null,
    }));

    res.status(200).json(updatedImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Update Image
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedImage = { title };

    if (req.file) {
      updatedImage.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const image = await Image.findByIdAndUpdate(id, updatedImage, { new: true });
    if (!image) return res.status(404).json({ error: 'Image not found' });

    res.status(200).json({ message: 'Image updated successfully', image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating image' });
  }
});

// Delete Image
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

module.exports = router;
