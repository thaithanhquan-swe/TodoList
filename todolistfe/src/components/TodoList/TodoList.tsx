import { Todo } from "@/types/todo";
import TodoItem from "../TodoItem/TodoItem";

type Props = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TodoList({
  todos = [],
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-gray-500 sm:text-base">
        Không có công việc nào.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
