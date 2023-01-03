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
});
