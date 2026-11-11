import { createContext } from 'react';
import type { AuthTokenUser, AuthUser, LoginResponse } from './auth.types';

export interface AuthContextValue {
  user: AuthTokenUser | AuthUser | null;
  /** True while we check a stored token on page load */
  isLoading: boolean;
  signIn: (response: LoginResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
