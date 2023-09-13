/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
  path: `.env`,
});

import { DataSource, DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_ROOT_USER, DB_ROOT_PASSWORD, DB_NAME, NODE_ENV } =
  process.env;

export const options: DataSourceOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT ? +DB_PORT : 3309,
  username: DB_ROOT_USER,
  password: DB_ROOT_PASSWORD,
  database: DB_NAME,
  migrations: [],
  migrationsTableName: 'migrations',
  synchronize: NODE_ENV !== 'production',
};

export const AppDataSource = new DataSource(options);
