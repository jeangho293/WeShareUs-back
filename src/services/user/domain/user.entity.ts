import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';

export type RoleTypes = 'admin' | 'user';
type UserConstructor = {
  role: RoleTypes;
  nickname: string;
  password?: string;
  aud?: string;
};

@Entity()
export class User extends Aggregate {
  @Column()
  role!: RoleTypes;

  @Column({ unique: true })
  nickname!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  aud!: string;

  constructor(args: UserConstructor) {
    super();
    if (args) {
      this.role = args.role;
      this.nickname = args.nickname;
      this.password = args.password || '';
      this.aud = args.aud || '';
    }
  }

  static Of(args: UserConstructor) {
    return new User(args);
  }
}
