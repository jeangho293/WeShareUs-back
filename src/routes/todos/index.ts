import * as Router from 'koa-joi-router';
import get from './get';
import post from './post';

export const todoRouter = Router();

todoRouter.prefix('/todos');
todoRouter.route([get, post]);
