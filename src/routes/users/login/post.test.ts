import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/login', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      account: 'account',
      password: '1234',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      token: 'access token',
      account: 'account',
    });

    expect(error).toBeUndefined();
  });
});
