const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Event Schema
const subEventSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  link: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  subEvents: [subEventSchema],
});

// Event Model
const Event = mongoose.model('Event', eventSchema);

// Create Event
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, link, subEvents } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newEvent = new Event({
      title,
      description,
      date: date || Date.now(),
      link,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      subEvents: subEvents ? JSON.parse(subEvents) : [],
    });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating event' });
  }
});

// Fetch All Events
router.get('/home', async (req, res) => {
  try {
    const events = await Event.find();
    const updatedEvents = events.map(event => ({
      ...event._doc,
      image: event.image
        ? `data:${event.image.contentType};base64,${event.image.data.toString('base64')}`
        : null,
    }));
    res.status(200).json(updatedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Update Event
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, link, subEvents } = req.body;
    const updatedEvent = { title, description, date, link };

    if (req.file) {
      updatedEvent.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    if (subEvents) {
      updatedEvent.subEvents = JSON.parse(subEvents);
    }

    const event = await Event.findByIdAndUpdate(id, updatedEvent, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Delete Event
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

// Add SubEvent to an Event
router.post('/add-subevent/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.subEvents.push({ title, description });
    await event.save();

    res.status(200).json({ message: 'SubEvent added successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding subevent' });
  }
});

// Update SubEvent
router.put('/update-subevent/:eventId/:subEventId', async (req, res) => {
  try {
    const { eventId, subEventId } = req.params;
    const { title, description } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const subEvent = event.subEvents.id(subEventId);
    if (!subEvent) return res.status(404).json({ error: 'SubEvent not found' });

    subEvent.title = title || subEvent.title;
    subEvent.description = description || subEvent.description;
    await event.save();

    res.status(200).json({ message: 'SubEvent updated successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating subevent' });
  }
});

// Delete SubEvent
router.delete('/delete-subevent/:eventId/:subEventId', async (req, res) => {
  try {
    const { eventId, subEventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const subEvent = event.subEvents.id(subEventId);
    if (!subEvent) return res.status(404).json({ error: 'SubEvent not found' });

    subEvent.remove();
    await event.save();

    res.status(200).json({ message: 'SubEvent deleted successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting subevent' });
  }
});

module.exports = router;
