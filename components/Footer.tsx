
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} NDSA LIBRARY 25-26. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
