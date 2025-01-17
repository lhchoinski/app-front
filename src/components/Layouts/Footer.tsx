import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right p-6 pt-0 mt-auto">
            <span>© {currentYear} </span>
            <a
                href="https://gti.app.br/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                className="text-blue-500 hover:text-blue-400 underline transition-colors duration-200"
            >
                . GTI Gamification & App Developer
            </a>
            <span className="px-2">|</span>
            <a
                href="https://www.linkedin.com/in/luiz-henrique-choinski-dos-santos-a4595022b/"
                target="_blank"
                style={{ textDecoration: 'none' }}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 underline transition-colors duration-200"
            >
                Luiz h.c.santos
            </a>
        </footer>
    );
};

export default Footer;
