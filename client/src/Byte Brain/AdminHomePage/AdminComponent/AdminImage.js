import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminImage.css';

const AdminImage = () => {
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/images/image`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [images]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('title', title);

    try {
      await axios.post(`${API_URL}/images/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewImage(null);
      setTitle('');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Handle image edit
  const handleImageEdit = async (id) => {
    const imageToEdit = images.find((img) => img._id === id);
    setTitle(imageToEdit.title);
    setSelectedImage(id);
    setImageData(imageToEdit.image);
  };

  // Handle image update
  const handleImageUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', newImage || imageData);
    formData.append('title', title);

    try {
      await axios.put(`${API_URL}/images/update/${selectedImage}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSelectedImage(null);
      setNewImage(null);
      setTitle('');
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  // Handle image delete with confirmation
  const handleImageDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');

    if (isConfirmed) {
      try {
        await axios.delete(`${API_URL}/images/delete/${id}`);
        // Remove the deleted image from the list without fetching all again
        setImages(images.filter((image) => image._id !== id));
        alert('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <div className="admin-image">
      <h2>Admin Image Management</h2>

      {/* Image Upload Form */}
      <div className="form-container">
        <form onSubmit={selectedImage ? handleImageUpdate : handleImageUpload}>
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            accept="image/*"
            required
          />
          <button type="submit">{selectedImage ? 'Update Image' : 'Upload Image'}</button>
        </form>
      </div>

      {/* Image List */}
      <div className="image-list">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <h3>{image.title}</h3>
            <img src={image.image} alt={image.title} className="image-preview" />
            <div className="image-actions">
              <button onClick={() => handleImageEdit(image._id)}>Edit</button>
              <button onClick={() => handleImageDelete(image._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminImage;
