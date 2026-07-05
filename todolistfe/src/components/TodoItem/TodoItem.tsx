import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TodoItem({ todo, onEdit, onDelete, onToggle }: Props) {
  return (
    <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:p-4">
      <div className="flex min-w-0 gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 shrink-0"
        />

        <div className="min-w-0">
          <h2
            className={`break-words text-sm font-semibold sm:text-base ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h2>

          {todo.description && (
            <p className="mt-1 break-words text-sm text-gray-600">
              {todo.description}
            </p>
          )}

          <p className="mt-2 break-words text-xs text-gray-400">
            Created: {new Date(todo.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
        <button
          onClick={() => onEdit(todo)}
          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600 sm:py-1"
        >
          Sửa
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 sm:py-1"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
