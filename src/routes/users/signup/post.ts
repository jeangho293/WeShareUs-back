import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { UserService } from '../../../services/user/application/user.service';
import { RoleType } from '../../../services/user/domain/user.entity';

const bodySchema = Joi.object({
  account: Joi.string().required().description('로그인 아이디'),
  password: Joi.string().required().description('비밀번호'),
  confirmPassword: Joi.string().required().description('재확인 비밀번호'),
  role: Joi.string().required().description('계정의 권한 타입'),
}).required();
export default {
  path: '/signup',
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
      account,
      password,
      confirmPassword,
      role,
    }: {
      account: string;
      password: string;
      confirmPassword: string;
      role: RoleType;
    } = ctx.request.body;

    // 2. Get container service
    const userService = Container.get(UserService);

    // 3. Get service result
    await userService.registerUser({ account, password, confirmPassword, role });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;
