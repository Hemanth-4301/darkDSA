import React from "react";
import { Filter, CheckCircle2, Circle } from "lucide-react";
import { useFilter } from "../../context/FilterContext";
import { useProgress } from "../../context/ProgressContext";

interface FilterBarProps {
  categoryId: string;
  totalQuestions: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categoryId,
  totalQuestions,
}) => {
  const { filter, setFilter } = useFilter();
  const { getSolvedCount } = useProgress();
  const solvedCount = getSolvedCount(categoryId);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <div className="flex items-center mb-4 sm:mb-0">
        <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
        <span className="text-sm font-medium">Filter:</span>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === "all"
                ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("solved")}
            className={`px-3 py-1 text-sm rounded-full flex items-center ${
              filter === "solved"
                ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Solved
          </button>
          <button
            onClick={() => setFilter("unsolved")}
            className={`px-3 py-1 text-sm rounded-full flex items-center ${
              filter === "unsolved"
                ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Circle className="h-3 w-3 mr-1" /> Unsolved
          </button>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium text-indigo-600 dark:text-indigo-400">
          {solvedCount}
        </span>
        <span className="mx-1">of</span>
        <span>{totalQuestions}</span>
        <span className="ml-1">completed</span>
      </div>
    </div>
  );
};

export default FilterBar;
