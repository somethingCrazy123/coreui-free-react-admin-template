import { tokenStorage } from './token';

const API_URL = import.meta.env.VITE_API_URL;

/** An error returned by the backend (4xx/5xx), with its HTTP status. */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  /** Send this token instead of the stored one (used right after login). */
  token?: string;
}

/**
 * Single place that talks to the NestJS API.
 * Adds the JWT automatically and turns error responses into ApiError.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = options.token ?? tokenStorage.get();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    // NestJS returns validation errors as an array of messages
    const raw = (data as { message?: unknown } | null)?.message;
    const message = Array.isArray(raw)
      ? raw.join(', ')
      : typeof raw === 'string'
        ? raw
        : 'Something went wrong. Please try again.';
    throw new ApiError(response.status, message);
  }

  return data as T;
}
