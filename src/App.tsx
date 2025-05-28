import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import QuestionPage from "./pages/QuestionPage";
import Chatbot from "./components/layout/Chatbot";
import JavaCompiler from "./components/layout/Compiler";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route
            path="/category/:categoryId/question/:questionId"
            element={<QuestionPage />}
          />
          <Route path="/compiler" element={<JavaCompiler />} />
          <Route path="/chatbot" element={<Chatbot />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
