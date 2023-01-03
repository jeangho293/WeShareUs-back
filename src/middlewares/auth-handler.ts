import { unauthorized } from '@hapi/boom';
import type { Context } from 'koa';
import { verifyToken } from '../libs/jwt';
import { RoleTypes } from '../services/user/domain/user.entity';

export const adminAuthHandler = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.get('authorization').split(' ')[1];
  const { id, role } = verifyToken<{ id: string; role: RoleTypes }>(token);

  if (role !== 'admin') {
    throw unauthorized('Unauthorized Access');
  }

  ctx.state.id = id;
  ctx.state.role = role;
  await next();
};

export const authHandler = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.get('authorization').split(' ')[1];
  const { id, role } = verifyToken<{ id: string; role: RoleTypes }>(token);

  ctx.state.userId = id;
  ctx.state.role = role;
  await next();
};
