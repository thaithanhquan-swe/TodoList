export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoRequest = {
  title: string;
  description: string;
  completed?: boolean;
};

export type PageResponse<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export interface IBackendRes<T> {
    code: number
    message: string
    result: T
}

export interface IRequest {
    url: string
    method: string
    body?: unknown
    queryParams?: unknown
    useCredentials?: boolean
    headers?: Record<string, string>
    nextOption?: RequestInit
}
