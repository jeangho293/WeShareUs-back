import * as Router from 'koa-joi-router';
import { publicKakaoRoutes } from './kakao';

export const publicAuthRouter = Router();

publicAuthRouter.prefix('/auth');
publicAuthRouter.route([...publicKakaoRoutes]);
