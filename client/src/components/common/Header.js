import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gradient-to-r from-purple-400 to-purple-600 sticky top-0 z-20 w-full shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                <NavLink to="/" className="text-5xl font-extrabold text-white drop-shadow-md">
                    Metadata Fetcher
                </NavLink>
                <nav className="hidden sm:flex space-x-6 ml-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-lg text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-white after:w-full after:scale-x-100 after:transition-transform after:duration-300"
                            : "relative text-lg text-white opacity-80 hover:opacity-100 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-white hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:duration-300"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-lg text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-white after:w-full after:scale-x-100 after:transition-transform after:duration-300"
                            : "relative text-lg text-white opacity-80 hover:opacity-100 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-white hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:duration-300"
                        }
                    >
                        About
                    </NavLink>
                </nav>
                {/* Hamburger Menu for Mobile */}
                <div className="sm:hidden">
                    <button className="text-white">
                        {/* Add a hamburger icon here, e.g., from Lucide or Heroicons */}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
