import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useProgress } from "../../context/ProgressContext";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { getSolvedCount } = useProgress();
  const location = useLocation();
  const totalSolved = getSolvedCount();

  return (
    <header className=" top-0 z-50 bg-black text-slate-200 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <Code2 className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold">
                <span className="">dark</span> DSA
              </span>
            </Link>

            {/* {location.pathname !== "/" && (
              <Link
                to="/"
                className="ml-6 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Categories
              </Link>
            )} */}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              <span className="text-slate-200">Progress: </span>
              <span className="text-indigo-400">{totalSolved}</span>
              <span className="text-slate-200">/150</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-200 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
