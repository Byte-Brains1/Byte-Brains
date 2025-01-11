import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeammateCard from './HomeComponent/TeammateCard';
import './Teammates.css';
import './Home.css';


const Teammates = () => {
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchTeammates = async () => {
    try {
      const response = await axios.get(`${API_URL}/teammates/home`);
      setTeammates(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch teammates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeammates();
  }, []);

  return (
    <>
     <div className='event-container'>
     <div>
      <h1>Team Members</h1>
    </div>
    <div className="teammate-list">
      {loading ? ( 
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : teammates.length > 0 ? (
        teammates.map((teammate) => (
          <TeammateCard
            key={teammate._id}
            position={teammate.position}
            name={teammate.name}
            section={teammate.section}
            image={teammate.image}
          />
        ))
      ) : (
        <p>No teammates available</p>
      )}
    </div>
     </div>
    </>
  );
};

export default Teammates;
