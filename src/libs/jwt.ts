import { verify } from 'jsonwebtoken';

export function verifyToken<T>(token: string) {
  return verify(token, String(process.env.JWT_SECRET_KEY)) as T;
}
