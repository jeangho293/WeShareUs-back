import * as Router from 'koa-joi-router';

export const globalRouter = Router();

// NOTE:
globalRouter.get('/ping', async (ctx) => {
  ctx.body = { data: 'pong' };
});
