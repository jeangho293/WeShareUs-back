import * as Router from 'koa-joi-router';
import { publicAuthRouter } from './auth';

export const globalRouter = Router();

// NOTE: 간단한 health check
globalRouter.get('/ping', (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(publicAuthRouter.middleware());
