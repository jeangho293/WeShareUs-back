import { Context } from 'koa';
import { Boom } from '@hapi/boom';

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    const customError = {
      statusCode: 500,
      data: {
        errorMessage: '',
      },
    };
    if (err instanceof Boom) {
      customError.statusCode = err.output.statusCode;
      customError.data = err.data.errorMessage || '';
    }
    ctx.status = customError.statusCode;
    ctx.body = customError.data;
  }
};
