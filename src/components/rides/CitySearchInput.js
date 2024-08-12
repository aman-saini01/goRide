// src/components/rides/CitySearchInput.js
import React, { useState } from 'react';

const CitySearchInput = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Mockup function for city suggestions
    if (value.length > 1) {
      setSuggestions([
        `${value} City 1`,
        `${value} City 2`,
        `${value} City 3`,
      ]);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your destination city..."
        className="w-full py-3 px-5 rounded-full text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white mt-2 shadow-lg rounded-lg max-h-48 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-5 py-2 hover:bg-purple-100 cursor-pointer"
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearchInput;
