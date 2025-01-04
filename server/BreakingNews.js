const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Breaking News Schema (Only stores one breaking news announcement)
const breakingNewsSchema = new mongoose.Schema({
  text: String, // The text content of the breaking news
});

// Breaking News Model (Singleton pattern for a single announcement)
const BreakingNews = mongoose.model('BreakingNews', breakingNewsSchema);

// Create or Update Breaking News (Only one document will exist)
router.post('/upload', async (req, res) => {
  try {
    const { text } = req.body;

    // Check if there's already a breaking news entry, if so, update it.
    let breakingNews = await BreakingNews.findOne();
    if (breakingNews) {
      breakingNews.text = text;
      await breakingNews.save();
      return res.status(200).json({ message: 'Breaking news updated successfully!' });
    }

    // If no breaking news exists, create a new one.
    breakingNews = new BreakingNews({ text });
    await breakingNews.save();
    res.status(201).json({ message: 'Breaking news created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error storing breaking news' });
  }
});

// Fetch Breaking News
router.get('/home', async (req, res) => {
  try {
    const breakingNews = await BreakingNews.findOne();
    if (!breakingNews) return res.status(404).json({ error: 'No breaking news found' });

    res.status(200).json(breakingNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching breaking news' });
  }
});

// Delete Breaking News
router.delete('/delete', async (req, res) => {
  try {
    const breakingNews = await BreakingNews.findOneAndDelete();
    if (!breakingNews) return res.status(404).json({ error: 'No breaking news found to delete' });

    res.status(200).json({ message: 'Breaking news deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting breaking news' });
  }
});

module.exports = router;
