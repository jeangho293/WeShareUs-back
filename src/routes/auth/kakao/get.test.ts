import * as Joi from 'joi';
import Spec from './get';

describe('GET /auth/kakao', () => {
  it('정상적인 querystring', () => {
    const query = Spec.validate?.query as Joi.AnySchema;
    const { error } = query.validate({ code: 'kakao authorization code' });

    expect(error).toBeUndefined();
  });
});
