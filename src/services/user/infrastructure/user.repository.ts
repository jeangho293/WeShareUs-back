import { Service } from 'typedi';
import * as _ from 'lodash';
import { Repository } from '../../../libs/repository';
import { User } from '../domain/user.entity';

@Service()
export class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }

  save(user: User) {
    return this.getManager().save(user);
  }

  findOne(args: { id?: string; account?: string }) {
    return this.getManager().findOne({ where: strip(args) });
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}
