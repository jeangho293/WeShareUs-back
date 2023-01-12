import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { TodoRepository } from '../infrastructure/todo.repository';
import type { PublishedDate } from '../../../libs/types';
import type { TodoTypes } from '../domain/todo.entity';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  /**
   *
   * @param publishedDate - todo 게시 날짜
   */
  async list({ publishedDate }: { publishedDate: PublishedDate }) {
    const todo = await this.todoRepository.findOne({ publishedDate });
    return todo;
  }

  /**
   *
   * @param id
   * @param publishedDate
   * @param todoItems
   */
  async updateTodo({ id, publishedDate, todoItems }: TodoTypes) {
    const todo = await this.todoRepository.findOne({ id });

    if (!todo) {
      throw badRequest(`published Todo is not existed to  at ${publishedDate}`, {
        errorMessage: `published Todo is not existed to  at ${publishedDate}`,
      });
    }

    const updateProps = {
      todoItems: todoItems.map((todoItem) => {
        return {
          ...todoItem,
          done: todoItem.done,
          content: todoItem.content,
        };
      }),
    };

    await todo.update(updateProps);
    await this.todoRepository.save(todo);
  }
}
