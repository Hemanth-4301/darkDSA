import React from "react";
import { BrainCircuit, ArrowRight, Sparkles, LineChart } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import "./App.css";

const Hero: React.FC = () => {
  const { getSolvedCount } = useProgress();
  const totalSolved = getSolvedCount();
  const progress = (totalSolved / 150) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-primary-100 dark:border-gray-700 mb-10">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-grid-primary-900 dark:bg-grid-white" />

      <div className="relative z-10 px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left section */}
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 mb-6 animate-bounce-slow">
                <Sparkles className="h-4 w-4 mr-2" />
                Master DSA with 140+ Problems
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 text-transparent bg-clip-text animate-gradient">
                Level Up Your Coding Skills
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
                Master the most important algorithms and ace your technical
                interviews with our curated collection of 140+ essential
                problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 mb-12">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>

              {/* Motivational Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-primary-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <LineChart className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Path to Success
                  </h3>
                </div>
                <svg
                  viewBox="0 0 200 100"
                  className="w-full h-32 text-primary-600 dark:text-primary-400"
                >
                  <path
                    d="M0,90 Q40,20 80,60 T160,30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text x="5" y="95" fontSize="10" fill="gray">
                    Failure
                  </text>
                  <text x="160" y="25" fontSize="10" fill="gray">
                    Success
                  </text>
                </svg>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  Every curve in the path reflects a learning moment.
                </p>
              </div>
            </div>

            {/* Right circular chart */}
            <div className="flex-shrink-0 relative">
              <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center p-8">
                  {/* <BrainCircuit className="w-16 h-16 mb-20 text-primary-600 dark:text-primary-400" /> */}
                  <div className="bar">
                    <div className="ball"></div>
                  </div>
                </div>
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="stroke-current text-primary-200 dark:text-primary-800"
                    strokeWidth="4"
                    fill="transparent"
                    r="47"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="stroke-current text-primary-500 dark:text-primary-400"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                    r="47"
                    cx="50"
                    cy="50"
                    strokeDasharray="295.31"
                    strokeDashoffset={295.31 - (295.31 * progress) / 100}
                    transform="rotate(-90 50 50)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="295.31"
                      to={295.31 - (295.31 * progress) / 100}
                      dur="2s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1"
                    />
                  </circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center mt-24">
                  <div className="text-center">
                    <span className="block text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-300">
                      {totalSolved}
                    </span>
                    <span className="block text-sm text-primary-600 dark:text-primary-400">
                      of 150
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
