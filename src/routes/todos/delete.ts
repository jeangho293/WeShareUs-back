import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../services/todo/application/todo.service';

const bodySchema = Joi.object({
  todoIds: Joi.array().items(Joi.string().optional()).required().description('todos-uuid'),
}).required();

export default {
  path: '/',
  method: 'DELETE',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { todoIds } = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.delete({ todoIds });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
