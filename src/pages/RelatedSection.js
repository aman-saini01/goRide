import React from 'react';

const RelatedSection = () => {
  return (
    <section className="p-10 max-w-[30 rem] h-[30rem] bg-blue-400">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="p-4 max-w-[30rem]">
          <h3 className="text-xl font-semibold mb-2">Affordable Rides</h3>
          <p className="text-gray-700">Get the best deals on rides with verified drivers.</p>
        </div>
        <div className="p-4 max-w-sm">
          <h3 className="text-xl font-semibold mb-2">Reliable Drivers</h3>
          <p className="text-gray-700">All drivers are verified for safety and reliability.</p>
        </div>
        <div className="p-4 max-w-sm">
          <h3 className="text-xl font-semibold mb-2">Comfortable Rides</h3>
          <p className="text-gray-700">Travel in comfort with well-maintained vehicles.</p>
        </div>
      </div>
    </section>
  );
}

export default RelatedSection;
