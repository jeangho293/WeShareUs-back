import { Spec } from 'koa-joi-router';
import Container from 'typedi';
import { PostService } from '../../../services/post/application/post.service';

export default {
  path: '/posts',
  method: 'GET',
  validate: {},
  handler: async (ctx) => {
    // 1. Get body, params, querystring

    // 2. Get container service
    const postService = Container.get(PostService);

    // 3. Get service result
    const data = await postService.list();

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;
