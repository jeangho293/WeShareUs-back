import { Spec, Joi } from 'koa-joi-router';

export default {
  path: '/',
  method: 'GET',
  validate: {},
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    // 2. Get container service
    // 3. Get service result
    // 4. Send response
    ctx.body = {};
  },
} as Spec;
