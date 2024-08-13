import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-[4.6rem] bg-blue-500 text-white shadow-md shadow-black">
      <div className="text-3xl font-bold ml-[8rem] text-gray-50 font-montserrat">Go Ride</div>
      <div className="mr-[8rem]">
        <button className="mr-4 px-4 py-2 text-[19px] font-normal font-montserrat bg-blue-500 rounded hover:bg-blue-700 transition">Login</button>
        <button className="px-4 py-2 text-[19px] font-medium font-montserrat bg-blue-500 rounded hover:bg-blue-700 transition">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
