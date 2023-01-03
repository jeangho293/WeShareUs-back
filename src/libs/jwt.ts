import { unauthorized } from '@hapi/boom';
import { sign, verify } from 'jsonwebtoken';

export function signToken(payload: any) {
  return sign(payload, String(process.env.JWT_SECRET_KEY));
}

export function verifyToken<T>(token: string) {
  try {
    return verify(token, String(process.env.JWT_SECRET_KEY)) as T;
  } catch (err) {
    const verifyError = unauthorized('Invalid token');
    verifyError.data = { errorMessage: 'Invalid token' };
    throw verifyError;
  }
}
