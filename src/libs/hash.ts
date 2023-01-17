import { hashSync } from 'bcryptjs';

export function hashPassword(plainPassword: string) {
  return hashSync(plainPassword, 10);
}
