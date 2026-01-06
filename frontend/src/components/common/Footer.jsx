import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-greed-green text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GREED</h3>
            <p className="text-gray-300">Your premium destination for football gear and men's fashion.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Contact</li>
              <li>Shipping Info</li>
              <li>Returns</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Men's Fashion</li>
              <li>Football Jerseys</li>
              <li>Football Boots</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 GREED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;