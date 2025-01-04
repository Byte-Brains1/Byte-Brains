import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Footer.css"; // Importing footer-specific styles

function Footer() {
  const [contacts, setContacts] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    axios
      .get(`${API_URL}/contacts/home`) // Your backend endpoint
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div className="contact-info" key={contact._id}>
              <h2>{contact.name}</h2>
              <p>
                <strong>Phone:</strong> {contact.phoneNumber1}{" "}
                {contact.phoneNumber2 && `/ ${contact.phoneNumber2}`}
              </p>
              <p>
                <strong>Email:</strong> {contact.email1}{" "}
                {contact.email2 && `/ ${contact.email2}`}
              </p>
              <p>
                <strong>Instagram:</strong> {contact.instagram}
              </p>
              <p>
                <strong>LinkedIn:</strong> {contact.linkedin}
              </p>
            </div>
          ))
        ) : (
          <p>No contact information available.</p>
        )}
      </div>

      <div className="footer-logo">
        <img src="logo.png" alt="Logo" />
        <p>&copy; 2024 Contact App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
