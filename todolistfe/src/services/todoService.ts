import { IBackendRes, PageResponse, Todo, TodoRequest } from "@/types/todo";
import { sendRequest } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const TODO_URL = `${API_URL}/todo`;

export type TodoQueryParams = {
  keyword?: string;
  completed?: boolean;
  page?: number;
  size?: number;
  sort?: string;
};

const unwrapResult = async <T>(request: Promise<IBackendRes<T>>): Promise<T> => {
  const response = await request;
  return response.result;
};

export const getTodos = (queryParams?: TodoQueryParams) =>
  unwrapResult(
    sendRequest<IBackendRes<PageResponse<Todo>>>({
      url: TODO_URL,
      method: "GET",
      queryParams,
    }),
  );

export const createTodo = (body: TodoRequest) =>
  unwrapResult(
    sendRequest<IBackendRes<Todo>>({
      url: TODO_URL,
      method: "POST",
      body,
    }),
  );

export const updateTodo = (id: string, body: TodoRequest) =>
  unwrapResult(
    sendRequest<IBackendRes<Todo>>({
      url: `${TODO_URL}/${id}`,
      method: "PUT",
      body,
    }),
  );

export const deleteTodo = (id: string) =>
  unwrapResult(
    sendRequest<IBackendRes<void>>({
      url: `${TODO_URL}/${id}`,
      method: "DELETE",
    }),
  );

export const toggleTodo = (id: string) =>
  unwrapResult(
    sendRequest<IBackendRes<Todo>>({
      url: `${TODO_URL}/${id}/toggle`,
      method: "PATCH",
    }),
  );

export const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};
