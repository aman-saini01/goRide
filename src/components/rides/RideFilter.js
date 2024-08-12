// src/components/rides/RideFilter.js
import React, { useState } from 'react';

const RideFilter = () => {
  const [filters, setFilters] = useState({
    date: '',
    seatCapacity: '',
    priceRange: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center space-x-4 p-6 bg-purple-100 rounded-xl shadow-lg">
      <div className="flex flex-col">
        <label className="text-lg font-semibold mb-2 text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold mb-2 text-gray-700">Seats</label>
        <select
          name="seatCapacity"
          value={filters.seatCapacity}
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          <option value="">Any</option>
          <option value="1">1 Seat</option>
          <option value="2">2 Seats</option>
          <option value="3">3 Seats</option>
          <option value="4">4+ Seats</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold mb-2 text-gray-700">Price</label>
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          <option value="">Any</option>
          <option value="low">$ - Low</option>
          <option value="medium">$$ - Medium</option>
          <option value="high">$$$ - High</option>
        </select>
      </div>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300">
        Apply Filters
      </button>
    </div>
  );
};

export default RideFilter;
