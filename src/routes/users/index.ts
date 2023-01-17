import * as Router from 'koa-joi-router';
import { signupRoutes } from './signup';
import { loginRoutes } from './login';

export const usersRouter = Router();

usersRouter.prefix('/users');
usersRouter.route([...signupRoutes, ...loginRoutes]);
