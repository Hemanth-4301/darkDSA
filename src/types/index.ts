export interface Question {
  id: number;
  title: string;
  description: string;
  examples: Example[];
  solutions: Solution[];
  leetCodeUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Solution {
  approach: 'Brute Force' | 'Optimal';
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export type Theme = 'light' | 'dark';