import React from 'react';
import './TeammateCard.css';

const TeammateCard = ({ name, position, section, image }) => {
  return (
    <div className="teammate-card">
      <div className="teammate-card-image">
        <img
          src={image || 'placeholder.jpg'} // Fallback to placeholder if no image
          alt={name}
        />
      </div>
      <div className="teammate-card-content">
        <h3>{name}</h3>
        <p>Position: {position}</p>
        <p>Section: {section}</p>
      </div>
    </div>
  );
};

export default TeammateCard;
