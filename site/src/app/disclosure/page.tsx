import React from 'react';

export default function DisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Affiliate & Advertising Disclosure</h1>
      <p className="mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Affiliate Links</h2>
        <p className="mb-4">
          AI Productivity Hub is a participant in several affiliate programs. This means that we may earn a commission 
          when you click on or make a purchase through certain links on our site. This comes at no additional cost to you.
        </p>
        <p>
          These commissions help us maintain the site and continue providing high-quality content and reviews of AI tools. 
          We only recommend products and services that we believe provide value to our readers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advertising (Google AdSense)</h2>
        <p>
          This website uses Google AdSense to display advertisements. Google uses cookies to serve ads based on your 
          previous visits to our website or other websites on the Internet. You may opt out of personalized 
          advertising by visiting Google's Ad Settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Unbiased Reviews</h2>
        <p>
          Our reviews and comparisons are based on thorough research and testing. While we may receive commissions for 
          some of the tools we feature, our opinions remain unbiased and independent. The compensation received does 
          not influence the editorial content, topics, or posts made on this website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions regarding our affiliate and advertising disclosure, please feel free to contact us 
          at contact@aiproductivityhub.co.
        </p>
      </section>
    </div>
  );
}
