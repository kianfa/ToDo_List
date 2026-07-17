import createClient from "openapi-fetch";
import type { paths, components } from "./schema";

// 1. Initialize the client with the base URL and the generated schema types
const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });

// 2. Re-export the Todo type for convenience in our React components
export type Todo = components["schemas"]["TodoResponse"];

export const api = {
  // GET all todos
  getTodos: async () => {
    const { data, error } = await client.GET("/todos/");
    if (error) throw new Error("Failed to fetch todos");
    return data;
  },

// POST a new todo
  createTodo: async (title: string) => {
    const { data, error } = await client.POST("/todos/", {
      body: { title, description: "", completed: false },
    });

    if (error) {
      // THIS IS THE KEY: Log the actual error from the server
      console.error("REAL API ERROR:", error);
      throw new Error("Failed to create todo");
    }

    return data;
  },

  // PATCH (update) a todo
  updateTodo: async (id: number, updates: { completed?: boolean; title?: string; description?: string | null }) => {
    const { data, error } = await client.PATCH("/todos/{todo_id}", {
      params: { path: { todo_id: id } },
      body: updates,
    });
    if (error) throw new Error("Failed to update todo");
    return data;
  },

  // DELETE a todo
  deleteTodo: async (id: number) => {
    const { error } = await client.DELETE("/todos/{todo_id}", {
      params: { path: { todo_id: id } },
    });
    if (error) throw new Error("Failed to delete todo");
  },
};