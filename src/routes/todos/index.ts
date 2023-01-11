import * as Router from 'koa-joi-router';
import get from './get';

export const todoRouter = Router();

todoRouter.prefix('/todos');
todoRouter.route([get]);
