import * as Router from 'koa-joi-router';

export const globalRouter = Router();

// NOTE: 간단한 health check
globalRouter.get('/pong', (ctx) => {
  ctx.body = { data: 'pong' };
});
