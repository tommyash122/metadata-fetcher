import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoIcon from '../../assets/brainwave-symbol.svg';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-purple-50 to-purple-100 sticky top-0 z-20 w-full shadow-md p-4">
            <div className="mx-auto flex items-center justify-between">
                {/* Logo with SVG Icon */}
                <div className="flex items-center space-x-2">
                    <img src={LogoIcon} alt="Logo Icon" className="w-10 h-10" />
                    <NavLink to="/" className="text-2xl text-gray-800 drop-shadow-md">
                        Bolt Fetcher
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="hidden sm:flex flex-grow justify-left space-x-6 ml-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-lg text-gray-800 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gray-800 after:w-full after:scale-x-100 after:transition-transform after:duration-300"
                            : "relative text-lg text-gray-800 opacity-80 hover:opacity-100 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-gray-800 hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:duration-300"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            isActive 
                            ? "relative text-lg text-gray-800 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gray-800 after:w-full after:scale-x-100 after:transition-transform after:duration-300"
                            : "relative text-lg text-gray-800 opacity-80 hover:opacity-100 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-gray-800 hover:after:w-full hover:after:transform hover:after:scale-x-0 hover:after:transition-transform hover:duration-300"
                        }
                    >
                        About
                    </NavLink>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="sm:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="sm:hidden bg-gradient-to-r from-purple-50 to-purple-100 text-gray-800 p-4 space-y-4">
                    <NavLink 
                        to="/" 
                        onClick={toggleMenu} 
                        className={({ isActive }) => 
                            isActive 
                            ? "block text-lg text-gray-800 opacity-100"
                            : "block text-lg text-gray-800 opacity-80 hover:opacity-100"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        onClick={toggleMenu} 
                        className={({ isActive }) => 
                            isActive 
                            ? "block text-lg text-gray-800 opacity-100"
                            : "block text-lg text-gray-800 opacity-80 hover:opacity-100"
                        }
                    >
                        About
                    </NavLink>
                </nav>
            )}
        </header>
    );
}

export default Header;
