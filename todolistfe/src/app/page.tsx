"use client";

import { useCallback, useEffect, useState } from "react";
import { Todo, TodoRequest } from "@/types/todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "@/services/todoService";
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import TodoList from "@/components/TodoList/TodoList";
import TodoPagination from "@/components/TodoPagination/TodoPagination";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [completed, setCompleted] = useState("all");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTodos = useCallback(
    async (pageNumber = page) => {
      const data = await getTodos({
        keyword: searchKeyword,
        completed: completed === "all" ? undefined : completed === "completed",
        page: pageNumber,
        size: 2,
        sort: "createdAt,desc",
      });

      setTodos(data.content);
      setTotalPages(data.totalPages);
    },
    [completed, page, searchKeyword],
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function reloadFirstPage() {
    if (page === 0) {
      await fetchTodos(0);
      return;
    }

    setPage(0);
  }

  async function handleSubmit(data: TodoRequest) {
    if (editingTodo) {
      await updateTodo(editingTodo.id, {
        ...data,
        completed: editingTodo.completed,
      });
      setEditingTodo(null);
    } else {
      await createTodo(data);
    }

    await reloadFirstPage();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc muốn xóa công việc này không?")) return;

    await deleteTodo(id);
    await fetchTodos();
  }

  async function handleToggle(id: string) {
    await toggleTodo(id);
    await fetchTodos();
  }

  function handleSearch() {
    setSearchKeyword(keyword);
    setPage(0);
  }

  return (
    <main className="min-h-screen bg-gray-100 px-3 py-4 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
        <h1 className="mb-5 text-center text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl">
          Todo List
        </h1>

        <TodoForm
          editingTodo={editingTodo}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTodo(null)}
        />

        <TodoFilter
          keyword={keyword}
          completed={completed}
          onKeywordChange={setKeyword}
          onCompletedChange={(value) => {
            setCompleted(value);
            setPage(0);
          }}
          onSearch={handleSearch}
        />

        <TodoList
          todos={todos}
          onEdit={setEditingTodo}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />

        <TodoPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
