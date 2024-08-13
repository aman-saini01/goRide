import React, { useState } from 'react';
import RelatedSection from './RelatedSection';
import Footer from '../components/Footer'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCar, faTaxi, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
  const [toCity, setToCity] = useState('Delhi');
  const [fromCity, setFromCity] = useState('Bangalore');
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState('');

  return (
    <>
    <header className="relative  text-gray-50 p-[5rem] text-center bg-white">
   
      <h1 className="  text-4xl font-bold text-black  mb-6 ">Find Your Ride!!</h1>
      <div className=" flex flex-col overflow-hidden bg-gray-50 w-[25rem] h-[22rem]  rounded-[1.1rem] shadow-gray-400 shadow-xl text-gray-800  mx-auto w-max-[30rem]">
        <div className=" border-b-gray-300 p-2 border-b-[0.5px] ">
        <input 
          type="text" 
          placeholder="From City" 
          className="w-full  bg-gray-50 focus:outline-none p-4 "
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />
        </div>
        <div className="border-b-gray-300 p-2 border-b-[0.5px]"> 
        <input 
          type="text" 
          placeholder="To City" 
          className="w-full  bg-gray-50 focus:outline-none p-4"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />
        </div>
       <div className="border-b-gray-300 p-2 border-b-[0.5px]">
       <input 
          type="number" 
          placeholder="Number of Seats" 
          className="w-full bg-gray-50 focus:outline-none p-4"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
       </div>
       <div className="border-b-gray-300 p-2 border-b-[0.5px]">
       <input 
          type="date" 
          className="w-full border-b-gray-50 bg-gray-50 focus:outline-none p-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
       </div>
        <button className="w-full bg-blue-600 mt-0  text-white p-5 hover:bg-blue-700  transition">Search Ride</button>
      </div>
      <button className="mt-4 text-lg font-semibold bg-yellow-500 px-4 py-2 rounded-[1.6rem] hover:bg-yellow-600 transition">Become a Driver</button>
    </header>
    
      <div data-aos="fade-up">
         <RelatedSection />
      </div>
     <Footer />
    </>
  );
}

export default HomePage;
