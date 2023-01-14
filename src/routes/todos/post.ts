import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import type { PublishedDate } from '../../libs/types';
import { TodoService } from '../../services/todo/application/todo.service';

export default {
  path: '/',
  method: 'POST',
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { publishedDate } = ctx.request.query as { publishedDate: PublishedDate };

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.addTodo({ publishedDate });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;
