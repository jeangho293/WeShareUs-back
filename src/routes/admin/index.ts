import * as Router from 'koa-joi-router';
import { publicAdminLoginRoutes } from './login';

export const publicAdminRouter = Router();

publicAdminRouter.prefix('/admin');
publicAdminRouter.route([...publicAdminLoginRoutes]);
