import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../services/todo/application/todo.service';

const querySchema = Joi.object({
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
}).required();

export default {
  path: '/',
  method: 'GET',
  validate: {
    query: querySchema,
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { publishedDate } = ctx.request.query as { publishedDate: string };

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    const data = await todoService.list({ publishedDate });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;
