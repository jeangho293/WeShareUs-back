import * as Router from 'koa-joi-router';
import { signupRoutes } from './signup';

export const usersRouter = Router();

usersRouter.prefix('/users');
usersRouter.route([...signupRoutes]);
