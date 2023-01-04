import * as Router from 'koa-joi-router';
import get from './get';
import post from './post';
import patch from './patch';
import _delete from './delete';

export const todoRouter = Router();

todoRouter.prefix('/todos');
todoRouter.route([get, post, patch, _delete]);
