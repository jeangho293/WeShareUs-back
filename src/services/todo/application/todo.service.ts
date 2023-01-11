import { Inject, Service } from 'typedi';
import { TodoRepository } from '../infrastructure/todo.repository';
import type { PublishedDate } from '../../../libs/types';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  /**
   *
   * @params publishedDate - todo 게시 날짜
   */
  async list({ publishedDate }: { publishedDate: PublishedDate }) {
    const todo = await this.todoRepository.findOne({ publishedDate });
    return todo;
  }
}
