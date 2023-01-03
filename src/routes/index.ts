import * as Router from 'koa-joi-router';
import { privateAdminRouter, publicAdminRouter } from './admin';
import { publicUsersRouter } from './users';

export const globalRouter = Router();

// NOTE: health check
globalRouter.get('/ping', async (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(publicAdminRouter.middleware());
globalRouter.use(publicUsersRouter.middleware());
globalRouter.use(privateAdminRouter.middleware());
