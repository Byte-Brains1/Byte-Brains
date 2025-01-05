import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTeammates.css';

const AdminTeammates = () => {
  const [teammates, setTeammates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    section: '',
    image: null,
  });
  const [editTeammateId, setEditTeammateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all teammates
  const fetchTeammates = async () => {
    try {
      const response = await axios.get(`${API_URL}/teammates/home`);
      setTeammates(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching teammates');
    }
  };

  useEffect(() => {
    fetchTeammates();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });

    try {
      setLoading(true);
      if (editTeammateId) {
        if (window.confirm('Are you sure you want to update this teammate?')) {
          await axios.put(
            `${API_URL}/teammates/update/${editTeammateId}`,
            form
          );
          setEditTeammateId(null);
        }
      } else {
        await axios.post(`${API_URL}/teammates/upload`, form);
      }
      setFormData({ name: '', position: '', section: '', image: null });
      fetchTeammates();
    } catch (err) {
      console.error(err);
      setError('Error submitting teammate data');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (teammate) => {
    setEditTeammateId(teammate._id);
    setFormData({
      name: teammate.name,
      position: teammate.position,
      section: teammate.section,
      image: null,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this teammate?')) {
        await axios.delete(`${API_URL}/teammates/delete/${id}`);
        fetchTeammates();
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting teammate');
    }
  };

  return (
    <div className="admin-container">
      <h1>Teammates Management</h1>
      {error && <p className="error-message">{error}</p>}

      <form className="teammate-form" onSubmit={handleSubmit}>
  <h2>{editTeammateId ? 'Edit Teammate' : 'Add New Teammate'}</h2>
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleInputChange}
    required
  />
  <input
    type="text"
    name="position"
    placeholder="Position"
    value={formData.position}
    onChange={handleInputChange}
    required
  />
  <input
    type="text"
    name="section"
    placeholder="Section"
    value={formData.section}
    onChange={handleInputChange}
    required
  />
  <input type="file" name="image" onChange={handleFileChange} />
  <button type="submit" disabled={loading}>
    {editTeammateId ? 'Update Teammate' : 'Add Teammate'}
  </button>
</form>


      <div className="teammate-list">
        {teammates.map((teammate) => (
          <div key={teammate._id} className="teammate-item">
            <img src={teammate.image} alt={teammate.name} />
            <h3>{teammate.name}</h3>
            <p>{teammate.position}</p>
            <p>{teammate.section}</p>
            <div className="teammate-actions">
              <button onClick={() => handleEdit(teammate)}>Edit</button>
              <button onClick={() => handleDelete(teammate._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeammates;
