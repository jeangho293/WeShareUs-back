import * as Router from 'koa-joi-router';
import { todoRouter } from './todos';
import { usersRouter } from './users';

export const globalRouter = Router();

globalRouter.use(todoRouter.middleware());
globalRouter.use(usersRouter.middleware());
