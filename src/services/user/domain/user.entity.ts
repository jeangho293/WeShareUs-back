import { Column, Entity } from 'typeorm';
import { badRequest } from '@hapi/boom';
import { Aggregate } from '../../../libs/aggregate';

@Entity()
export class User extends Aggregate {
  @Column()
  account!: string;

  @Column()
  password!: string;

  constructor(args: { account: string; password: string }) {
    super();
    if (args) {
      this.account = args.account;
      this.password = args.password;
    }
  }

  static Of(args: { account: string; password: string; confirmPassword: string }) {
    if (args.password !== args.confirmPassword) {
      throw badRequest(`Reconfirmation password and password are different`, {
        errorMessage: 'Reconfirmation password and password are different',
      });
    }
  }
}
