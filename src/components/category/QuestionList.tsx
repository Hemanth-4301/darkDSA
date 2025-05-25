import React from 'react';
import QuestionCard from './QuestionCard';
import { Question } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { useFilter } from '../../context/FilterContext';

interface QuestionListProps {
  questions: Question[];
  categoryId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, categoryId }) => {
  const { isSolved } = useProgress();
  const { filter } = useFilter();
  
  const filteredQuestions = questions.filter(question => {
    if (filter === 'all') return true;
    if (filter === 'solved') return isSolved(question.id);
    if (filter === 'unsolved') return !isSolved(question.id);
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} categoryId={categoryId} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            No questions match the current filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;