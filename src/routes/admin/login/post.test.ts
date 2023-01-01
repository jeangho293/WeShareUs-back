import * as Joi from 'joi';
import Spec from './post';

describe('POST /admin/login', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      aud: 'aud',
      password: 'password',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      token: 'this is token',
      role: 'admin',
    });

    expect(error).toBeUndefined();
  });
});
