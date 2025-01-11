// ContactUsFooter.jsx
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h2>Contact Us</h2>
                <div className="social-links">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="./logo/Instagram.png" alt="Instagram" className="social-logo" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="./logo/Linkedin.png" alt="LinkedIn" className="social-logo" />
                    </a>
                    <a href="mailto:bytebrains@gmail.com" target="_blank" className="social-icon" rel="noopener noreferrer">
                        <img src="./logo/gmail.png" alt="Gmail" className="social-logo" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
