import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { tokenStorage } from '../../api/token';
import { authApi } from './auth.api';
import { AuthContext } from './auth.context';
import type { AuthTokenUser, AuthUser, LoginResponse } from './auth.types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthTokenUser | AuthUser | null>(null);
  // Only wait if there is a stored token to check
  const [isLoading, setIsLoading] = useState(() => tokenStorage.get() !== null);

  // On page load, check that a stored token is still valid
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;

    authApi
      .me(token)
      .then(setUser)
      .catch(() => tokenStorage.clear()) // expired or invalid: forget it
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback((response: LoginResponse) => {
    tokenStorage.set(response.accessToken);
    setUser(response.user);
  }, []);

  const signOut = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
