// src/components/rides/RideCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const RideCard = ({ ride }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
      <div className="p-4">
        <h3 className="text-2xl font-bold text-purple-600">{ride.driver.name}</h3>
        <p className="text-gray-600">{ride.car.model} - {ride.car.licensePlate}</p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-2 text-gray-800 font-semibold">{ride.rating}</span>
        </div>
        <div className="mt-4">
          <p className="text-gray-800">Departure: {ride.departureTime}</p>
          <p className="text-gray-800">Arrival: {ride.arrivalTime}</p>
          <p className="text-gray-800">Seats Available: {ride.availableSeats}</p>
          <p className="text-gray-800">Price: ${ride.fare}</p>
        </div>
        <Link
          to={`/ride-details/${ride.id}`}
          className="block mt-4 bg-purple-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RideCard;
