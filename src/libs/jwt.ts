import { sign } from 'jsonwebtoken';

export function signToken(payload: any) {
  return sign(payload, String(process.env.JWT_SECRET_KEY));
}
