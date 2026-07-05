"use client";

import { useEffect, useState } from "react";
import { Todo, TodoRequest } from "@/types/todo";

type Props = {
  editingTodo: Todo | null;
  onSubmit: (data: TodoRequest) => Promise<void>;
  onCancel: () => void;
};

export default function TodoForm({ editingTodo, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await onSubmit({
      title: title.trim(),
      description,
    });

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 space-y-3 sm:mb-6">
      <input
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
        placeholder="Nhập tiêu đề công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="min-h-24 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
        placeholder="Nhập mô tả..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid gap-2 sm:flex">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto sm:text-base"
        >
          {editingTodo ? "Cập nhật" : "Thêm công việc"}
        </button>

        {editingTodo && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 sm:w-auto sm:text-base"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
