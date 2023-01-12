import { Service } from 'typedi';
import * as _ from 'lodash';
import { Repository } from '../../../libs/repository';
import { PublishedDate } from '../../../libs/types';
import { Todo } from '../domain/todo.entity';

@Service()
export class TodoRepository extends Repository<Todo> {
  constructor() {
    super(Todo);
  }

  save(todo: Todo) {
    return this.getManager().save(todo);
  }

  findOne(args: { id?: string; publishedDate?: PublishedDate }) {
    return this.getManager().findOne({ where: strip(args) });
  }

  delete(todoIds: string[]) {
    return this.getManager().delete(todoIds);
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}
