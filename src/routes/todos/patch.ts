import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../services/todo/application/todo.service';
import type { TodoTypes } from '../../services/todo/domain/todo.entity';

const bodySchema = Joi.object({
  id: Joi.string().required().description('todo-uuid'),
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
  todoItems: Joi.array()
    .items({
      id: Joi.string().required().description('todoItem-uuid'),
      content: Joi.string().required().description('todo 내용'),
      order: Joi.number().required().description('todo 순서'),
      done: Joi.boolean().required().description('todo 체크박스 유무'),
    })
    .required()
    .description('todo 목록들'),
}).required();

export default {
  path: '/',
  method: 'PATCH',
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
    const { id, publishedDate, todoItems }: TodoTypes = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.edit({ id, publishedDate, todoItems });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
