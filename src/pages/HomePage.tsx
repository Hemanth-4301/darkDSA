import React from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div id="categories" className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Problem Categories</h2>
        <CategoryGrid />
      </div>
    </div>
  );
};

export default HomePage;