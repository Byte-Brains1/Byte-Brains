import React from 'react';
import './EventCard.css';

const EventCard = ({ event, isPastDate, onShowSubEvents }) => {
  const { title, description, date, link, image } = event;

  return (
    <div className="event-card">
      <div className="event-card-image">
        <img
          src={image || 'placeholder.jpg'} // Fallback to a placeholder if no image
          alt={title}
        />
      </div>
      <div className="event-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
        <div className="button-container">
          {!isPastDate(date) && link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              Participate Now
            </a>
          ) : (
            <span className="locked-link">Event Completed</span>
          )}
          <button onClick={() => onShowSubEvents(event)}>Show SubEvents</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
