
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LibraryIcon } from './icons/LibraryIcon';

const Header: React.FC = () => {
  const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sky-100 hover:text-sky-800 transition-colors";
  const activeLinkClass = "bg-sky-200 text-sky-900";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LibraryIcon className="h-8 w-8 text-sky-600" />
            <span className="ml-3 text-xl font-bold text-slate-800">NDSA LIBRARY 25-26</span>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Home</NavLink>
              <NavLink to="/catalogue" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Catalogue</NavLink>
              <NavLink to="/rules" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Rules</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Contact</NavLink>
              <NavLink to="/admin" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Admin Login</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
