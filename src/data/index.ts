import { arrayQuestions } from "./arrays";
import { twoPointersQuestions } from "./twoPointers";
import { slidingWindowQuestions } from "./slidingWindow";
import { stackQuestions } from "./stack";
import { linkedListQuestions } from "./linkedList";
import { treesQuestions } from "./trees";
import { triesQuestions } from "./tries";
import { heapQuestions } from "./heap";
import { backtrackingQuestions } from "./backtracking";
import { binarySearchQuestions } from "./binarySearch";

import { categories } from "./categories";
import { Question } from "../types";

// Export all questions
export const allQuestions: Question[] = [
  ...arrayQuestions,
  ...twoPointersQuestions,
  ...slidingWindowQuestions,
  ...stackQuestions,
  ...linkedListQuestions,
  ...treesQuestions,
  ...triesQuestions,
  ...heapQuestions,
  ...backtrackingQuestions,
  ...binarySearchQuestions,
  
];

// Export categories
export { categories };

// Get questions by category
export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return allQuestions.filter((question) => question.category === categoryId);
};

// Get question by ID
export const getQuestionById = (id: number): Question | undefined => {
  return allQuestions.find((question) => question.id === id);
};
