import * as Joi from 'joi';
import Spec from './patch';

describe('PATCH /todos', () => {
  it('정상적인 query', () => {
    const query = Spec.validate?.query as Joi.AnySchema;
    const { error } = query.validate({
      publishedDate: '2023-01-01',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate([
      {
        todoId: 'uuid-1',
        done: true,
      },
      {
        todoId: 'uuid-2',
        done: true,
      },
    ]);

    expect(error).toBeUndefined();
  });
});
