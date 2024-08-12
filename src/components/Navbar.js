import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="text-3xl font-bold text-gray-100 font-montserrat">Go Ride</div>
      <div>
        <button className="mr-4 px-4 py-2 font-montserrat bg-blue-500 rounded hover:bg-blue-700 transition">Login</button>
        <button className="px-4 py-2 font-montserrat bg-blue-500 rounded hover:bg-blue-700 transition">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
