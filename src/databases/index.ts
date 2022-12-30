import { DataSource } from 'typeorm';
import entities from './entities';

export const datasource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT),
  synchronize: true,
  logging: false,
  entities,
});

export function connectMysql() {
  datasource
    .initialize()
    .then(() => {
      console.log(`Connecting mysql..!`);
    })
    .catch((err) => {
      console.log(err);
    });
}
