"use client";

import React from "react";

const AffiliateBanner = () => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md my-6 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold">Boost Your Productivity</h3>
        <p className="text-blue-100">
          Get the best tools to streamline your workflow today.
        </p>
      </div>
      <a
        href="#"
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
      >
        Get Started
      </a>
    </div>
  );
};

export default AffiliateBanner;
