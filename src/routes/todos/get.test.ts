import * as Joi from 'joi';
import Spec from './get';

describe('GET /todos', () => {
  it('정상적인 query', () => {
    const query = Spec.validate?.query as Joi.AnySchema;
    const { error } = query.validate({
      publishedDate: '2023-01-01',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      id: 'todo-uuid',
      publishedDate: '2023-01-11',
      todoItems: [
        {
          id: 1,
          done: false,
          content: 'todoItem-content',
        },
        {
          id: 2,
          done: false,
          content: 'todoItem-content-2',
        },
      ],
    });

    expect(error).toBeUndefined();
  });
});
