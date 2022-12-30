import { Spec, Joi } from 'koa-joi-router';

const querySchema = Joi.object({
  code: Joi.string().required().description('카카오 인가코드'),
}).required();

export default {
  path: '/kakao',
  method: 'GET',
  validate: {
    query: querySchema,
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { code } = ctx.request.query;

    // 2. Get container service
    // 3. Get service result
    // 4. Send response
    ctx.body = { data: 'kakao' };
  },
} as Spec;
