"use client";

import React from "react";

const SidebarFreshbooks = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-4">Try FreshBooks</h3>
      <p className="text-gray-600 mb-4">
        The best accounting software for small business owners and freelancers.
      </p>
      <a
        href="https://freshbooks.pxf.io/c/1234567/1064077/13524"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Start Free Trial
      </a>
    </div>
  );
};

export default SidebarFreshbooks;
