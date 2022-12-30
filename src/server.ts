import App from './app';

const app = new App();
const port = String(process.env.SERVER_PORT);

app.listen(port);
