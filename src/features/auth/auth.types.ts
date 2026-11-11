// Mirrors the backend's UserRole enum (src/entities/users/entities/user.entity.ts)
export type UserRole = 'customer' | 'staff' | 'admin';

/** The user as returned by POST /auth/login */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

/** The user as returned by GET /auth/me (the JWT payload, no name) */
export interface AuthTokenUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
