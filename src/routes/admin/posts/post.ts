import { Spec, Joi } from 'koa-joi-router';
import Container from 'typedi';
import { PostService } from '../../../services/post/application/post.service';
import type { RoleTypes } from '../../../services/user/domain/user.entity';

type BodyTypes = {
  title: string;
  content: string;
};

const bodySchema = Joi.object({
  title: Joi.string().disallow('').required().description('게시글 제목'),
  content: Joi.string().disallow('').required().description('게시글 내용'),
});

export default {
  path: '/posts',
  method: 'POST',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      201: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { title, content }: BodyTypes = ctx.request.body;
    const { userId }: { userId: string } = ctx.state;

    // 2. Get container service
    const postService = Container.get(PostService);

    // 3. Get service result
    await postService.add({ title, content, userId });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;
