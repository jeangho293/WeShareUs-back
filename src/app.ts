import * as Koa from 'koa';
import * as logger from 'koa-logger';
import koaBody from 'koa-body';
import * as koaCors from '@koa/cors';
import { connectMysql } from './databases';
import { globalRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';
import 'dotenv/config';

class App {
  private app;

  constructor() {
    this.app = new Koa();
    this.errorHandlerMiddleWares();
    this.initMiddleWares();
  }

  private initMiddleWares() {
    connectMysql();
    this.app.use(koaCors());
    this.app.use(logger());
    this.app.use(koaBody({ multipart: true }));
    this.app.use(globalRouter.middleware());
  }

  private errorHandlerMiddleWares() {
    this.app.use(errorHandler);
  }

  listen(port: string) {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default App;
