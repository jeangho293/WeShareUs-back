import { Inject, Service } from 'typedi';
import * as _ from 'lodash';
import { badRequest } from '@hapi/boom';
import { TodoRepository } from '../infrastructure/todo.repository';
import type { PublishedDate } from '../../../libs/types';
import type { TodoItemsTypes } from '../../../routes/todos/post';
import { Todo } from '../domain/todo.entity';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  /**
   *
   * @params publishedDate - todo 게시 날짜
   */
  async list({ publishedDate }: { publishedDate: PublishedDate }) {
    const todos = await this.todoRepository.find({ publishedDate });
    return todos;
  }

  /**
   *
   * @params todoItems - todo 내용들
   * @params publishedDate - todo 게시 날짜
   */
  async addTodo({
    todoItems,
    publishedDate,
  }: {
    todoItems: TodoItemsTypes;
    publishedDate: PublishedDate;
  }) {
    const todos = todoItems.map((todoItem) => {
      return Todo.Of({ item: todoItem.item, order: todoItem.order, publishedDate });
    });

    await this.todoRepository.save(todos);
  }

  /**
   *
   * @params todoItems - 수정될 todo Id와 done을 가지고있다.
   * @params publishedDate - todo 생성 날짜
   */
  async updateTodo({
    todoItems,
    publishedDate,
  }: {
    todoItems: Todo[];
    publishedDate: PublishedDate;
  }) {
    const todos = await this.todoRepository.find({ publishedDate });
    const updatedTodos = todoItems.map((todoItem) => {
      const todo = _.find(todos, { id: todoItem.id });
      if (!todo) {
        throw badRequest(`${todoItem.id} is not existed todo item.`, {
          errorMessage: `${todoItem.id} is not existed todo item.`,
        });
      }
      return todo.update({ done: todoItem.done, item: todoItem.item });
    });
    await this.todoRepository.save(updatedTodos);
  }

  async deleteTodos({ todoIds }: { todoIds: string[] }) {
    await this.todoRepository.delete(todoIds);
  }
}
