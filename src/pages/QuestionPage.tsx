import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionById } from '../data';
import QuestionDetails from '../components/question/QuestionDetails';

const QuestionPage: React.FC = () => {
  const { categoryId, questionId } = useParams<{ categoryId: string; questionId: string }>();
  const navigate = useNavigate();
  
  if (!categoryId || !questionId) {
    return <div>Question not found</div>;
  }

  const question = getQuestionById(parseInt(questionId));
  
  if (!question) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Question not found</h2>
        <button
          onClick={() => navigate(`/category/${categoryId}`)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Category
        </button>
      </div>
    );
  }

  return (
    <div>
      <QuestionDetails question={question} categoryId={categoryId} />
    </div>
  );
};

export default QuestionPage;