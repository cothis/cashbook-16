import 'dotenv-defaults/config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

const host = process.env.db_host;
const user = process.env.db_user;
const password = process.env.db_password;
const database = process.env.db_database;
export const dbConnection: ConnectionOptions = {
  type: 'mysql',
  host,
  port: 3306,
  username: user,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../**/*.entity.ts')],
  cli: {
    entitiesDir: 'src/entity',
  },
};
