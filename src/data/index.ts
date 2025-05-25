import { arrayQuestions } from "./arrays";
import { twoPointersQuestions } from "./twoPointers";
import { slidingWindowQuestions } from "./slidingWindow";
import { stackQuestions } from "./stack";
import { categories } from "./categories";
import { Question } from "../types";

// Export all questions
export const allQuestions: Question[] = [
  ...arrayQuestions,
  ...twoPointersQuestions,
  ...slidingWindowQuestions,
  ...stackQuestions,
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
