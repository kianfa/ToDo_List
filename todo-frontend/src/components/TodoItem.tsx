import { type Todo } from "@/lib/api";

// 1. Define the shape of the data this component expects (The Props)
interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

// 2. The Component
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg bg-surface border-l-4 shadow-sm transition-all ${
        todo.completed ? "border-textSecondary opacity-70" : "border-accent"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {/* Checkbox Button */}
        <button
          onClick={() => onToggle(todo)}
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

        {/* Task Title */}
        <span className={`text-textPrimary ${todo.completed ? "line-through text-textSecondary" : ""}`}>
          {todo.title}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-textSecondary hover:text-red-500 transition-colors p-1"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  );
}