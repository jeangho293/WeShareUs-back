import { Context } from 'koa';
import { Boom, Output } from '@hapi/boom';
import * as Slack from 'slack-node';

const slack = new Slack();
slack.setWebhook(String(process.env.SLACK));

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err: any) {
    const customError = {
      statusCode: 500,
      errorMessage: 'Something is wrong',
      output: {} as Output,
    };
    if (err instanceof Boom) {
      customError.statusCode = err.output.statusCode;
      customError.errorMessage = err.data.errorMessage || 'Something is wrong';
      customError.output = err.output;
    }

    ctx.status = customError.statusCode;
    ctx.body = customError;
    slack.webhook(
      {
        channel: '#whs-api',
        text: `[Error:${customError.output.payload.error}] - ${customError.output.payload.message}`,
      },
      (error, response) => {}
    );
  }
};
