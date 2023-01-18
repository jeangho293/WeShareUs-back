import * as Router from 'koa-joi-router';
import { todoRouter } from './todos';
import { usersRouter } from './users';
import { adminsRouter } from './admins';

export const globalRouter = Router();

globalRouter.get('/ping', (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(todoRouter.middleware());
globalRouter.use(usersRouter.middleware());
globalRouter.use(adminsRouter.middleware());
