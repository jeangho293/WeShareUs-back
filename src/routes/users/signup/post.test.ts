import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/signup', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      account: 'account',
      password: '1234',
      confirmPassword: '1234',
      role: 'general',
    });

    expect(error).toBeUndefined();
  });
});
