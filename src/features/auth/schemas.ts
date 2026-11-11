import { z } from 'zod';

// Keep these rules in line with backend/src/auth/dto/login.dto.ts
export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255),
  password: z.string().min(1, 'Password is required').max(72),
});

export type LoginInput = z.infer<typeof loginSchema>;
