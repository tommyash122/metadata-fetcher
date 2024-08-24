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
                                ? "text-xl text-purple-700 underline"
                                : "text-xl text-purple-500 hover:text-purple-700 hover:underline"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-xl text-purple-700 underline"
                                : "text-xl text-purple-500 hover:text-purple-700 hover:underline"
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
