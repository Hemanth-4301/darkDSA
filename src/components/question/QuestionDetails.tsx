import React from "react";
import {
  ArrowLeftIcon,
  ExternalLink,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Question } from "../../types";
import { useProgress } from "../../context/ProgressContext";
import CodeBlock from "./CodeBlock";

interface QuestionDetailsProps {
  question: Question;
  categoryId: string;
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({
  question,
  categoryId,
}) => {
  const { isSolved, toggleSolved } = useProgress();
  const navigate = useNavigate();
  const solved = isSolved(question.id);

  const difficultyColor = {
    Easy: "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/20",
    Medium:
      "text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
    Hard: "text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20",
  }[question.difficulty];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 sm:mb-0"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to list
          </button>

          <div className="flex items-center space-x-3">
            <span
              className={`text-xs px-2 py-1 rounded border ${difficultyColor}`}
            >
              {question.difficulty}
            </span>
            <a
              href={question.leetCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View on LeetCode
            </a>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

        <div className="flex justify-between items-center">
          <button
            onClick={() => toggleSolved(question.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              solved
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {solved ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
              </>
            ) : (
              <>
                <Circle className="h-4 w-4 mr-2" />
                Mark as Completed
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
          <p className="mb-6">{question.description}</p>

          <h3 className="text-lg font-semibold mb-3">Examples</h3>
          <div className="grid gap-4 mb-6">
            {question.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-2">
                  <strong>Input:</strong> <p>{example.input}</p>
                </div>
                <div className="mb-2">
                  <strong>Output:</strong> <p>{example.output}</p>
                </div>
                {example.explanation && (
                  <div>
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4">Solutions</h2>

          {question.solutions.map((solution, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">
                {solution.approach} Approach
              </h3>

              <div className="mb-4">
                <CodeBlock code={solution.code} language="java" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold mb-1">Time Complexity</p>
                  <p>{solution.timeComplexity}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold mb-1">Space Complexity</p>
                  <p>{solution.spaceComplexity}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Explanation</p>
                <p>{solution.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
