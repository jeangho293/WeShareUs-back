import * as Koa from 'koa';
import * as logger from 'koa-logger';
import koaBody, { HttpMethodEnum } from 'koa-body';
import * as koaCors from '@koa/cors';
import { connectMysql } from './databases';
import { globalRouter } from './routes';
import 'dotenv/config';

class App {
  private app;

  constructor() {
    this.app = new Koa();
    this.initMiddleWares();
  }

  private initMiddleWares() {
    connectMysql();
    this.app.use(koaCors());
    this.app.use(logger());
    this.app.use(
      koaBody({
        multipart: true,
        parsedMethods: [HttpMethodEnum.POST, HttpMethodEnum.PATCH, HttpMethodEnum.DELETE],
      })
    );
    this.app.use(globalRouter.middleware());
  }

  listen(port: string) {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default App;
