import { IRequest } from "@/types/todo";
import queryString from "query-string";

export const sendRequest = async <T>({
  url,
  method,
  body,
  queryParams,
  headers = {},
  nextOption = {},
}: IRequest): Promise<T> => {
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  const res = await fetch(url, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...nextOption,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
};