import React from 'react';
import logo from '../../assets/logo.png'; 

const Header = () => {
  return (
    <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center p-4 shadow-lg">
      <img src={logo} alt="Logo" className="h-12 w-auto" /> {/* Logo */}
      <h1 className="text-center text-3xl font-bold text-white text-shadow-lg">
        Electric Vehicle Population Analysis
      </h1>
      <div>
        {/* Optional: Add Navigation Links */}
        <a href="/" className="text-white hover:text-gray-200 mx-4">Home</a>
        <a href="/about" className="text-white hover:text-gray-200 mx-4">About</a>
      </div>
    </div>
  );
};

export default Header;
