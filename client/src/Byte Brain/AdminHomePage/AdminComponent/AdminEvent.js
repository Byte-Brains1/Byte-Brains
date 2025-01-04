import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEvent.css';

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    link: '',
    image: null,
    subEvents: [],
  });
  const [editEventId, setEditEventId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/home`);
      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubEventChange = (index, field, value) => {
    const updatedSubEvents = [...formData.subEvents];
    updatedSubEvents[index][field] = value;
    setFormData({ ...formData, subEvents: updatedSubEvents });
  };

  const handleAddSubEvent = () => {
    setFormData({
      ...formData,
      subEvents: [...formData.subEvents, { title: '', description: '' }],
    });
  };

  const handleRemoveSubEvent = (index) => {
    const updatedSubEvents = [...formData.subEvents];
    updatedSubEvents.splice(index, 1);
    setFormData({ ...formData, subEvents: updatedSubEvents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'subEvents') {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      setLoading(true);
      if (editEventId) {
        if (window.confirm('Are you sure you want to update this event?')) {
          await axios.put(`${API_URL}/events/update/${editEventId}`, form);
          setEditEventId(null);
        }
      } else {
        await axios.post(`${API_URL}/events/upload`, form);
      }
      setFormData({
        title: '',
        description: '',
        date: '',
        link: '',
        image: null,
        subEvents: [],
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      setError('Error submitting event');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      link: event.link,
      image: null,
      subEvents: event.subEvents || [],
    });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this event?')) {
        await axios.delete(`${API_URL}/events/delete/${id}`);
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting event');
    }
  };

  const handleSubEventDelete = async (eventId, subEventId) => {
    try {
      if (window.confirm('Are you sure you want to delete this sub-event?')) {
        await axios.delete(`${API_URL}/events/delete-subevent/${eventId}/${subEventId}`);
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting sub-event');
    }
  };

  return (
    <div className="admin-container">
      <h1>Event Management</h1>
      {error && <p className="error-message">{error}</p>}

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Event Link"
          value={formData.link}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <div className="subevent-container">
          {formData.subEvents.map((subEvent, index) => (
            <div key={index} className="subevent-item">
              <input
                type="text"
                placeholder="Sub-event Title"
                value={subEvent.title}
                onChange={(e) => handleSubEventChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder="Sub-event Description"
                value={subEvent.description}
                onChange={(e) => handleSubEventChange(index, 'description', e.target.value)}
                required
              ></textarea>
              <button type="button" onClick={() => handleRemoveSubEvent(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-subevent-button"
            onClick={handleAddSubEvent}
          >
            + Add Sub-event
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {editEventId ? 'Update Event' : 'Add Event'}
        </button>
      </form>

      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-item">
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <div className="event-actions">
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
            {event.subEvents?.map((subEvent) => (
              <div key={subEvent._id} className="subevent-item">
                <p>
                  <strong>{subEvent.title}</strong>: {subEvent.description}
                </p>
                <button
                  onClick={() => handleSubEventDelete(event._id, subEvent._id)}
                >
                  Delete Sub-event
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvent;
