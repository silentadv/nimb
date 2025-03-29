import { IncomingHttpHeaders } from "node:http";

export type RestClientHttpMethod = "PUT" | "PATCH" | "DELETE" | "GET" | "POST";
export type RestClientRequestBody = Record<string, unknown>;

export interface RestClientMethods {
  request<T, U = RestClientRequestBody>(
    method: RestClientHttpMethod,
    endpoint: string,
    body?: U
  ): Promise<T>;
  post<T, U = RestClientRequestBody>(endpoint: string, body: U): Promise<T>;
  get<T>(endpoint: string): Promise<T>;
}

export interface RestClient extends RestClientMethods {
  baseUrl: string;
  defaultHeaders?: IncomingHttpHeaders;
}
