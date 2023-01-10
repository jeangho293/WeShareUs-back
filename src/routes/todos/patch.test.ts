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
        id: 'uuid-1',
        item: 'todo-item-1',
        done: true,
        order: 1,
        publishedDate: '2023-01-10',
      },
      {
        id: 'uuid-2',
        item: 'todo-item-2',
        done: true,
        order: 2,
        publishedDate: '2023-01-10',
      },
    ]);

    expect(error).toBeUndefined();
  });
});
