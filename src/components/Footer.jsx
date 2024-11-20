import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base2 text-textPrimary py-8 text-center">
      <p className="text-sm mb-4">© 2024 NoteSpace. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mb-4">
        <Link to="/about-us" className="text-base hover:text-primary transition duration-300">
          About Us
        </Link>
        <Link to="/contact-us" className="text-base hover:text-primary transition duration-300">
          Contact Us
        </Link>
        <Link to="/privacy-policy" className="text-base hover:text-primary transition duration-300">
          Privacy Policy
        </Link>
      </div>
      <p className="text-sm">Follow us on:</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="text-base hover:text-primary transition duration-300">
          Facebook
        </a>
        <a href="#" className="text-base hover:text-primary transition duration-300">
          Twitter
        </a>
        <a href="#" className="text-base hover:text-primary transition duration-300">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
