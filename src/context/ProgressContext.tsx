import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { allQuestions } from '../data';

interface ProgressContextType {
  solvedQuestions: Record<number, boolean>;
  toggleSolved: (questionId: number) => void;
  getSolvedCount: (categoryId?: string) => number;
  isSolved: (questionId: number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [solvedQuestions, setSolvedQuestions] = useState<Record<number, boolean>>(() => {
    const savedProgress = localStorage.getItem('solvedQuestions');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    localStorage.setItem('solvedQuestions', JSON.stringify(solvedQuestions));
  }, [solvedQuestions]);

  const toggleSolved = (questionId: number) => {
    setSolvedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getSolvedCount = (categoryId?: string) => {
    if (!categoryId) {
      return Object.values(solvedQuestions).filter(Boolean).length;
    }
    
    const categoryQuestions = allQuestions.filter(q => q.category === categoryId);
    return categoryQuestions.filter(q => solvedQuestions[q.id]).length;
  };

  const isSolved = (questionId: number) => {
    return !!solvedQuestions[questionId];
  };

  return (
    <ProgressContext.Provider value={{ solvedQuestions, toggleSolved, getSolvedCount, isSolved }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};