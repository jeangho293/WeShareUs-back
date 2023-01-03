import { Inject, Service } from 'typedi';
import { TodoRepository } from '../infrastructure/todo.repository';
import type { PublishedDate } from '../../../libs/types';
import type { TodoItemsTypes } from '../../../routes/todos/post';
import { Todo } from '../domain/todo.entity';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  async add({
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

  async list({ publishedDate }: { publishedDate: PublishedDate }) {
    const todos = await this.todoRepository.find({ publishedDate });
    return todos;
  }
}
