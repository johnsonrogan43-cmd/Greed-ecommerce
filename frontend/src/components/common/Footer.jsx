import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black border-t border-amber-900/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <Crown className="w-8 h-8 text-amber-500" />
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                GREED
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your premium destination for football gear and men's fashion. Experience luxury, quality, and style in every piece.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-700/30 flex items-center justify-center text-amber-400 hover:border-amber-500/50 hover:text-amber-300 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-700/30 flex items-center justify-center text-amber-400 hover:border-amber-500/50 hover:text-amber-300 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-700/30 flex items-center justify-center text-amber-400 hover:border-amber-500/50 hover:text-amber-300 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-700/30 flex items-center justify-center text-amber-400 hover:border-amber-500/50 hover:text-amber-300 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Story', 'Contact', 'Shipping Info', 'Returns & Exchanges', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-amber-400 font-bold text-lg mb-6 tracking-wide">Categories</h4>
            <ul className="space-y-3">
              {['Men\'s Fashion', 'Football Jerseys', 'Football Boots', 'Training Gear', 'Accessories', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/shop?category=${item.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-amber-400 font-bold text-lg mb-6 tracking-wide">Get In Touch</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm">+234 911 352 1818</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm">info@greed.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 border border-amber-900/30 text-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
                />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-amber-900/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} GREED. All rights reserved. Crafted with excellence.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line at bottom */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
    </footer>
  );
};

export default Footer;