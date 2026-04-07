"use client";

import React from "react";

const AffiliateBanner = () => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md my-6 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold">Need Reliable Hosting?</h3>
        <p className="text-blue-100">
          SiteGround delivers managed WordPress hosting with 24/7 support — trusted by over 2 million domains.
        </p>
      </div>
      <a
        href="/go/siteground"
        target="_blank"
        rel="nofollow noopener sponsored"
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
      >
        Try SiteGround
      </a>
    </div>
  );
};

export default AffiliateBanner;
