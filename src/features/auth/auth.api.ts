import { apiRequest } from '../../api/client';
import type { AuthTokenUser, LoginResponse } from './auth.types';
import type { LoginInput } from './schemas';

export const authApi = {
  login: (input: LoginInput) =>
    apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: input }),

  me: (token: string) => apiRequest<AuthTokenUser>('/auth/me', { token }),
};
