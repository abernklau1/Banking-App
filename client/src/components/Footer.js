import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-icons">
          <a href="https://www.facebook.com/">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com/?lang=en">
            <FaTwitter />
          </a>
          <a href="https://www.tiktok.com/en/">
            <FaTiktok />
          </a>
          <a href="https://www.linkedin.com/">
            <FaLinkedinIn />
          </a>
        </div>
        <p className="copyright">Copyright 2022 Andrew Bernklau</p>
      </div>
    </footer>
  );
};

export default Footer;
