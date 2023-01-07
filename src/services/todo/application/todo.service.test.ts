import { plainToInstance } from 'class-transformer';
import { TodoService } from './todo.service';
import { TodoRepository } from '../infrastructure/todo.repository';
import { Todo } from '../domain/todo.entity';

jest.mock('../infrastructure/todo.repository');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TodoService() 테스트', () => {
  const todoService = new TodoService();
  const todoRepository = jest.mocked(new TodoRepository());

  Object.assign(todoService, { todoRepository });

  describe('list() 메소드 테스트', () => {
    it('정상적으로 todo list를 불러온다.', async () => {
      todoRepository.find.mockResolvedValue([
        plainToInstance(Todo, {
          id: 'todo-uuid-1',
          item: 'todo-item',
          order: 0,
          done: false,
          publishedDate: '2023-01-01',
        }),
        plainToInstance(Todo, {
          id: 'todo-uuid-2',
          item: 'todo-item-2',
          order: 1,
          done: false,
          publishedDate: '2023-01-01',
        }),
      ]);

      expect(await todoService.list({ publishedDate: '2023-01-01' })).toEqual([
        {
          id: 'todo-uuid-1',
          item: 'todo-item',
          order: 0,
          done: false,
          publishedDate: '2023-01-01',
        },
        {
          id: 'todo-uuid-2',
          item: 'todo-item-2',
          order: 1,
          done: false,
          publishedDate: '2023-01-01',
        },
      ]);
    });
  });
});
