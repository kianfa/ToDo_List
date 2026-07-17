"use client";

import { useState, useEffect } from "react";
import { api, type Todo } from "@/lib/api";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTodos();
      setTodos(data || []); // Fallback to empty array if data is undefined
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTodo = await api.createTodo(newTaskTitle);
      setTodos([...todos, newTodo]);
      setNewTaskTitle(""); // Clear input
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = await api.updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <main className="w-full max-w-2xl">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10 text-textPrimary">
        My Tasks
      </h1>

      {/* Input Section */}
      <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-lg bg-surface text-textPrimary border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-textSecondary"
        />
        <button
          type="submit"
          disabled={!newTaskTitle.trim()}
          className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-center text-textSecondary">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-textSecondary">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg bg-surface border-l-4 shadow-sm transition-all ${
                todo.completed ? "border-textSecondary opacity-70" : "border-accent"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Custom Checkbox */}
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed 
                      ? "bg-accent border-accent" 
                      : "border-textSecondary hover:border-accent"
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <span className={`text-textPrimary ${todo.completed ? "line-through text-textSecondary" : ""}`}>
                  {todo.title}
                </span>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(todo.id)}
                className="text-textSecondary hover:text-red-500 transition-colors p-1"
                title="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}