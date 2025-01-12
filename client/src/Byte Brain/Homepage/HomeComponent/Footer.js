// ContactUsFooter.jsx
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h2>Contact Us</h2>
                <div className="social-links">
                    <a href="https://www.instagram.com/byte_brains_club/profilecard/?igsh=MTkzdGt5amM3ajh5aw== " target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="./logo/Instagram.png" alt="Instagram" className="social-logo" />
                    </a>
                    <a href="mailto:bytebrains@gmail.com" className="social-icon">
                        <img src="./logo/gmail.png" alt="Gmail" className="social-logo" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
