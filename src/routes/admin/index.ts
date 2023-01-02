import * as Router from 'koa-joi-router';
import { adminAuthHandler } from '../../middlewares/auth-handler';
import { publicAdminLoginRoutes } from './login';

export const publicAdminRouter = Router();
export const privateAdminRouter = Router();

publicAdminRouter.prefix('/admin');
publicAdminRouter.route([...publicAdminLoginRoutes]);

privateAdminRouter.prefix('/admin').use(adminAuthHandler);
privateAdminRouter.route([]);
