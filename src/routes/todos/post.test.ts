import * as Joi from 'joi';
import Spec from './post';

describe('POST /todos', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      todoItems: [
        {
          item: 'todo item-1',
          order: 1,
        },
        {
          item: 'todo item-2',
          order: 2,
        },
        {
          item: 'todo item-3',
          order: 3,
        },
      ],
      publishedDate: '2023-01-01',
    });

    expect(error).toBeUndefined();
  });
});
