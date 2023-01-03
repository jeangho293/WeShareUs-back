import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { PublishedDate } from '../../libs/types';
import { TodoService } from '../../services/todo/application/todo.service';

export type TodoItemsTypes = {
  item: string;
  order: number;
}[];
const bodySchema = Joi.object({
  todoItems: Joi.array()
    .items({
      item: Joi.string().required().description('todo 내용'),
      order: Joi.number().required().description('todo 순서'),
    })
    .required(),
  publishedDate: Joi.string().required().description('YYYY-MM-DD'),
}).required();

export default {
  path: '/',
  method: 'POST',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      201: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const {
      todoItems,
      publishedDate,
    }: { todoItems: TodoItemsTypes; publishedDate: PublishedDate } = ctx.request.body;

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.add({ todoItems, publishedDate });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;
