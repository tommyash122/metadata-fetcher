
import React from 'react';

function Footer() {
    return (
        <footer className="mx-auto my-4 w-full max-w-7xl px-8 py-4 text-white text-center text-[0.8rem] text-text-secondary dark:text-d-text-secondary">
            <span>
                &copy; {new Date().getFullYear()} Tommy Ashkenazi. Find me on{" "}
                <a
                    href="https://www.linkedin.com/in/tommyash/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Linkedin
                </a>{"."}
                <br />
                Powered by{" "}
                <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
                    Vercel
                </a>
                .
            </span>
        </footer>
    );
};

export default Footer;