import * as Router from 'koa-joi-router';

export const globalRouter = Router();

globalRouter.get('/ping', async (ctx) => {
  ctx.body = { data: 'pong' };
});
