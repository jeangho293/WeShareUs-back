import * as Joi from 'joi';
import Spec from './delete';

describe('DELETE /todos', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      todoIds: ['todo-uuid-1', 'todo-uuid-2'],
    });

    expect(error).toBeUndefined();
  });
});
