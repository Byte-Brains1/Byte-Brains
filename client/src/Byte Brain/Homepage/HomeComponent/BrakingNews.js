import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './BreakingNews.css'; // Assuming custom CSS for styling

function BreakingNews() {
  const [news, setNews] = useState(null); // State to store the breaking news text
  const [error, setError] = useState(null); // State to store any error messages
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch the breaking news from the backend when the component mounts
    async function fetchBreakingNews() {
      try {
        const response = await axios.get(`${API_URL}/news/home`);
        setNews(response.data.text); // Assuming the text is in 'text' field in response
      } catch (error) {
        console.error('Error fetching breaking news:', error);
        setError('Error fetching breaking news');
      }
    }

    fetchBreakingNews();
  }, []); // Empty dependency array, so this runs only once when the component mounts

  return (
    <div className="breaking-news">
      {/* <h1>Breaking News</h1> */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="news-marquee">
          <marquee style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {news ? news : 'Loading breaking news...'}
          </marquee>
        </div>
      )}
    </div>
  );
}

export default BreakingNews;
