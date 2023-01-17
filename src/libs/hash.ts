import { hashSync, compareSync } from 'bcryptjs';

export function hashPassword(plainPassword: string) {
  return hashSync(plainPassword, 10);
}

export function comparePassword(plainPassword: string, hashedPassword: string) {
  return compareSync(plainPassword, hashedPassword);
}
