import { useState, useEffect } from "react";
import { api, type Todo } from "@/lib/api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTodos();
      setTodos(data || []);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTodo = await api.createTodo(newTaskTitle);
      if (newTodo) {
        setTodos([...todos, newTodo]);
      }
      setNewTaskTitle("");
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

  return {
    todos,
    newTaskTitle,
    setNewTaskTitle,
    isLoading,
    handleAddTask,
    handleToggleComplete,
    handleDelete,
  };
}