import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Navbar />
      <div className="container max-w-screen-xl px-6 mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
