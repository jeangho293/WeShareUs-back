import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { AdminService } from '../../../services/user/application/admin.service';

type BodyTypes = {
  aud: string;
  password: string;
};

const bodySchema = Joi.object({
  aud: Joi.string().disallow('').required().description('ID'),
  password: Joi.string().disallow('').required().description('비밀번호'),
}).required();
const outputSchema = Joi.object({
  token: Joi.string().disallow('').required().description('로그인 토큰'),
});

export default {
  path: '/login',
  method: 'POST',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: { data: outputSchema },
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { aud, password }: BodyTypes = ctx.request.body;

    // 2. Get container service
    const adminService = Container.get(AdminService);

    // 3. Get service result
    const data = await adminService.login({ aud, password });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;
