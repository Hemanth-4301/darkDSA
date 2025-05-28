"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("glassmorphism-todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("glassmorphism-todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prev) => [todo, ...prev]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white dark:border-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8  dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-800 dark:text-purple-300 mb-4 drop-shadow-lg">
            Todo List
          </h1>
          <p className="text-purple-600 dark:text-purple-200 text-lg sm:text-xl">
            Stay organized with style
          </p>
        </div>

        {/* Main Container */}
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl p-4 transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80">
          {/* Add Todo Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                  className="w-full bg-white/80 dark:bg-gray-700/80 border border-purple-300 dark:border-gray-600 text-purple-900 dark:text-gray-100 placeholder:text-purple-500/70 dark:placeholder:text-gray-400 backdrop-blur-sm h-12 text-lg rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300 px-4"
                />
              </div>
              <button
                onClick={addTodo}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add
              </button>
            </div>
          </div>

          {/* Stats */}
          {totalCount > 0 && (
            <div className="mb-6 p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-purple-200/50 dark:border-gray-600/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-purple-800 dark:text-gray-200 font-medium">
                  Total: {totalCount} tasks
                </span>
                <span className="text-purple-800 dark:text-gray-200 font-medium">
                  Completed: {completedCount} / {totalCount}
                </span>
                <div className="w-full sm:w-32 bg-white/50 dark:bg-gray-600/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width:
                        totalCount > 0
                          ? `${(completedCount / totalCount) * 100}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <Circle className="w-16 h-16 text-purple-400/40 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-purple-600/60 dark:text-gray-400 text-lg">
                  No todos yet. Add one above!
                </p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`group backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 rounded-2xl border border-purple-200/50 dark:border-gray-600/50 p-4 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-[1.02] transform ${
                    todo.completed ? "opacity-75" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.5s ease-out forwards",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-purple-400/60 dark:text-gray-400 hover:text-purple-600 dark:hover:text-gray-200" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-purple-900 dark:text-gray-100 transition-all duration-300 break-words ${
                          todo.completed
                            ? "line-through text-purple-600/60 dark:text-gray-400"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </p>
                      <p className="text-purple-500/60 dark:text-gray-500 text-sm mt-1">
                        {todo.createdAt.toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-shrink-0 text-purple-600/60 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-xl p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-600/60 dark:text-gray-500 text-sm">
            Your todos are automatically saved locally
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
