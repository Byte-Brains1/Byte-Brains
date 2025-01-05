import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFooter.css';

const AdminFooter = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber1: '',
    phoneNumber2: '',
    email1: '',
    email2: '',
    instagram: '',
    linkedin: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts/home`);
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        console.error('Contacts data is not an array:', response.data);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]); // In case of an error, set contacts to an empty array
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/contacts/update/${editingId}`, formData);
        setIsEditing(false);
        setEditingId(null);
        alert('Contact updated successfully!');
      } else {
        await axios.post(`$API_URL}/contacts/upload`, formData);  // Fixed POST request URL
        alert('Contact created successfully!');
      }
      setFormData({
        name: '',
        phoneNumber1: '',
        phoneNumber2: '',
        email1: '',
        email2: '',
        instagram: '',
        linkedin: '',
      });
      fetchContacts();  // Refresh contacts list after submitting
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('There was an error with the request.');
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      phoneNumber1: contact.phoneNumber1,
      phoneNumber2: contact.phoneNumber2,
      email1: contact.email1,
      email2: contact.email2,
      instagram: contact.instagram,
      linkedin: contact.linkedin,
    });
    setIsEditing(true);
    setEditingId(contact._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/delete/${id}`);
      alert('Contact deleted successfully!');
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('There was an error deleting the contact.');
    }
  };

  return (
    <div className="admin-footer">
      <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="phoneNumber1"
            value={formData.phoneNumber1}
            onChange={handleChange}
            placeholder="Phone Number 1"
            required
          />
          <input
            type="text"
            name="phoneNumber2"
            value={formData.phoneNumber2}
            onChange={handleChange}
            placeholder="Phone Number 2"
          />
          <input
            type="email"
            name="email1"
            value={formData.email1}
            onChange={handleChange}
            placeholder="Email 1"
            required
          />
          <input
            type="email"
            name="email2"
            value={formData.email2}
            onChange={handleChange}
            placeholder="Email 2"
          />
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram"
          />
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
          />
        </div>
        <button type="submit">{isEditing ? 'Update Contact' : 'Add Contact'}</button>
      </form>

      <div className="contacts-list">
        <h3>All Contacts</h3>
        <ul>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <li key={contact._id}>
                <div className="contact-info">
                  <p><strong>{contact.name}</strong></p>
                  <p>{contact.phoneNumber1}</p>
                  <p>{contact.email1}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(contact)}>Edit</button>
                  <button onClick={() => handleDelete(contact._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No contacts available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminFooter;
