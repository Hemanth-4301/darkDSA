// Layout.tsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import { ThemeProvider } from "../../context/ThemeContext";
import { ProgressProvider } from "../../context/ProgressContext";
import { FilterProvider } from "../../context/FilterContext";
import JavaCompiler from "./Compiler";
import { Link, useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";
import { MessageSquare, X } from "lucide-react"; // Import the icons directly
import Todo from "./Todo";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <ThemeProvider>
      <ProgressProvider>
        <FilterProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>

            {location.pathname !== "/todo" && (
              <div className="pb-10 p-1 lg:p-10">
                <Chatbot />
              </div>
            )}

            <footer className="py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} dark DSA</p>
              </div>
            </footer>
          </div>
        </FilterProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default Layout;
