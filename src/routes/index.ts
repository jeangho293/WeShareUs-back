import * as Router from 'koa-joi-router';
import { todoRouter } from './todos';

export const globalRouter = Router();

globalRouter.use(todoRouter.middleware());
