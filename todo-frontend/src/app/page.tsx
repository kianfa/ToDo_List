"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem"; // <-- Import the new component

export default function Home() {
  const {
    todos, newTaskTitle, setNewTaskTitle, isLoading,
    handleAddTask, handleToggleComplete, handleDelete
  } = useTodos();

  return (
    <main className="w-full max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-textPrimary">
        My Tasks
      </h1>

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

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-center text-textSecondary">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-textSecondary">No tasks yet. Add one above!</p>
        ) : (
          // 👇 Look how clean this is now!
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </main>
  );
}