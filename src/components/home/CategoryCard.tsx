import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Category } from "../../types";
import { useProgress } from "../../context/ProgressContext";
import * as LucideIcons from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { getSolvedCount } = useProgress();
  const solvedCount = getSolvedCount(category.id);
  const progress = (solvedCount / category.count) * 100;

  const IconComponent =
    LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Code2;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-primary-100 dark:border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 p-3 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {solvedCount}/{category.count}
            </span>
            {solvedCount === category.count && (
              <CheckCircle2 className="ml-1.5 h-5 w-5 text-green-500 animate-bounce-slow" />
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {category.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {category.description}
        </p>

        <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-shine animate-shine" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
