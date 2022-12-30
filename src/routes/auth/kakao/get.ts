import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { AuthService } from '../../../services/auth/application/auth.service';

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
    const authService = Container.get(AuthService);

    // 3. Get service result
    const data = await authService.kakaoLogin({ code });

    // 4. Send response
    ctx.body = { data: 'kakao' };
  },
} as Spec;
