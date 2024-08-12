// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import CitySearchInput from '../components/rides/CitySearchInput';
import RideFilter from '../components/rides/RideFilter';
// import RideList from '../components/rides/RideList';
import '../styles/homepage.css'; // Additional custom styles

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 animate-fadeInDown">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg mb-12 animate-fadeInUp">
            Book your next ride with ease and travel in comfort.
          </p>
          <CitySearchInput />
        </div>
      </section>

      {/* Ride Filter and List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <RideFilter />
          {/* <RideList /> */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-400 py-12 text-center text-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Become a Driver</h2>
          <p className="text-lg mb-8">
            Share your ride and earn money by becoming a driver.
          </p>
          <Link
            to="/signup-driver"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Sign Up as a Driver
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8 text-indigo-600">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slideUp">
              <p className="text-gray-800 mb-4">
                "The best ride-sharing experience I've had. Super easy to use and very reliable."
              </p>
              <h4 className="font-semibold text-indigo-600">Jane Doe</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slideUp">
              <p className="text-gray-800 mb-4">
                "Affordable and convenient. I always find a ride whenever I need one."
              </p>
              <h4 className="font-semibold text-indigo-600">John Smith</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slideUp">
              <p className="text-gray-800 mb-4">
                "A great way to save money on travel and meet new people. Highly recommend!"
              </p>
              <h4 className="font-semibold text-indigo-600">Emily Johnson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-indigo-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Shared Ride. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/" className="hover:text-amber-400 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition duration-300">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition duration-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
