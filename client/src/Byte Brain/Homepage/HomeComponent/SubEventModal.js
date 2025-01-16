import React from 'react';
import './SubEventModal.css';

const SubEventModal = ({ event, onClose, isPastDate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{event.title}</h2>
          <button className="close-button" onClick={onClose}>
            ✖ Close
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <img src={event.image || 'placeholder.jpg'} alt={event.title} />
          </div>
          <div className="modal-subevents">
            {event.subEvents.length > 0 ? (
              event.subEvents.map((subEvent, index) => (
                <div key={index} className="subevent-item">
                  <h3>{subEvent.title}</h3>
                  <p>{subEvent.description}</p>
                </div>
              ))
            ) : (
              <p>No subevents available</p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubEventModal;
