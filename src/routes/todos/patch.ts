import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import type { PublishedDate } from '../../libs/types';
import { TodoService } from '../../services/todo/application/todo.service';

type BodyTypes = {
  todoItems: {
    todoId: string;
    done: boolean;
  }[];
};

const querySchema = Joi.object({
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
}).required();
const bodySchema = Joi.array()
  .items({
    todoId: Joi.string().required().description('todo-uuid'),
    done: Joi.boolean().required().description('todo 했나 안했나..'),
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
    const { todoItems }: BodyTypes = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.updateDone({ todoItems, publishedDate });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;
