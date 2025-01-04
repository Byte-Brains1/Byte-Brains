import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Image.css';

const API_URL = process.env.REACT_APP_API_URL;

function Image() {
  // State to store the images data and the current index
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch images from the backend
    async function fetchImages() {
      try {
        const response = await axios.get(`${API_URL}/images/image`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    // Autoplay functionality: change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [images]);

  // Show the next image when the "Next" button is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Show the previous image when the "Previous" button is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="images">
      <h1>Gallery</h1>
      <div id="image-container">
        {images.length > 0 && (
          <img
            src={images[currentIndex].image}
            alt={images[currentIndex].title}
            className="image"
          />
        )}
      </div>
      <div className="controls">
        <button className="button" onClick={handlePrev}>
          Previous
        </button>
        <button className="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Image;
