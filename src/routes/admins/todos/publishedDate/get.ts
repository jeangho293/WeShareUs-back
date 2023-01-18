import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { TodoService } from '../../../../services/todo/application/todo.service';

const paramsSchema = Joi.object({
  publishedDate: Joi.string().required().description('todo가 발행된 날짜(YYYY-MM-DD)'),
}).required();
const outputSchema = Joi.object({
  id: Joi.string().required().description('todo-uuid'),
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
  todoItems: Joi.array()
    .items({
      id: Joi.number().required().description('todo 목록의 uuid'),
      done: Joi.boolean().required().description('todo 목록의 checked 유무'),
      content: Joi.string().required().description('todo 목록의 내용'),
    })
    .required()
    .description('해당 날짜의 todo 목록들'),
});
export default {
  path: '/todos/:publishedDate',
  method: 'GET',
  validate: {
    params: paramsSchema,
    output: {
      200: {
        body: { data: outputSchema },
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { publishedDate } = ctx.request.params;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    const data = await todoService.retrieve({ publishedDate });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;
