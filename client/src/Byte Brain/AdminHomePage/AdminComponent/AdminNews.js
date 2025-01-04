import React, { useState } from 'react';
import axios from 'axios';
import './AdminNews.css'; // Import the CSS file for styling

function AdminNews() {
  const [text, setText] = useState(''); // State to store breaking news text
  const [message, setMessage] = useState(''); // State for success or error messages
  const [newsId, setNewsId] = useState(''); // State to store the breaking news ID (used for deletion)
  const [news, setNews] = useState(null); // State to store the fetched breaking news

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch breaking news on component load
  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/home`);
      setNews(response.data); // Set the fetched news data
    } catch (error) {
      setMessage('Error fetching breaking news');
    }
  };

  // Upload new breaking news
  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:8000/news/upload', { text });
      setMessage(response.data.message);
      setText('');
      fetchBreakingNews(); // Fetch updated news after uploading
    } catch (error) {
      setMessage('Error uploading breaking news');
    }
  };

  // Delete breaking news
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/news/delete');
      setMessage(response.data.message);
      fetchBreakingNews(); // Fetch updated news after deletion
    } catch (error) {
      setMessage('Error deleting breaking news');
    }
  };

  // Fetch breaking news when the component mounts
  React.useEffect(() => {
    fetchBreakingNews();
  }, []);

  return (
    <div className="admin-news">
      <h1>Admin News</h1>
      <div className="news-box">
        <h2>Upload Breaking News</h2>
        <textarea
          className="news-text"
          placeholder="Enter the breaking news here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" onClick={handleUpload}>Upload News</button>
      </div>
      {message && <p className="message">{message}</p>}
      
      <div className="news-box">
        <h2>Current Breaking News</h2>
        {news ? (
          <>
            <p>{news.text}</p>
            <button className="btn delete-btn" onClick={handleDelete}>Delete News</button>
          </>
        ) : (
          <p>No breaking news found</p>
        )}
      </div>
    </div>
  );
}

export default AdminNews;
