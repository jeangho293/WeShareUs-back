import { Column, Entity } from 'typeorm';
import { badRequest } from '@hapi/boom';
import { sign } from 'jsonwebtoken';
import * as process from 'process';
import { Aggregate } from '../../../libs/aggregate';
import { comparePassword, hashPassword } from '../../../libs/hash';

export type RoleType = 'general' | 'admin';
@Entity()
export class User extends Aggregate {
  @Column()
  role!: RoleType;

  @Column({ unique: true })
  account!: string;

  @Column()
  password!: string;

  constructor(args: { role: RoleType; account: string; password: string }) {
    super();
    if (args) {
      this.role = args.role;
      this.account = args.account;
      this.password = hashPassword(args.password);
    }
  }

  static Of(args: { role: RoleType; account: string; password: string; confirmPassword: string }) {
    if (args.password !== args.confirmPassword) {
      throw badRequest(`Reconfirmation password and password are different.`, {
        errorMessage: 'Reconfirmation password and password are different.',
      });
    }
    return new User(args);
  }

  isCorrectPassword(plainPassword: string) {
    return comparePassword(plainPassword, this.password);
  }

  signAccessToken() {
    return sign(
      { id: this.id, account: this.account, role: this.role },
      String(process.env.JWT_SECRET_KEY)
    );
  }
}
