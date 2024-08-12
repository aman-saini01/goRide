import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Go Ride</h2>
            <p className="text-gray-200">Your trusted platform for shared rides. Safe, reliable, and affordable.</p>
          </div>
          
          {/* Links */}
          <div className="flex justify-between w-full md:w-1/2">
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><Link to="#" className="hover:underline">Home</Link></li>
                <li><Link to="#" className="hover:underline">About Us</Link></li>
                <li><Link to="#" className="hover:underline">Services</Link></li>
                <li><Link to="#" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <ul>
                <li><Link to="#" className="hover:underline">FAQs</Link></li>
                <li><Link to="#" className="hover:underline">Help Center</Link></li>
                <li><Link to="#" className="hover:underline">Terms & Conditions</Link></li>
                <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-8">
          <Link to="#" className="hover:text-yellow-500"><FontAwesomeIcon icon={faFacebookF} size="2x" /></Link>
          <Link to="#" className="hover:text-yellow-500"><FontAwesomeIcon icon={faTwitter} size="2x" /></Link>
          <Link to="#" className="hover:text-yellow-500"><FontAwesomeIcon icon={faInstagram} size="2x" /></Link>
          <Link to="#" className="hover:text-yellow-500"><FontAwesomeIcon icon={faLinkedin} size="2x" /></Link>
        </div>

        {/* Bottom Text */}
        <div className="text-center border-t border-gray-400 pt-4">
          <p>&copy; 2024 Go Ride. All rights reserved.</p>
          <p className="text-gray-300">Built with love by the Go Ride team.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
