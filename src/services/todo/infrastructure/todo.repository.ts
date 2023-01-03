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

  save(todos: Todo[]) {
    return this.getManager().save(todos);
  }

  find(args?: { publishedDate?: PublishedDate }) {
    return this.getManager().find({ where: strip(args), order: { order: 'ASC' } });
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}
