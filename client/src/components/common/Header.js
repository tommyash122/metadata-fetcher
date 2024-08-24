import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-200 sticky top-0 z-20 w-full border-b border-gray-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-purple-400 text-center">
                    Metadata Fetcher
                </h1>
                <nav className="flex space-x-4">
                    <Link to="/" className="text-purple-500 hover:text-purple-700 hover:underline">Home</Link>
                    <Link to="/about" className="text-purple-500 hover:text-purple-700 hover:underline">About</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
