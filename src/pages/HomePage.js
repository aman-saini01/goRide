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
    <header className="relative bg-blue-400 text-gray-50 p-[3.5rem] text-center">
      <h1 className="  text-4xl font-bold mb-6">Find Your Ride</h1>
      <div className="  bg-gray-100 p-8 rounded-[1.6rem] shadow-md text-gray-800 max-w-[20rem] max-h-[22rem] mx-auto">
        <input 
          type="text" 
          placeholder="From City" 
          className="w-full p-2 mb-4 border rounded-[1.6rem]"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="To City" 
          className="w-full p-2 mb-4 border rounded-[1.6rem]"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Number of Seats" 
          className="w-full p-2 mb-4 border rounded-[1.6rem]"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <input 
          type="date" 
          className="w-full p-2 mb-4 border rounded-[1.6rem]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded-[1.6rem] hover:bg-blue-700 transition">Search Ride</button>
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
