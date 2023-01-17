import { Context } from 'koa';
import { Boom } from '@hapi/boom';
import * as Slack from 'slack-node';

const slack = new Slack();
slack.setWebhook(String(process.env.SLACK));

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    const customError = {
      statusCode: 500,
      errorMessage: 'Something is wrong',
    };
    if (err instanceof Boom) {
      customError.statusCode = err.output.statusCode;
      customError.errorMessage = err.data.errorMessage || 'Something is wrong';
    }

    ctx.status = customError.statusCode;
    ctx.body = customError;
    slack.webhook(
      {
        channel: '#whs-api',
        text: `[Error:${customError.statusCode}] - ${customError.errorMessage}`,
      },
      (error, response) => {}
    );
  }
};
