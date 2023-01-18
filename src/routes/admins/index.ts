import * as Router from 'koa-joi-router';
import todosRoutes from './todos';
import { authMiddleware } from '../../middlewares/auth-handler';

export const adminsRouter = Router();

adminsRouter.prefix('/admins').use(authMiddleware);
adminsRouter.route([...todosRoutes]);
