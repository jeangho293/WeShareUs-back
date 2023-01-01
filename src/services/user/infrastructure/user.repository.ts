import { Service } from 'typedi';
import * as _ from 'lodash';
import { Repository } from '../../../libs/repository';
import { RoleTypes, User } from '../domain/user.entity';

@Service()
export class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }

  findOne(args: { id?: string; aud?: string; nickname?: string; role?: RoleTypes }) {
    return this.getManager().findOne({ where: strip(args) });
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}
