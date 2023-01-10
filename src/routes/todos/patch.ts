import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import type { PublishedDate } from '../../libs/types';
import { TodoService } from '../../services/todo/application/todo.service';
import type { Todo } from '../../services/todo/domain/todo.entity';

const querySchema = Joi.object({
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
}).required();
const bodySchema = Joi.array()
  .items({
    id: Joi.string().required().description('todo-uuid'),
    item: Joi.string().required().description('todo-content'),
    order: Joi.number().required(),
    done: Joi.boolean().required().description('todo 했나 안했나..'),
    publishedDate: Joi.string().required().description('생성된 날짜'),
  })
  .required();

export default {
  path: '/',
  method: 'PATCH',
  validate: {
    query: querySchema,
    body: bodySchema,
    type: 'json',
    output: {
      200: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { publishedDate } = ctx.request.query as { publishedDate: PublishedDate };
    const todoItems: Todo[] = ctx.request.body;
    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.updateDone({ todoItems, publishedDate });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
