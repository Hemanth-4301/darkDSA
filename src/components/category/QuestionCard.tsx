import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Question } from "../../types";
import { useProgress } from "../../context/ProgressContext";

interface QuestionCardProps {
  question: Question;
  categoryId: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  categoryId,
}) => {
  const { isSolved } = useProgress();
  const solved = isSolved(question.id);

  const difficultyColor = {
    Easy: "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/20",
    Medium:
      "text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
    Hard: "text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20",
  }[question.difficulty];

  return (
    <Link
      to={`/category/${categoryId}/question/${question.id}`}
      className={`
        block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
        hover:shadow-md transition-shadow duration-200 overflow-hidden
        ${solved ? "border-l-4 border-l-green-500 dark:border-l-green-400" : ""}
      `}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold flex items-center">
            {solved && (
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            )}
            {question.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded border ${difficultyColor}`}
          >
            {question.difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {question.description}
        </p>
        <div className="flex justify-between items-center">
          <a
            href={question.leetCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            LeetCode
          </a>
          {/* <span className="text-xs text-gray-500 dark:text-gray-400">
            {question.id > 0 ? `#${question.id}` : ''}
          </span> */}
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
