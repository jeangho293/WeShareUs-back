import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../../services/todo/application/todo.service';
import type { TodoTypes } from '../../../services/todo/domain/todo.entity';

const paramsSchema = Joi.object({
  todoId: Joi.string().required().description('todo-uuid'),
});
const bodySchema = Joi.object({
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
  todoItems: Joi.array()
    .items({
      id: Joi.number().optional().description('todoItem-uuid'),
      content: Joi.string().required().description('todo 내용'),
      done: Joi.boolean().required().description('todo 체크박스 유무'),
    })
    .required()
    .description('todo 목록들'),
}).required();

export default {
  path: '/:todoId',
  method: 'PATCH',
  validate: {
    type: 'json',
    params: paramsSchema,
    body: bodySchema,
    output: {
      200: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { todoId } = ctx.request.params;
    const { publishedDate, todoItems }: TodoTypes = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.edit({ id: todoId, publishedDate, todoItems });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
