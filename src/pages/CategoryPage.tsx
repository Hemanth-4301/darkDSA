import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories';
import { getQuestionsByCategory } from '../data';
import QuestionList from '../components/category/QuestionList';
import FilterBar from '../components/category/FilterBar';
import * as LucideIcons from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  if (!categoryId) {
    return <div>Category not found</div>;
  }

  const category = categories.find(c => c.id === categoryId);
  const questions = getQuestionsByCategory(categoryId);
  
  if (!category) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>
    );
  }

  // Dynamically import the icon from lucide-react
  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Code2;

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </button>
        
        <div className="flex items-center">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2 mr-3">
            <IconComponent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{category.description}</p>
      </div>
      
      <FilterBar categoryId={categoryId} totalQuestions={questions.length} />
      
      <QuestionList questions={questions} categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;