import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useProgress } from "../../context/ProgressContext";
import Chatbot from "./Chatbot";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { getSolvedCount } = useProgress();
  const location = useLocation();
  const totalSolved = getSolvedCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", text: "Home", show: location.pathname !== "/" },
    {
      to: "/chatbot",
      text: "Chatbot",
      show: location.pathname !== "/chatbot",
    },
    {
      to: "/compiler",
      text: "Compiler",
      show: location.pathname !== "/compiler",
    },
  ];

  return (
    <header className="top-0 z-50 bg-black text-slate-200 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <Code2 className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold">
                <span className="">dark</span> DSA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm font-medium">
              <span className="text-slate-200">Progress: </span>
              <span className="text-indigo-400">{totalSolved}</span>
              <span className="text-slate-200">/117</span>
            </div>

            <nav className="flex space-x-4">
              {navLinks.map(
                (link) =>
                  link.show && (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm font-medium text-slate-200 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  )
              )}
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-200 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile - Progress, Dark Mode, and Menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="text-sm font-medium">
              <span className="text-slate-200">Progress: </span>
              <span className="text-indigo-400">{totalSolved}</span>
              <span className="text-slate-200">/150</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-200 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-200 hover:bg-gray-600 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Only links */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col space-y-3">
              {navLinks.map(
                (link) =>
                  link.show && (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm font-medium text-slate-200 hover:text-indigo-400 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
