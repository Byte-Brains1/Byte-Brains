import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './HomeComponent/EventCard';
import SubEventModal from './HomeComponent/SubEventModal';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/home`);

      const now = new Date();

      const sortedEvents = response.data
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          // Prioritize upcoming events (date >= today) over completed events (date < today)
          if (dateA >= now && dateB < now) return -1;
          if (dateA < now && dateB >= now) return 1;

          // Within the same group, sort by ascending date
          return dateA - dateB;
        });

      setEvents(sortedEvents);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const isPastDate = (date) => new Date(date) < new Date();

  const handleShowSubEvents = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="event-container">
        <h1>Events</h1>
        <div className="event-list">
          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isPastDate={isPastDate}
                onShowSubEvents={handleShowSubEvents}
              />
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
      {selectedEvent && (
        <SubEventModal
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Home;
