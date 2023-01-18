import { Context } from 'koa';
import { unauthorized } from '@hapi/boom';
import { verifyToken } from '../libs/jwt';
import { RoleType } from '../services/user/domain/user.entity';

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const [authType, authToken] = ctx.get('authorization').split(' ');

  if (authType !== 'Bearer') {
    throw unauthorized('Accessed by an unauthenticated user.');
  }

  const { id, account, role } = verifyToken<{ id: string; account: string; role: RoleType }>(
    authToken
  );
  ctx.state.id = id;
  ctx.state.account = account;
  ctx.state.role = role;
  await next();
};
