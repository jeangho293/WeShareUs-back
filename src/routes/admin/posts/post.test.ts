import * as Joi from 'joi';
import Spec from './post';

describe('POST /admin/posts', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      title: 'title',
      content: 'content',
    });

    expect(error).toBeUndefined();
  });
});
