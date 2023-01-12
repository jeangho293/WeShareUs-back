import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../services/todo/application/todo.service';
import type { TodoTypes } from '../../services/todo/domain/todo.entity';

export default {
  path: '/',
  method: 'PATCH',
  validate: {},
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { id, publishedDate, todoItems }: TodoTypes = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.updateTodo({ id, publishedDate, todoItems });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
