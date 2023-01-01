import { Context } from 'koa';
import { Boom } from '@hapi/boom';

type CustomErrorTypes = {
  statusCode: number;
  message: string;
  slackMessage: string;
};

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err: any) {
    const customError: CustomErrorTypes = {
      statusCode: 500,
      message: '',
      slackMessage: '',
    };

    if (err instanceof Boom) {
      const {
        data: { errorMessage },
        output: {
          payload: { statusCode, message },
        },
      } = err;

      customError.statusCode = statusCode;
      customError.message = errorMessage;
      customError.slackMessage = message;
    }

    ctx.status = customError.statusCode;
    ctx.body = { data: { errorMessage: customError.message || 'Something is wrong.' } };
  }
};
