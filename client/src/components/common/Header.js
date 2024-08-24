import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-200 sticky top-0 z-20 w-full border-b border-gray-500 p-4">
            <div className="container mx-auto flex items-center">
                <NavLink to="/" className="text-4xl font-extrabold text-purple-400 text-center">
                    Metadata Fetcher
                </NavLink>
                <nav className="flex space-x-4 ml-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-xl text-purple-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-purple-700 after:w-full after:transform after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                            : "relative text-xl text-purple-500 hover:bg-purple-100 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-purple-700 hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:origin-left hover:after:transition-transform hover:after:duration-300"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-xl text-purple-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-purple-700 after:w-full after:transform after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                            : "relative text-xl text-purple-500 hover:text-purple-700 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-purple-700 hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:origin-left hover:after:transition-transform hover:after:duration-300"
                        }
                    >
                        About
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
